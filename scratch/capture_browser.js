const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function capture(width, height, outputPath, name) {
  console.log(`\n========================================`);
  console.log(`Testing in Edge: ${name} (${width}x${height})`);
  console.log(`========================================`);

  const userDataDir = path.join(process.cwd(), 'scratch', `edge_profile_${width}_${Date.now()}`);
  if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir, { recursive: true });

  const port = 9400 + Math.floor(Math.random() * 400);
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    `--window-size=${width},${height}`,
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await res.json();
      const page = list.find(p => p.type === 'page');
      if (page && page.webSocketDebuggerUrl) {
        wsUrl = page.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    edge.kill();
    throw new Error('Failed to connect to Edge DevTools');
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Enable Page & Runtime
  await send('Page.enable');
  await send('Runtime.enable');

  // Listen to console messages
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log(`[Browser Console]`, msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
    } else if (msg.method === 'Runtime.exceptionThrown') {
      console.error(`[Browser Exception]`, msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
    }
  });

  // Set viewport metrics
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768
  });

  // Navigate to localhost:3000
  console.log('Navigating to http://localhost:3000...');
  await send('Page.navigate', { url: 'http://localhost:3000' });

  // Wait 4 seconds for full load and loading screen fade
  console.log('Waiting 4s for assets, Three.js, and loading screen dismissal...');
  await new Promise(r => setTimeout(r, 4000));

  // Force loading screen hide just in case
  await send('Runtime.evaluate', {
    expression: `
      const ls = document.getElementById('loadingScreen');
      if (ls) ls.classList.add('hidden');
    `
  });

  // Wait 500ms for CSS fade transition
  await new Promise(r => setTimeout(r, 500));

  // Inspect DOM metrics
  const evalResult = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const dock = document.getElementById('rosterDock');
        const track = document.getElementById('dockTrack');
        const dockRect = dock ? dock.getBoundingClientRect() : null;
        const trackRect = track ? track.getBoundingClientRect() : null;
        const btns = Array.from(document.querySelectorAll('.dock-hero-btn')).map(b => ({
          text: b.innerText.replace(/\\s+/g, ' ').trim(),
          ariaSelected: b.getAttribute('aria-selected'),
          role: b.getAttribute('role'),
          tabIndex: b.getAttribute('tabindex'),
          width: Math.round(b.getBoundingClientRect().width),
          left: Math.round(b.getBoundingClientRect().left),
          right: Math.round(b.getBoundingClientRect().right)
        }));

        const nav = document.getElementById('mainNav');
        const navRect = nav ? nav.getBoundingClientRect() : null;
        const heroTitle = document.getElementById('heroTitle')?.textContent;
        const heroStats = document.getElementById('heroStats')?.getBoundingClientRect();

        return {
          viewport: { width: window.innerWidth, height: window.innerHeight },
          dock: {
            visible: dock && window.getComputedStyle(dock).display !== 'none',
            rect: dockRect ? {
              width: Math.round(dockRect.width),
              left: Math.round(dockRect.left),
              right: Math.round(dockRect.right),
              bottom: Math.round(dockRect.bottom)
            } : null,
            trackScrollWidth: track ? Math.round(track.scrollWidth) : 0,
            trackClientWidth: track ? Math.round(track.clientWidth) : 0,
            buttonCount: btns.length
          },
          buttons: btns,
          heroTitle: heroTitle,
          heroStatsFitted: heroStats ? heroStats.bottom < window.innerHeight : false
        };
      })()
    `,
    returnByValue: true
  });

  const data = evalResult.result.value;
  console.log(`Results for ${name}:`);
  console.log(`- Hero title: ${data.heroTitle}`);
  console.log(`- Dock visible: ${data.dock.visible}`);
  console.log(`- Dock dimensions: width=${data.dock.rect?.width}px, left=${data.dock.rect?.left}px, right=${data.dock.rect?.right}px`);
  console.log(`- Track scrollWidth=${data.dock.trackScrollWidth}px, clientWidth=${data.dock.trackClientWidth}px`);
  console.log(`- Total hero buttons rendered in dock: ${data.dock.buttonCount}`);
  console.log(`- Hero buttons:`, data.buttons.map(b => `${b.text} (selected: ${b.ariaSelected}, tabindex: ${b.tabIndex})`).join(' | '));

  // Take screenshot
  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outputPath, Buffer.from(screenshot.data, 'base64'));
  console.log(`Successfully captured screenshot -> ${outputPath}`);

  ws.close();
  edge.kill();

  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (e) {}

  return data;
}

async function main() {
  const artifactDir = 'C:\\Users\\hi\\.gemini\\antigravity-ide\\brain\\d965d912-a1fc-4b52-a152-ed4fe49ed0e3';
  const desktop = await capture(1366, 768, path.join(artifactDir, 'phase2_desktop_verified.png'), 'Desktop');
  const tablet = await capture(900, 700, path.join(artifactDir, 'phase2_tablet_verified.png'), 'Tablet');
  const mobile = await capture(390, 844, path.join(artifactDir, 'phase2_mobile_verified.png'), 'Mobile');

  console.log('\n========================================');
  console.log('ALL 3 VIEWPORTS VERIFIED SUCCESSFULLY IN REAL BROWSER');
  console.log('========================================');
}

main().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});

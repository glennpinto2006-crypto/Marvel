const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureCaptain(width = 1366, height = 768) {
  const outputPath = path.join(__dirname, 'captain_america_verified.png');
  const userDataDir = path.join(__dirname, `edge_profile_cap_${Date.now()}`);
  if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir, { recursive: true });

  const port = 9550 + Math.floor(Math.random() * 400);
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
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
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

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:3000/#captain' });

  // Wait 3.5 seconds for complete DOMContentLoaded & initial API fetch
  await new Promise(r => setTimeout(r, 3500));

  // Remove loading screen and force switch to captain if not already
  await send('Runtime.evaluate', {
    expression: `
      const loader = document.getElementById('loadingScreen');
      if (loader) loader.remove();
      const capIndex = heroes.findIndex(h => h.id === 'captain');
      if (capIndex !== -1 && typeof switchHero === 'function') {
        switchHero(capIndex);
      }
    `
  });

  // Wait for switchHero transition to complete
  await new Promise(r => setTimeout(r, 1500));

  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  if (screenshot && screenshot.data) {
    fs.writeFileSync(outputPath, Buffer.from(screenshot.data, 'base64'));
    console.log(`Saved screenshot to ${outputPath}`);
  }

  ws.close();
  edge.kill();
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
}

captureCaptain().catch(console.error);

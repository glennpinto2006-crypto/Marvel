const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureThor(width = 1366, height = 768) {
  const outputPath = path.join(__dirname, 'thor_verified.png');
  const userDataDir = path.join(__dirname, `edge_profile_thor_${Date.now()}`);
  fs.mkdirSync(userDataDir, { recursive: true });

  const port = 9880 + Math.floor(Math.random() * 100);
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    `--window-size=${width},${height}`,
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

  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.onopen = r);

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise(res => {
      const id = msgId++;
      const h = e => {
        const m = JSON.parse(e.data);
        if (m.id === id) {
          ws.removeEventListener('message', h);
          res(m.result);
        }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false
  });

  console.log('Navigating to http://localhost:3000...');
  await send('Page.navigate', { url: 'http://localhost:3000' });

  console.log('Waiting 3s for page load...');
  await new Promise(r => setTimeout(r, 3000));

  await send('Runtime.evaluate', {
    expression: `
      const ls = document.getElementById('loadingScreen');
      if (ls) ls.classList.add('hidden');
      isTransitioning = false;
      const thorIdx = heroes.findIndex(h => h.id === 'thor');
      if (thorIdx !== -1) switchHero(thorIdx);
    `
  });

  console.log('Waiting 2s for Thor background transition...');
  await new Promise(r => setTimeout(r, 2000));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outputPath, Buffer.from(shot.data, 'base64'));
  console.log('Saved Thor screenshot to', outputPath);

  ws.close();
  edge.kill();
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
}

captureThor().catch(console.error);

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function debugCaptain() {
  const userDataDir = path.join(__dirname, `edge_profile_dbg_${Date.now()}`);
  fs.mkdirSync(userDataDir, { recursive: true });

  const port = 9600 + Math.floor(Math.random() * 300);
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--window-size=1366,768',
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
  await send('Page.navigate', { url: 'http://localhost:3000/#captain' });
  await new Promise(r => setTimeout(r, 3000));

  const info = await send('Runtime.evaluate', {
    expression: `(() => {
      const v = document.getElementById('heroVisual');
      const card = document.getElementById('posterCard');
      const img = document.getElementById('heroImage');
      const rectV = v ? v.getBoundingClientRect() : null;
      const rectC = card ? card.getBoundingClientRect() : null;
      return JSON.stringify({
        vExists: !!v,
        vClasses: v ? v.className : '',
        vStyle: v ? v.style.cssText : '',
        vRect: rectV,
        cRect: rectC,
        imgSrc: img ? img.src : '',
        imgComplete: img ? img.complete : false,
        imgNaturalWidth: img ? img.naturalWidth : 0
      });
    })()`
  });

  console.log('Visual Info:', info.result.value);

  // Take screenshot
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'captain_america_verified.png'), Buffer.from(shot.data, 'base64'));

  ws.close();
  edge.kill();
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
}

debugCaptain().catch(console.error);

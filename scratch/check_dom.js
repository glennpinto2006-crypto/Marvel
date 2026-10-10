const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const edge = spawn(edgePath, ['--headless=new', '--remote-debugging-port=9679', 'about:blank']);

setTimeout(async () => {
  try {
    const list = await (await fetch('http://127.0.0.1:9679/json/list')).json();
    const ws = new WebSocket(list[0].webSocketDebuggerUrl);
    ws.onopen = async () => {
      let id = 1;
      const send = (method, params = {}) => new Promise(res => {
        const i = id++;
        const h = e => { const m = JSON.parse(e.data); if (m.id === i) { ws.removeEventListener('message', h); res(m.result); } };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: i, method, params }));
      });
      await send('Page.enable');
      await send('Page.navigate', { url: 'http://localhost:3000/#captain' });
      await new Promise(r => setTimeout(r, 2500));
      const res = await send('Runtime.evaluate', {
        expression: `JSON.stringify({
          heroImageSrc: document.getElementById('heroImage')?.src,
          visualOpacity: window.getComputedStyle(document.getElementById('heroVisual')).opacity,
          visualDisplay: window.getComputedStyle(document.getElementById('heroVisual')).display,
          visualRect: document.getElementById('heroVisual')?.getBoundingClientRect(),
          cardRect: document.getElementById('posterCard')?.getBoundingClientRect(),
          isImageComplete: document.getElementById('heroImage')?.complete,
          naturalWidth: document.getElementById('heroImage')?.naturalWidth
        })`
      });
      console.log('DOM Info:', res.result.value);
      edge.kill();
      process.exit(0);
    };
  } catch(e) { console.error(e); edge.kill(); }
}, 1000);

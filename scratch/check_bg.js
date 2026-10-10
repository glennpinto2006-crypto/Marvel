const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const userDataDir = path.join(__dirname, `edge_bg_${Date.now()}`);
fs.mkdirSync(userDataDir, { recursive: true });

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9933',
  `--user-data-dir=${userDataDir}`,
  'about:blank'
]);

setTimeout(async () => {
  try {
    const list = await (await fetch('http://127.0.0.1:9933/json/list')).json();
    const ws = new WebSocket(list[0].webSocketDebuggerUrl);
    ws.onopen = async () => {
      let id = 1;
      const send = (m, p = {}) => new Promise(res => {
        const i = id++;
        const h = e => { const msg = JSON.parse(e.data); if (msg.id === i) { ws.removeEventListener('message', h); res(msg); } };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: i, method: m, params: p }));
      });
      await send('Page.enable');
      await send('Page.navigate', { url: 'http://localhost:3000' });
      await new Promise(r => setTimeout(r, 3000));
      await send('Runtime.evaluate', { expression: 'switchHero(4)' });
      await new Promise(r => setTimeout(r, 1200));
      const res = await send('Runtime.evaluate', {
        expression: `JSON.stringify({
          bg0Img: document.getElementById('bgImage0').style.backgroundImage,
          bg0Class: document.getElementById('bgImage0').className,
          bg0Opacity: window.getComputedStyle(document.getElementById('bgImage0')).opacity,
          bg1Img: document.getElementById('bgImage1').style.backgroundImage,
          bg1Class: document.getElementById('bgImage1').className,
          bg1Opacity: window.getComputedStyle(document.getElementById('bgImage1')).opacity,
          currentHero: heroes[currentHeroIndex]?.name,
          currentBg: heroes[currentHeroIndex]?.backgroundImage
        })`
      });
      console.log('EVAL RESULT:', res.result?.result?.value);
      edge.kill();
      try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
      process.exit(0);
    };
  } catch(e) { console.error(e); edge.kill(); }
}, 1000);

// シェア画像（1200x630）をページごとに作る：node og.mjs
// 題名(ogTitle)・説明(ogDesc)・ロボの絵を載せて、Chromeのヘッドレスで撮る。img/<og> に書き出す
import { writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PAGES } from './pages.mjs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/morikawa/Desktop/fulfull-staff-notes';
const dir = mkdtempSync(join(tmpdir(), 'og-'));
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const only = process.argv[2]; // ファイル名の一部を渡すと、そのページだけ作り直す

for (const p of PAGES) {
  if (only && !p.og.includes(only)) continue;
  const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700;900&display=block" rel="stylesheet">
<style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{font-family:"Zen Maru Gothic","Hiragino Maru Gothic ProN",sans-serif;background:#EEF6F7;color:#1C3236;position:relative}
.band{position:absolute;left:0;top:0;bottom:0;width:22px;background:#0E7C86}
.in{position:absolute;left:84px;top:70px;right:330px;bottom:70px;display:flex;flex-direction:column;justify-content:center}
.tag{display:inline-block;align-self:flex-start;background:#FBF4E3;color:#A87A1F;font-weight:900;font-size:28px;border-radius:999px;padding:6px 26px;margin-bottom:26px}
h1{font-size:${p.ogTitle.length>18?54:64}px;line-height:1.3;font-weight:900;color:#0A5A62;margin:0 0 24px;word-break:keep-all;overflow-wrap:anywhere}
p{font-size:30px;line-height:1.6;font-weight:700;color:#4A6468;margin:0}
img{position:absolute;right:56px;bottom:60px;width:270px;height:auto}
.foot{position:absolute;left:84px;bottom:34px;font-size:24px;font-weight:900;color:#0E7C86}
</style></head><body><div class="band"></div>
<div class="in"><span class="tag">fulfull 共有資料</span><h1>${esc(p.ogTitle)}</h1><p>${esc(p.ogDesc)}</p></div>
<img src="file://${ROOT}/img/mascot_invite.webp"><div class="foot">fulfull</div>
</body></html>`;
  const f = join(dir, p.og.replace('.png', '.html'));
  writeFileSync(f, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=6000',
    `--screenshot=${ROOT}/img/${p.og}`, `file://${f}`], { stdio: 'ignore' });
  console.log('og', p.og);
}

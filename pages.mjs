// ページ一覧（build.mjs と og.mjs が使う）
// シェアしたときの題名＝ページの大見出し(h1)を自動で使う（違う題名にしたいときだけ ogTitle を書く）
// ogDesc＝シェアしたときの説明（何の資料かが分かる一文）・og＝シェア画像のファイル名（node og.mjs で作る）
const BASE = '/Users/morikawa/Desktop/fulfull-staff-notes/src';
export const PAGES = [
  { src: `${BASE}/closing.html`, out: 'closing/index.html', img: '../img/', url: 'https://mm738966m-boop.github.io/fulfull-staff-notes/closing/', title: '森川さんの響いた一言', e: false, ogDesc: '相談の録画から拾った、お客さまの反応が変わった言葉と共通の型9つ', og: 'og_closing.png' },
  { src: `${BASE}/benkyokai_1021.html`, out: 'benkyokai/1021/index.html', img: '../../img/', url: 'https://mm738966m-boop.github.io/fulfull-staff-notes/benkyokai/1021/', title: '10/21 勉強会 当日カード', e: false, ogDesc: 'AI仕事術勉強会の名簿・声かけとチャットの文面・時間割', og: 'og_benkyokai_1021.png' },
  { src: `${BASE}/benkyokai_1023.html`, out: 'benkyokai/1023/index.html', img: '../../img/', url: 'https://mm738966m-boop.github.io/fulfull-staff-notes/benkyokai/1023/', title: '10/23 勉強会 当日カード', e: false, ogDesc: 'AI仕事術勉強会の名簿・声かけとチャットの文面・時間割', og: 'og_benkyokai_1023.png' },
  { src: `${BASE}/benkyokai_1025.html`, out: 'benkyokai/1025/index.html', img: '../../img/', url: 'https://mm738966m-boop.github.io/fulfull-staff-notes/benkyokai/1025/', title: '10/25 勉強会 当日カード', e: false, ogDesc: 'AI仕事術勉強会の名簿・声かけとチャットの文面・時間割', og: 'og_benkyokai_1025.png' },
  { src: `${BASE}/benkyokai_1111.html`, out: 'benkyokai/1111/index.html', img: '../../img/', url: 'https://mm738966m-boop.github.io/fulfull-staff-notes/benkyokai/1111/', title: '11/11 勉強会 当日カード', e: false, ogDesc: 'AI仕事術勉強会の名簿・声かけとチャットの文面・時間割', og: 'og_benkyokai_1111.png' },
  { src: `${BASE}/benkyokai_1113.html`, out: 'benkyokai/1113/index.html', img: '../../img/', url: 'https://mm738966m-boop.github.io/fulfull-staff-notes/benkyokai/1113/', title: '11/13 勉強会 当日カード', e: false, ogDesc: 'AI仕事術勉強会の名簿・声かけとチャットの文面・時間割', og: 'og_benkyokai_1113.png' },
  { src: `${BASE}/benkyokai_1115.html`, out: 'benkyokai/1115/index.html', img: '../../img/', url: 'https://mm738966m-boop.github.io/fulfull-staff-notes/benkyokai/1115/', title: '11/15 勉強会 当日カード', e: false, ogDesc: 'AI仕事術勉強会の名簿・声かけとチャットの文面・時間割', og: 'og_benkyokai_1115.png' },
  { src: `${BASE}/kensaku_ai_kenshu.html`, out: 'kensaku/ai-kenshu/index.html', img: '../../img/', url: 'https://mm738966m-boop.github.io/fulfull-staff-notes/kensaku/ai-kenshu/', title: 'AI研修の検索ボリューム', e: false, ogDesc: '人材育成・AI研修まわりの言葉の検索ボリュームと使い道（2026年11月）', og: 'og_kensaku_ai_kenshu.png' },
];

import { readFileSync } from 'node:fs';
const h1 = src => (readFileSync(src, 'utf8').match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].replace(/<br\s*\/?>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
for (const p of PAGES) { p.ogTitle = p.ogTitle || h1(p.src) || p.title; if (!p.ogDesc || !p.og) throw new Error('ogDesc と og を書いてください: ' + p.src); }

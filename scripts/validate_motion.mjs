// Self-contained structural test; does not require npm or GitHub Actions.
import fs from 'node:fs';
const html = fs.readFileSync('index.html','utf8');
const js = fs.readFileSync('assets/motion/eg-motion.js','utf8');
const css = fs.readFileSync('assets/motion/eg-motion.css','utf8');
const re = /\['(\d{2}_[a-z0-9_]+)',\s*'([^']+)'/g;
const entries = [...js.matchAll(re)];
const ids = entries.map(e=>e[1].slice(0,2));
const errors = [];
if(entries.length!==20)errors.push('Expected 20 artwork bindings, found '+entries.length);
if(new Set(ids).size!==20)errors.push('Duplicated artwork index');
for(let n=1;n<=20;n++){
  const prefix=String(n).padStart(2,'0');
  const row=entries.find(e=>e[1].startsWith(prefix+'_'));
  if(!row){errors.push('Missing index '+prefix);continue;}
  if(!fs.existsSync('assets/floating/'+row[1]+'.webp'))errors.push('Missing asset '+row[1]);
  if(!html.includes('id="'+row[2].match(/^#([^ .]+)/)?.[1]+'"'))errors.push('Unknown section '+row[2]);
}
for(const file of ['assets/motion/eg-motion.js','assets/motion/eg-motion.css'])if(!html.includes(file))errors.push('Missing HTML reference '+file);
if(!html.includes('gsap@3.13.0/dist/gsap.min.js'))errors.push('GSAP version not pinned');
if(!html.includes('ScrollTrigger.min.js'))errors.push('ScrollTrigger not loaded');
if(!js.includes('prefers-reduced-motion'))errors.push('Reduced-motion guard missing');
if(!js.includes('visibilitychange'))errors.push('Hidden-tab pause missing');
if(!css.includes('pointer-events:none'))errors.push('Decorative layers may steal clicks');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('PASS: 20 optimized assets, motion selectors, fallback and library links');

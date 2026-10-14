// Gera desktop/app a partir do index.html da raiz, trocando as bibliotecas do CDN
// por cópias locais, para o aplicativo funcionar sem internet.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out = path.join(here, 'app');
const nm = path.join(here, 'node_modules');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'vendor'), { recursive: true });

const copy = (from, to) => {
  const src = path.join(nm, from);
  if (!fs.existsSync(src)) throw new Error(`Faltando: ${src} (rode npm ci)`);
  fs.cpSync(src, path.join(out, 'vendor', to), { recursive: true });
};
copy('three/build', 'three/build');
copy('three/examples/jsm', 'three/examples/jsm');
copy('three-mesh-bvh/src', 'three-mesh-bvh/src');
copy('three-bvh-csg/src', 'three-bvh-csg/src');
copy('fflate/esm', 'fflate/esm');
copy('rhino3dm/rhino3dm.module.min.js', 'rhino3dm/rhino3dm.module.min.js');
copy('rhino3dm/rhino3dm.wasm', 'rhino3dm/rhino3dm.wasm');

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const before = (html.match(/https:\/\/cdn\.jsdelivr\.net\/npm\//g) || []).length;
html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/([a-z0-9-]+)@[\d.]+/g, './vendor/$1');
const left = (html.match(/cdn\.jsdelivr\.net/g) || []).length;
if (!before || left) throw new Error(`Troca de CDN incompleta (${before} encontrados, ${left} restantes)`);
// fontes embutidas no lugar do Google Fonts
copy('@fontsource/ibm-plex-sans-condensed', 'fonts/ibm-plex-sans-condensed');
copy('@fontsource/ibm-plex-mono', 'fonts/ibm-plex-mono');
const fontLinks = [['ibm-plex-sans-condensed', [400, 500, 600]], ['ibm-plex-mono', [400, 500]]]
  .flatMap(([f, ws]) => ws.map(w => `<link rel="stylesheet" href="./vendor/fonts/${f}/${w}.css">`)).join('\n');
html = html.replace(/<link rel="preconnect"[^>]*>\n?/g, '');
html = html.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, fontLinks);
if (/fonts\.googleapis\.com/.test(html)) throw new Error('Link do Google Fonts não foi trocado');
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.copyFileSync(path.join(here, 'build', 'icon.png'), path.join(out, 'icon.png'));
console.log(`app pronto: ${before} referências de CDN trocadas por arquivos locais`);

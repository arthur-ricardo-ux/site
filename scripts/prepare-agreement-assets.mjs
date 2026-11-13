// Prepara os assets do estudo de caso /agreement a partir dos exports do Figma (design-assets/agreement/).
//
// - Telas do iPhone: o export 2x do MCP vem sobre o fundo do canvas (#1e1e1e). A transparência é
//   recuperada com a máscara do get_screenshot 1x (transparente) ampliada para 2x, e a cor é
//   "des-multiplicada" do fundo conhecido.
// - Estados animados (Passo a passo / Component 1106): SVGs vetoriais exportados do Figma, sem o
//   fundo do canvas e sem o contorno do component set. No estado "analisando", o loader estático é
//   removido para dar lugar ao loader girando.
// - Demais imagens: WebP em ~2x do tamanho exibido no frame de 1440 (ou o original, se menor).
import sharp from 'sharp';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';

const SRC = 'design-assets/agreement';
const OUT = 'src/assets/agreement';
const CANVAS_BG = 30; // #1e1e1e

await mkdir(OUT, { recursive: true });

const rasters = [
  { src: 'poster-hero.png', out: 'hero-poster.webp', quality: 80 },
  { src: 's01-videochamadas.png', out: 'contexto-videochamadas.webp', width: 1130 },
  { src: 'poster-hipotese-raw1.png', out: 'hipotese-poster.webp', width: 680 },
  { src: 's04-agreement-overview.png', out: 'solucao-overview.webp' },
  { src: 's06-inteligence.png', out: 'inteligencia-resultados.webp', width: 1392 },
  { src: 's07-platform-bg.png', out: 'dashboard-platform-bg.webp' },
  { src: 'poster-dashboard-raw1.png', out: 'dashboard-poster.webp', quality: 80 },
  { src: 's08-mixpanel-409.png', out: 'mixpanel-operacao.webp' },
  { src: 's08-mixpanel-410.png', out: 'mixpanel-funil.webp' },
  { src: 'm5-loader.png', out: 'm5-loader.webp', lossless: true },
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ src: `dash-${n}.png`, out: `dashboard-tela-${n}.webp` })),
];

for (const job of rasters) {
  const img = sharp(`${SRC}/${job.src}`);
  const meta = await img.metadata();
  const width = job.width && job.width < meta.width ? job.width : meta.width;
  const options = job.lossless ? { lossless: true } : { quality: job.quality ?? 86, alphaQuality: 100, effort: 6 };
  const info = await img.resize({ width }).webp(options).toFile(`${OUT}/${job.out}`);
  console.log(`${job.out}: ${meta.width}x${meta.height} -> ${info.width}x${info.height} (${Math.round(info.size / 1024)} KB)`);
}

for (let n = 1; n <= 5; n++) {
  const exported = await sharp(`${SRC}/phone-m${n}.png`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = exported.info;
  const mask = await sharp(`${SRC}/mask-1x/phone-m${n}.png`)
    .ensureAlpha()
    .extractChannel(3)
    .resize(width, height, { kernel: 'linear' })
    .raw()
    .toBuffer();

  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const a = mask[i] / 255;
    if (a < 0.004) continue;
    for (let c = 0; c < 3; c++) {
      const value = (exported.data[i * 4 + c] - (1 - a) * CANVAS_BG) / a;
      out[i * 4 + c] = Math.max(0, Math.min(255, Math.round(value)));
    }
    out[i * 4 + 3] = mask[i];
  }
  const info = await sharp(out, { raw: { width, height, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(`${OUT}/phone-momento-${n}.webp`);
  console.log(`phone-momento-${n}.webp: ${width}x${height} (${Math.round(info.size / 1024)} KB)`);
}

const removeGroup = (svg, id) => {
  const start = svg.indexOf(`<g id="${id}"`);
  if (start === -1) throw new Error(`grupo "${id}" não encontrado`);
  let depth = 0;
  const tag = /<(\/?)g\b[^>]*?(\/?)>/g;
  tag.lastIndex = start;
  for (let match; (match = tag.exec(svg)); ) {
    if (match[1]) depth--;
    else if (!match[2]) depth++;
    if (depth === 0) return svg.slice(0, start) + svg.slice(tag.lastIndex);
  }
  throw new Error(`grupo "${id}" sem fechamento`);
};

const overlays = [
  { src: 'm1-passo-1.svg', out: 'm1-passo-1.svg' },
  { src: 'm1-passo-2.svg', out: 'm1-passo-2.svg' },
  { src: 'm1-passo-3.svg', out: 'm1-passo-3.svg' },
  { src: 'm5-status-analise.svg', out: 'm5-status-analise.svg', removeGroups: ['Loader anim'] },
  { src: 'm5-status-sucesso.svg', out: 'm5-status-sucesso.svg' },
];

for (const job of overlays) {
  let svg = await readFile(`${SRC}/svg/${job.src}`, 'utf8');
  svg = svg.replace(/<rect width="[\d.]+" height="[\d.]+" fill="#1E1E1E"\/>\n?/, '');
  svg = svg.replace(/<rect[^>]*stroke="#8A38F5"[^>]*\/>\n?/g, '');
  for (const id of job.removeGroups ?? []) svg = removeGroup(svg, id);
  await writeFile(`${OUT}/${job.out}`, svg);
  console.log(`${job.out}: ${Math.round(svg.length / 1024)} KB`);
}

const vectors = {
  'hero-vector-470.svg': 'hero-moldura-superior.svg',
  'hero-vector-469.svg': 'hero-moldura-inferior.svg',
  's02-icon-user-circle.svg': 'icon-user-circle.svg',
  's02-icon-24h.svg': 'icon-24h.svg',
  's02-icon-shield.svg': 'icon-shield.svg',
  's02-icon-building.svg': 'icon-building.svg',
  's07-window-dots.svg': 'browser-dots.svg',
  's07-lock.svg': 'browser-lock.svg',
};
for (const [src, out] of Object.entries(vectors)) await copyFile(`${SRC}/${src}`, `${OUT}/${out}`);
console.log(`${Object.keys(vectors).length} SVGs copiados`);

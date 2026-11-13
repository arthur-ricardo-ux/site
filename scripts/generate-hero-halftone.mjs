// Gera o fundo animado do hero (vídeo em loop) a partir da arte halftone original.
// Os pontos ficam fixos numa grade; só o raio de cada um muda, acompanhando a faixa escura, que
// ondula. A moldura escura (faixas laterais) e a sombra do canto superior esquerdo saem: a grade
// passa a cobrir o quadro inteiro.
// Uso: node scripts/generate-hero-halftone.mjs  (requer ffmpeg no PATH ou FFMPEG=caminho/ffmpeg)
import sharp from 'sharp';
import { spawn } from 'node:child_process';
import { mkdir, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const SOURCE = 'design-assets/hero-halftone.jpg';
const VIDEO = 'src/assets/videos/hero-halftone.mp4';
const POSTER = 'src/assets/images/hero-halftone.webp';

const DURATION = 8; // s — o último quadro emenda no primeiro
const FPS = 30;
// 1376 → 1100 px de largura: ~2× o card do hero em 1440 (o vídeo é desenhado direto nesse tamanho)
const SCALE = 0.8;
const CRF = Number(process.env.CRF ?? 27);
// Emenda do loop: o 1º quadro sai quase sem perdas e a qualidade sobe aos poucos nos últimos 3 s
// (multiplicadores de bitrate, 15 quadros cada), para o último quadro chegar perto do original.
// Sem isso o ruído de compressão muda de uma vez quando o vídeo recomeça e o loop "pisca".
const LOOP_END_RAMP = [1.15, 1.3, 1.5, 1.75, 2.1, 2.6];
// Quadros extras codificados depois do fim (e descartados) para o x264 não economizar nos últimos
const PADDING_FRAMES = 90;
// Ondulação (px da arte): onda que desce pela faixa + harmônico mais curto + leve oscilação vertical
const WAVE = { a1: 40, l1: 640, a2: 12, l2: 300, m2: 1400, b: 16, k: 1100 };

// Arte original (1376×768): painel claro dentro de uma moldura escura; grade medida no painel
const PANEL = { x0: 102, y0: 90, x1: 1274, y1: 682 };
const PITCH = { x: 20.7985, y: 19.9012 };
const ORIGIN = { x: 4.0608, y: 14.0592 };
const PAPER = 239;
const INK = 12;
// Largura da borda antisserrilhada dos pontos (px do vídeo): 1,5 comprime ~25% melhor que 1 e,
// reduzida para o tamanho do card, continua nítida
const EDGE = 1.5;
// Sombra difusa da faixa: escurece o papel entre os pontos (fração do contraste papel → tinta)
const glowFor = (density) => 0.5 * density ** 4;

const TAU = Math.PI * 2;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Média numa janela (2rx+1)×(2ry+1) ponderada por `weight` (pixels com peso 0 não contam). */
function boxMean(src, weight, width, height, rx, ry) {
  const rowSum = new Float32Array(width * height);
  const rowWeight = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    let sum = 0;
    let wsum = 0;
    for (let x = -rx; x < width + rx; x++) {
      const add = x + rx;
      if (add < width) {
        sum += src[y * width + add] * weight[y * width + add];
        wsum += weight[y * width + add];
      }
      const sub = x - rx - 1;
      if (sub >= 0) {
        sum -= src[y * width + sub] * weight[y * width + sub];
        wsum -= weight[y * width + sub];
      }
      if (x >= 0 && x < width) {
        rowSum[y * width + x] = sum;
        rowWeight[y * width + x] = wsum;
      }
    }
  }
  const out = new Float32Array(width * height);
  for (let x = 0; x < width; x++) {
    let sum = 0;
    let wsum = 0;
    for (let y = -ry; y < height + ry; y++) {
      const add = y + ry;
      if (add < height) {
        sum += rowSum[add * width + x];
        wsum += rowWeight[add * width + x];
      }
      const sub = y - ry - 1;
      if (sub >= 0) {
        sum -= rowSum[sub * width + x];
        wsum -= rowWeight[sub * width + x];
      }
      if (y >= 0 && y < height) out[y * width + x] = wsum > 1e-6 ? sum / wsum : 0;
    }
  }
  return out;
}

function maxFilter(src, width, height, r) {
  const pass = (input, horizontal) => {
    const out = new Float32Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let max = 0;
        for (let k = -r; k <= r; k++) {
          const xx = horizontal ? Math.min(width - 1, Math.max(0, x + k)) : x;
          const yy = horizontal ? y : Math.min(height - 1, Math.max(0, y + k));
          max = Math.max(max, input[yy * width + xx]);
        }
        out[y * width + x] = max;
      }
    }
    return out;
  };
  return pass(pass(src, true), false);
}

/**
 * Densidade da faixa (0 = papel, 1 = tinta) numa grade de 8 px que cobre o quadro inteiro.
 * Mede a escuridão média dos pontos (2 células de janela) e preenche, por interpolação harmônica,
 * o que não dá para medir: a moldura e a sombra do canto superior esquerdo.
 */
async function measureDensity() {
  const { data, info } = await sharp(SOURCE).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const image = Float32Array.from(data);
  const panel = new Float32Array(width * height);
  for (let y = PANEL.y0; y < PANEL.y1; y++) for (let x = PANEL.x0; x < PANEL.x1; x++) panel[y * width + x] = 1;

  // Tom do papel sob a sombra (máximo local suavizado), relativo ao papel limpo da direita
  const localMax = maxFilter(image, width, height, 12).map((v, i) => v * panel[i]);
  const shade = boxMean(localMax, panel, width, height, 24, 24);
  let reference = 0;
  let count = 0;
  for (let y = 450; y < 660; y++) {
    for (let x = 1100; x < 1260; x++) {
      reference += shade[y * width + x];
      count++;
    }
  }
  reference /= count;

  const darkness = new Float32Array(width * height);
  const reliable = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const shadeMix = smoothstep(480, 560, x); // a sombra só existe à esquerda da faixa
      const paper = PAPER * (Math.min(1, shade[i] / reference) * (1 - shadeMix) + shadeMix);
      darkness[i] = clamp01((paper - image[i]) / (paper - INK));
      reliable[i] = panel[i] * smoothstep(80, 150, paper); // papel escuro demais: pontos ilegíveis
    }
  }
  const mean = boxMean(darkness, reliable.map((v) => (v > 0.5 ? 1 : 0)), width, height, 20, 20);

  const step = 8;
  const cols = Math.ceil(width / step) + 1;
  const rows = Math.ceil(height / step) + 1;
  const known = new Float32Array(cols * rows);
  const weight = new Float32Array(cols * rows);
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const x = Math.min(width - 1, gx * step);
      const y = Math.min(height - 1, gy * step);
      const inside = x >= PANEL.x0 + 20 && x < PANEL.x1 - 20 && y >= PANEL.y0 + 20 && y < PANEL.y1 - 20;
      known[gy * cols + gx] = mean[y * width + x];
      weight[gy * cols + gx] = inside ? smoothstep(0.6, 1, reliable[y * width + x]) : 0;
    }
  }
  let field = known.map((v, k) => (weight[k] < 1 ? 0.15 : v));
  for (let iteration = 0; iteration < 4000; iteration++) {
    const next = new Float32Array(cols * rows);
    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        const k = gy * cols + gx;
        const neighbours =
          field[gy * cols + Math.max(0, gx - 1)] +
          field[gy * cols + Math.min(cols - 1, gx + 1)] +
          field[Math.max(0, gy - 1) * cols + gx] +
          field[Math.min(rows - 1, gy + 1) * cols + gx];
        next[k] = weight[k] * known[k] + (1 - weight[k]) * (neighbours / 4);
      }
    }
    field = next;
  }

  return {
    width,
    height,
    sample(x, y) {
      const fx = Math.min(cols - 1.001, Math.max(0, x / step));
      const fy = Math.min(rows - 1.001, Math.max(0, y / step));
      const gx = Math.floor(fx);
      const gy = Math.floor(fy);
      const tx = fx - gx;
      const ty = fy - gy;
      const top = field[gy * cols + gx] * (1 - tx) + field[gy * cols + gx + 1] * tx;
      const bottom = field[(gy + 1) * cols + gx] * (1 - tx) + field[(gy + 1) * cols + gx + 1] * tx;
      return top * (1 - ty) + bottom * ty;
    },
  };
}

/** Raio do ponto cuja interseção com a célula (PITCH.x × PITCH.y) cobre a fração `coverage` dela. */
function radiusForCoverage() {
  const samples = 2000;
  const maxRadius = Math.hypot(PITCH.x / 2, PITCH.y / 2);
  const table = new Float64Array(samples + 1);
  for (let k = 0; k <= samples; k++) {
    const r = (k / samples) * maxRadius;
    let area = 0;
    for (let s = 0; s < 400; s++) {
      const x = -PITCH.x / 2 + ((s + 0.5) / 400) * PITCH.x;
      const h = r * r - x * x;
      if (h > 0) area += Math.min(PITCH.y, 2 * Math.sqrt(h)) * (PITCH.x / 400);
    }
    table[k] = area / (PITCH.x * PITCH.y);
  }
  return (coverage) => {
    if (coverage <= 0) return 0;
    if (coverage >= 1) return maxRadius;
    let lo = 0;
    let hi = samples;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (table[mid] < coverage) lo = mid;
      else hi = mid;
    }
    const t = (coverage - table[lo]) / (table[hi] - table[lo] || 1);
    return ((lo + t) / samples) * maxRadius;
  };
}

/** Deslocamento do campo de densidade no instante t (zero em t = 0, periódico em DURATION). */
function displacement(x, y, t) {
  const phase = (TAU * t) / DURATION;
  const s1 = (-TAU * y) / WAVE.l1;
  const s2 = (-TAU * y) / WAVE.l2 + (TAU * x) / WAVE.m2;
  const s3 = (TAU * x) / WAVE.k;
  return [
    WAVE.a1 * (Math.sin(phase + s1) - Math.sin(s1)) + WAVE.a2 * (Math.sin(2 * phase + s2) - Math.sin(s2)),
    WAVE.b * (Math.sin(phase + s3) - Math.sin(s3)),
  ];
}

/** Renderizador de quadros width×height; a grade e a faixa vêm da arte original reduzida por SCALE. */
function createRenderer(sample, width, height) {
  const radiusFor = radiusForCoverage();
  const pitchX = PITCH.x * SCALE;
  const pitchY = PITCH.y * SCALE;
  const originX = ORIGIN.x * SCALE;
  const originY = ORIGIN.y * SCALE;
  const i0 = Math.floor(-originX / pitchX) - 1;
  const j0 = Math.floor(-originY / pitchY) - 1;
  const cols = Math.ceil((width - originX) / pitchX) + 2 - i0;
  const rows = Math.ceil((height - originY) / pitchY) + 2 - j0;
  const radius = new Float32Array(cols * rows);
  const glow = new Float32Array(cols * rows);

  /** Quadro em tons de cinza (0–255) no instante t. */
  return (t) => {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        // posição do ponto na arte original
        const x = ORIGIN.x + (i + i0) * PITCH.x;
        const y = ORIGIN.y + (j + j0) * PITCH.y;
        const [dx, dy] = displacement(x, y, t);
        const density = clamp01(sample(x - dx, y - dy));
        const g = glowFor(density);
        // a sombra já escurece o papel: o ponto cobre só o restante da densidade
        radius[j * cols + i] = radiusFor((density - g) / (1 - g)) * SCALE;
        glow[j * cols + i] = g;
      }
    }

    const frame = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
      const py = y + 0.5;
      const jc = Math.round((py - originY) / pitchY);
      const fj = (py - originY) / pitchY - j0;
      const jg = Math.min(rows - 2, Math.max(0, Math.floor(fj)));
      const ty = clamp01(fj - jg);
      for (let x = 0; x < width; x++) {
        const px = x + 0.5;
        const ic = Math.round((px - originX) / pitchX);
        // cobertura antisserrilhada: o ponto vizinho (3×3) que mais cobre este pixel
        let coverage = 0;
        for (let j = jc - 1; j <= jc + 1 && coverage < 1; j++) {
          const jj = j - j0;
          if (jj < 0 || jj >= rows) continue;
          const ddy = py - (originY + j * pitchY);
          for (let i = ic - 1; i <= ic + 1; i++) {
            const ii = i - i0;
            if (ii < 0 || ii >= cols) continue;
            const r = radius[jj * cols + ii];
            if (r <= 0) continue;
            const ddx = px - (originX + i * pitchX);
            coverage = Math.max(coverage, (r - Math.sqrt(ddx * ddx + ddy * ddy)) / EDGE + 0.5);
          }
        }
        coverage = Math.min(1, coverage);
        const fi = (px - originX) / pitchX - i0;
        const ig = Math.min(cols - 2, Math.max(0, Math.floor(fi)));
        const tx = clamp01(fi - ig);
        const g =
          (glow[jg * cols + ig] * (1 - tx) + glow[jg * cols + ig + 1] * tx) * (1 - ty) +
          (glow[(jg + 1) * cols + ig] * (1 - tx) + glow[(jg + 1) * cols + ig + 1] * tx) * ty;
        const paper = PAPER - (PAPER - INK) * g;
        frame[y * width + x] = Math.round(paper + (INK - paper) * coverage);
      }
    }
    return frame;
  };
}

function ffmpeg(args, input) {
  const child = spawn(process.env.FFMPEG ?? 'ffmpeg', ['-y', '-loglevel', 'error', ...args], {
    stdio: [input ? 'pipe' : 'ignore', 'inherit', 'inherit'],
  });
  const done = new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg saiu com código ${code}`))));
  });
  return { stdin: child.stdin, done };
}

async function encode(render, width, height) {
  const frames = DURATION * FPS;
  const zones = [
    '0,0,q=14',
    ...LOOP_END_RAMP.map((b, k) => {
      const start = frames - (LOOP_END_RAMP.length - k) * 15;
      return `${start},${start + 14},b=${b}`;
    }),
  ].join('/');
  const padded = join(tmpdir(), 'hero-halftone-padded.mp4');

  // YUV 4:2:0 em faixa limitada montado aqui mesmo (cinza neutro: U = V = 128)
  const chroma = Buffer.alloc((width / 2) * (height / 2) * 2, 128);
  const x264 = ffmpeg(
    [
      ['-f', 'rawvideo', '-pix_fmt', 'yuv420p', '-s', `${width}x${height}`, '-r', String(FPS), '-i', 'pipe:0'],
      ['-c:v', 'libx264', '-preset', 'veryslow', '-crf', String(CRF), '-x264-params', `bframes=0:zones=${zones}`],
      ['-pix_fmt', 'yuv420p', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709'],
      ['-color_trc', 'iec61966-2-1', '-an', padded],
    ].flat(),
    true,
  );
  for (let k = 0; k < frames + PADDING_FRAMES; k++) {
    const gray = render(((k % frames) / frames) * DURATION);
    const luma = Buffer.from(gray.map((v) => Math.round(16 + (v * 219) / 255)));
    if (!x264.stdin.write(Buffer.concat([luma, chroma]))) await new Promise((r) => x264.stdin.once('drain', r));
  }
  x264.stdin.end();
  await x264.done;

  // Sem quadros B, cortar o excedente não depende de quadros posteriores
  await ffmpeg(['-i', padded, '-frames:v', String(frames), '-c', 'copy', '-movflags', '+faststart', VIDEO]).done;
  await rm(padded);
}

const density = await measureDensity();
const width = Math.round((density.width * SCALE) / 2) * 2;
const height = Math.round((density.height * SCALE) / 2) * 2;
const render = createRenderer(density.sample, width, height);
await mkdir(dirname(VIDEO), { recursive: true });

// Capa = primeiro quadro (a composição do Figma, sem a moldura): aparece até o vídeo tocar
// e fica no lugar dele com "reduzir movimento"
const poster = await sharp(Buffer.from(render(0)), { raw: { width, height, channels: 1 } })
  .webp({ lossless: true, effort: 6 }) // pontos sintéticos: sem perdas sai menor que com perdas
  .toFile(POSTER);
console.log(`${POSTER}: ${width}x${height} (${Math.round(poster.size / 1024)} KB)`);

await encode(render, width, height);
const { size } = await stat(VIDEO);
console.log(`${VIDEO}: ${width}x${height}, ${DURATION}s @ ${FPS}fps (${Math.round(size / 1024)} KB)`);

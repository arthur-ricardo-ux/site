// Fundos dos cards de "Todos os projetos" exportados do Figma (camada "Fundo", 2x) vêm recortados pelo
// card: cantos arredondados no cinza do canvas (#DADADA) e o traço branco de 2px. O site desenha o próprio
// recorte e a borda, então aqui essas áreas são refeitas estendendo o fundo vizinho:
// - faixa das bordas retas: copia a coluna/linha logo depois da faixa;
// - cantos: prolonga radialmente o pixel logo dentro do arco do canto.
// Uso: node scripts/clean-project-backgrounds.mjs  (design-assets/projects/*-bg*.png → *-clean.png)
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';

const dir = 'design-assets/projects';
const files = (await readdir(dir)).filter((f) => /-bg(-mobile)?\.png$/.test(f));

for (const file of files) {
  const mobile = file.includes('-mobile');
  const { data, info } = await sharp(`${dir}/${file}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const radius = (mobile ? 24 : 48) * 2; // raio do card, exportado a 2x
  const band = 8; // traço branco (2px × 2) + antisserrilhado
  const at = (x, y) => (Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))) * 3;
  const out = Buffer.from(data);
  const copy = (x, y, sx, sy) => {
    const i = at(x, y), j = at(sx, sy);
    out[i] = data[j]; out[i + 1] = data[j + 1]; out[i + 2] = data[j + 2];
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // centro do arco do canto mais próximo (se o pixel estiver num dos quadrados dos cantos)
      const cx = x < radius ? radius : x >= w - radius ? w - 1 - radius : null;
      const cy = y < radius ? radius : y >= h - radius ? h - 1 - radius : null;
      if (cx !== null && cy !== null) {
        const dx = x - cx, dy = y - cy, dist = Math.hypot(dx, dy);
        const inner = radius - band - 2;
        if (dist > inner) copy(x, y, Math.round(cx + (dx / dist) * inner), Math.round(cy + (dy / dist) * inner));
        continue;
      }
      if (x < band) copy(x, y, band, y);
      else if (x >= w - band) copy(x, y, w - 1 - band, y);
      else if (y < band) copy(x, y, x, band);
      else if (y >= h - band) copy(x, y, x, h - 1 - band);
    }
  }
  await sharp(out, { raw: { width: w, height: h, channels: 3 } }).png().toFile(`${dir}/${file.replace('.png', '-clean.png')}`);
  console.log(`${file}: ${w}x${h}`);
}

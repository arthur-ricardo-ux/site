// Gera versões otimizadas (WebP) dos assets exportados do Figma.
// Originais ficam em design-assets/; saída em src/assets/images/.
// Larguras = 2x o tamanho renderizado no frame 1440 (ou o original, se menor).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const jobs = [
  { src: 'avatar-arthur.png', out: 'avatar-arthur.webp', width: 400 },
  { src: 'case-halftone-bg.png', out: 'case-halftone-bg.webp' },
  { src: 'case-contratacoes-mockup.png', out: 'case-contratacoes-mockup.webp', width: 1688 },
  { src: 'case-auditor-laptops.png', out: 'case-auditor-laptops.webp' },
  { src: 'case-indexacao-laptop.png', out: 'case-indexacao-laptop.webp' },
  // hero-halftone.webp é a capa do vídeo gerado por scripts/generate-hero-halftone.mjs
  // Cards de "Estudos de Caso Selecionados" (Figma 590:2638 / 590:2639 / 590:2640)
  { src: 'cases/agreement-bg.png', out: 'case-agreement-bg.webp' },
  { src: 'cases/agreement-keyboard.png', out: 'case-agreement-keyboard.webp' },
  { src: 'cases/agreement-keyboard-mobile.png', out: 'case-agreement-keyboard-mobile.webp' },
  { src: 'cases/gurudrive-bg.png', out: 'case-gurudrive-bg.webp' },
  { src: 'cases/gurudrive-mockup.png', out: 'case-gurudrive-mockup.webp', width: 1274 },
  { src: 'cases/artds-composition.png', out: 'case-artds-composition.webp', width: 2132 },
  // Fotos de "Sobre mim" (Figma 471:6076) — 2x do tamanho exibido no card de 220px
  { src: 'about/retrato-meuguru.png', out: 'about-retrato-meuguru.webp', width: 550 },
  { src: 'about/emblema.png', out: 'about-emblema.webp', width: 600 },
  { src: 'about/corrida.png', out: 'about-corrida.webp', width: 560 },
  { src: 'about/mergulho.png', out: 'about-mergulho.webp' },
  // Logos de "Formação" (56px no Figma → 3x). `extract` reproduz o recorte do frame no Figma.
  { src: 'logo-uvv.png', out: 'logo-uvv.webp', width: 168, extract: { left: 150, top: 0, width: 300, height: 300 } },
  { src: 'logo-unifei.png', out: 'logo-unifei.webp', width: 168, extract: { left: 91, top: 0, width: 174, height: 174 } },
  { src: 'logo-cedtec.png', out: 'logo-cedtec.webp', width: 168 },
  // Logos de "Cursos e Certificados" (Figma 617:5742) — 56px no card → 2x
  { src: 'courses/iaux-lab.png', out: 'course-iaux-lab.webp', width: 120 },
  { src: 'courses/cfpro.png', out: 'course-cfpro.webp', width: 112 },
  { src: 'courses/curso-de-figma.png', out: 'course-curso-de-figma.webp', width: 112 },
  { src: 'courses/coursera.png', out: 'course-coursera.webp', width: 112 },
  { src: 'courses/dataplus.png', out: 'course-dataplus.webp', width: 112 },
  { src: 'courses/bpm.png', out: 'course-bpm.webp', width: 112 },
  // Página "Todos os projetos" (Figma 526:4954): fundos limpos (clean-project-backgrounds.mjs) e mockups
  { src: 'projects/auditor-bg-clean.png', out: 'project-auditor-bg.webp' },
  { src: 'projects/auditor-bg-mobile-clean.png', out: 'project-auditor-bg-mobile.webp' },
  { src: 'projects/auditor-mockup.png', out: 'project-auditor-mockup.webp' },
  { src: 'projects/lucro-bg-clean.png', out: 'project-lucro-bg.webp' },
  { src: 'projects/lucro-bg-mobile-clean.png', out: 'project-lucro-bg-mobile.webp' },
  { src: 'projects/lucro-mockup.png', out: 'project-lucro-mockup.webp' },
  { src: 'projects/acessibilidade-bg-clean.png', out: 'project-acessibilidade-bg.webp' },
  { src: 'projects/acessibilidade-bg-mobile-clean.png', out: 'project-acessibilidade-bg-mobile.webp' },
  { src: 'projects/acessibilidade-mockup.png', out: 'project-acessibilidade-mockup.webp' },
  { src: 'projects/reembolso-bg-clean.png', out: 'project-reembolso-bg.webp' },
  { src: 'projects/reembolso-bg-mobile-clean.png', out: 'project-reembolso-bg-mobile.webp' },
  { src: 'projects/reembolso-mockup.png', out: 'project-reembolso-mockup.webp', width: 1080 },
  { src: 'projects/meuguru-bg-clean.png', out: 'project-meuguru-bg.webp' },
  { src: 'projects/meuguru-bg-mobile-clean.png', out: 'project-meuguru-bg-mobile.webp' },
  { src: 'projects/meuguru-mockup.png', out: 'project-meuguru-mockup.webp', width: 1240 },
  { src: 'projects/reputacao-bg-clean.png', out: 'project-reputacao-bg.webp' },
  { src: 'projects/reputacao-bg-mobile-clean.png', out: 'project-reputacao-bg-mobile.webp' },
  { src: 'projects/reputacao-mockup.png', out: 'project-reputacao-mockup.webp' },
];

await mkdir('src/assets/images', { recursive: true });
for (const job of jobs) {
  const img = sharp(`design-assets/${job.src}`);
  const meta = await img.metadata();
  if (job.extract) img.extract(job.extract);
  const sourceWidth = job.extract?.width ?? meta.width;
  const width = job.width && job.width < sourceWidth ? job.width : sourceWidth;
  const info = await img.resize({ width }).webp({ quality: 86, alphaQuality: 100, effort: 6 }).toFile(`src/assets/images/${job.out}`);
  console.log(`${job.out}: ${meta.width}x${meta.height} -> ${info.width}x${info.height} (${Math.round(info.size / 1024)} KB)`);
}

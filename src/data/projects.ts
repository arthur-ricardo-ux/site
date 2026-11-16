import auditorBg from '../assets/images/project-auditor-bg.webp';
import auditorBgMobile from '../assets/images/project-auditor-bg-mobile.webp';
import auditorMockup from '../assets/images/project-auditor-mockup.webp';
import auditorMask from '../assets/images/project-auditor-mask.svg';
import auditorMaskMobile from '../assets/images/project-auditor-mask-mobile.svg';
import lucroBg from '../assets/images/project-lucro-bg.webp';
import lucroBgMobile from '../assets/images/project-lucro-bg-mobile.webp';
import lucroMockup from '../assets/images/project-lucro-mockup.webp';
import acessibilidadeBg from '../assets/images/project-acessibilidade-bg.webp';
import acessibilidadeBgMobile from '../assets/images/project-acessibilidade-bg-mobile.webp';
import acessibilidadeMockup from '../assets/images/project-acessibilidade-mockup.webp';
import reembolsoBg from '../assets/images/project-reembolso-bg.webp';
import reembolsoBgMobile from '../assets/images/project-reembolso-bg-mobile.webp';
import reembolsoMockup from '../assets/images/project-reembolso-mockup.webp';
import meuGuruBg from '../assets/images/project-meuguru-bg.webp';
import meuGuruBgMobile from '../assets/images/project-meuguru-bg-mobile.webp';
import meuGuruMockup from '../assets/images/project-meuguru-mockup.webp';
import reputacaoBg from '../assets/images/project-reputacao-bg.webp';
import reputacaoBgMobile from '../assets/images/project-reputacao-bg-mobile.webp';
import reputacaoMockup from '../assets/images/project-reputacao-mockup.webp';
import { caseStudies, type Box, type CaseStudy } from './caseStudies';

/** Cabeçalho da página "Todos os projetos" (Figma 544:1170) */
export const projectsIntro = {
  title: 'Projetos',
  description: ['Uma seleção de projetos que conectam estratégia, ', 'experiência e tecnologia para resolver problemas reais.'],
};

/** "Capa" no fim da página (Figma 526:4970) */
export const projectsCta = {
  title: 'Quer conhecer melhor os projetos acima?',
  description:
    'Agende uma conversa para eu apresentar os bastidores, as decisões e os resultados que não cabem em um estudo de caso.',
};

/** Fundo exportado da camada "Fundo" do Figma: cobre o card de 1024×540 inteiro */
const FULL_CARD: Box = { left: 0, top: 0, width: 1024, height: 540 };
/** Largura do quadro da mídia no card mobile de 360px (padding 24 + borda 2 de cada lado) */
const MOBILE_FRAME = 308;

/** Campos comuns aos cards "Project Card / …" ainda sem estudo de caso publicado */
const comingSoon = { href: '#', cta: 'Em breve', ctaIcon: 'padlock', inset: 56 } as const;

/**
 * Cards "Project Card / …" (Figma 636:4899, 638:4866, 639:4856, 639:4914, 640:4877, 640:4927), cada um com
 * as variantes Viewport=Web (1024×540) e Viewport=Mobile (360). Caixas da mídia convertidas para o
 * canto do card (desktop) e do quadro da mídia (mobile) a partir das medidas do Figma.
 */
const moreProjects: CaseStudy[] = [
  {
    ...comingSoon,
    id: 'auditor-ia',
    accent: '#cfe3b5',
    eyebrow: 'Novo produto • Assistente de IA',
    title: [{ text: 'Auditor.IA: ' }, { text: 'Auditoria inteligente, decisões automatizadas', accent: true }],
    titleWidth: 374,
    description:
      'Uma IA que analisa chamadas de áudio e vídeo, calcula scores de qualidade e classifica atendimentos automaticamente, eliminando a necessidade de auditorias manuais.',
    descriptionWidth: 388,
    background: { src: auditorBg, box: FULL_CARD },
    media: {
      kind: 'image',
      box: { left: 468, top: -10, width: 995.658, height: 560 },
      mask: auditorMask,
      image: { src: auditorMockup, alt: 'Auditor.IA no laptop e no celular, com a lista de auditorias de atendimentos', width: 1672, height: 941 },
    },
    mobile: {
      textGap: 32,
      background: { src: auditorBgMobile, anchor: 'bottom' },
      media: { width: MOBILE_FRAME, height: 232, image: { left: -56, top: -6, width: 500, height: 281.221 }, mask: auditorMaskMobile },
    },
  },
  {
    ...comingSoon,
    id: 'redesign-novos-pedidos',
    accent: '#ddb4f7',
    eyebrow: 'Redesign • UX/UI Design',
    title: [
      { text: 'Uma nova experiência que ' },
      { text: 'aumentou em 20%', accent: true },
      { text: 'o número de pedidos', lineBreak: true },
    ],
    description:
      'Como redesenhei toda a experiência de novos pedidos com base em pesquisas e testes de usabilidade, reduzindo abandonos e aumentando a conversão.',
    background: { src: lucroBg, box: FULL_CARD },
    media: {
      kind: 'image',
      box: { left: 361.34, top: 50.35, width: 740, height: 612.33 },
      rotate: -9,
      crop: { left: -17.63, top: -15.12, width: 142.18, height: 128.87 },
      image: { src: lucroMockup, alt: 'Novo fluxo de pedidos do Meu Guru no MacBook e no celular', width: 1500, height: 1125 },
    },
    mobile: {
      textGap: 32,
      background: { src: lucroBgMobile, anchor: 'bottom' },
      media: { width: MOBILE_FRAME, height: 236, image: { left: -7.16, top: -26.49, width: 390, height: 322.714 } },
    },
  },
  {
    ...comingSoon,
    id: 'acessibilidade-nuvidio',
    accent: '#ff8dbe',
    eyebrow: 'Redesign • UX/UI Design',
    title: [{ text: 'Quando o redesign coloca a ' }, { text: 'acessibilidade em primeiro lugar.', accent: true }],
    description:
      'Como redesenhei a jornada de atendimento digital da Nuvidio, priorizando acessibilidade e usabilidade para reduzir abandonos e aumentar a conversão.',
    background: { src: acessibilidadeBg, box: FULL_CARD },
    media: {
      kind: 'image',
      box: { left: 482, top: 24, width: 560, height: 665.412 },
      crop: { left: -46.7, top: -8.44, width: 183.37, height: 115.74 },
      image: { src: acessibilidadeMockup, alt: 'Três telas do atendimento digital da Nuvidio no celular', width: 1500, height: 1125 },
    },
    mobile: {
      textGap: 32,
      background: { src: acessibilidadeBgMobile, anchor: 'bottom' },
      media: { width: MOBILE_FRAME, height: 270, image: { left: -11, top: 0, width: 330, height: 392.118 } },
    },
  },
  {
    ...comingSoon,
    id: 'reembolso-meu-guru',
    accent: '#9cc3ff',
    eyebrow: 'Novo micro serviço • Automação de processos',
    title: [{ text: 'Automação que ' }, { text: 'reduziu o suporte em mais de 50%.', accent: true }],
    titleWidth: 330,
    description:
      'Como transformei um processo manual solicitação de reembolso em uma jornada automatizada, permitindo a negociação direta entre clientes e freelancers e reduzindo em mais de 50% os chamados ao suporte.',
    background: { src: reembolsoBg, box: FULL_CARD },
    media: {
      kind: 'image',
      box: { left: 488, top: -36, width: 540, height: 643.781 },
      image: { src: reembolsoMockup, alt: 'Telas de solicitação de reembolso e detalhes da disputa no Meu Guru', width: 1080, height: 1288 },
    },
    mobile: {
      textGap: 32,
      background: { src: reembolsoBgMobile, anchor: 'bottom' },
      media: { width: MOBILE_FRAME, height: 280, image: { left: -6, top: 0, width: 320, height: 381.5 } },
    },
  },
  {
    ...comingSoon,
    id: 'redesign-meu-guru',
    accent: '#7fddea',
    eyebrow: 'Redesign • UX/UI Design',
    title: [{ text: 'Redesign de ponta a ponta: uma ' }, { text: 'nova experiência', accent: true }, { text: ' Meu Guru' }],
    description:
      'Como modernizei os principais fluxos da plataforma para simplificar o acompanhamento das propostas e o acesso às atividades concluídas.',
    background: { src: meuGuruBg, box: FULL_CARD },
    media: {
      kind: 'image',
      box: { left: 500, top: -28, width: 620, height: 590.632 },
      image: { src: meuGuruMockup, alt: 'Três telas da plataforma Meu Guru no celular, com propostas e atividades', width: 1240, height: 1182 },
    },
    mobile: {
      textGap: 32,
      background: { src: meuGuruBgMobile, anchor: 'bottom' },
      media: { width: MOBILE_FRAME, height: 280, image: { left: -21, top: 0, width: 350, height: 333.421 } },
    },
  },
  {
    ...comingSoon,
    id: 'reputacao-freelancers',
    accent: '#a8e6a3',
    eyebrow: 'Redesign · Gamificação',
    title: [{ text: 'Redesign e gamificação ', accent: true }, { text: 'para impulsionar resultados' }],
    description:
      'Redesenhei os perfis dos freelancers e introduzi elementos de gamificação para valorizar bons profissionais, incentivar avaliações positivas e aumentar a confiança na contratação.',
    background: { src: reputacaoBg, box: FULL_CARD },
    media: {
      kind: 'image',
      box: { left: 494, top: -74, width: 530, height: 656.516 },
      crop: { left: -60.59, top: 0, width: 220.31, height: 100 },
      image: { src: reputacaoMockup, alt: 'Perfil de uma freelancer no Meu Guru, com avaliações e especializações', width: 1280, height: 720 },
    },
    mobile: {
      textGap: 32,
      background: { src: reputacaoBgMobile, anchor: 'bottom' },
      media: { width: MOBILE_FRAME, height: 290, image: { left: -11, top: -10, width: 330, height: 408.774 } },
    },
  },
];

/** Ordem da "Galeria de projetos" (Figma 544:1191): os três estudos de caso da Home e os demais */
export const allProjects: CaseStudy[] = [...caseStudies, ...moreProjects];

import agreementBg from '../assets/images/case-agreement-bg.webp';
import gurudriveBg from '../assets/images/case-gurudrive-bg.webp';
import gurudriveMockup from '../assets/images/case-gurudrive-mockup.webp';
import artdsDotGrid from '../assets/images/case-artds-dot-grid.svg';
import artdsComposition from '../assets/images/case-artds-composition.webp';
import artdsLogo from '../assets/images/case-artds-logo.svg';
import artdsDotGridMobile from '../assets/images/case-artds-dot-grid-mobile.svg';
import artdsLogoMobile from '../assets/images/case-artds-logo-mobile.svg';

/** Caixa no card de 1024×540 do Figma (px, a partir da borda externa — o traço é "inside") */
export type Box = { left: number; top: number; width: number; height: number };

type Image = { src: string; alt: string; width: number; height: number };

export type CaseStudyMedia =
  /** Laptop do Figma com o vídeo do estudo de caso na tela */
  | { kind: 'laptop-video'; box: Box }
  | { kind: 'image'; box: Box; image: Image }
  /** Composição do Art DS + logo "art" (box do logo relativo à composição) */
  | { kind: 'composition'; box: Box; image: Image; logo: { src: string; box: Box } };

export type CaseStudy = {
  id: string;
  /** Página do estudo de caso ('#' = ainda sem página; o clique não navega) */
  href: string;
  /** Cor do título em destaque, do contorno do botão e do botão preenchido (hover) */
  accent: string;
  eyebrow: string;
  /** Trechos do título; `accent` pinta o trecho com a cor do projeto */
  title: { text: string; accent?: boolean }[];
  description: string;
  cta: string;
  /** Margem do texto até a borda externa do card (px) */
  inset: number;
  background: { src: string; box: Box };
  media: CaseStudyMedia;
  /** Versão mobile (< 768px; Figma 593:6041 / 593:6040 / 593:6039) */
  mobile: {
    /** Espaço entre o bloco do título e o da descrição */
    textGap: number;
    /** Fundo em px a partir do canto do card; sem `box`, cobre o card inteiro */
    background: { src: string; box?: Box };
    /** Quadro da mídia (largura = conteúdo do card) e, dentro dele, as caixas da imagem e do logo */
    media?: { width: number; height: number; image: Box; logo?: { src: string; box: Box } };
  };
};

/** Cards "Card Agreement" (590:2638), "Card GuruDrive" (590:2639) e "Card Art Design System" (590:2640) */
export const caseStudies: CaseStudy[] = [
  {
    id: 'agreement',
    href: '/agreement/',
    accent: '#ecf76d',
    eyebrow: 'Novo produto • Exp. do cliente e dash de gestão',
    title: [{ text: 'Agreement: ' }, { text: 'Contratações bancárias guiadas por agentes de IA', accent: true }],
    description:
      'Uma jornada autônoma que confirma contratos por vídeo, valida a identidade do cliente e transforma análises de IA em evidências para apoiar a decisão dos bancos, 24 horas por dia.',
    cta: 'Ler Estudo de caso',
    inset: 56,
    background: { src: agreementBg, box: { left: -144, top: -4, width: 1553, height: 823 } },
    media: { kind: 'laptop-video', box: { left: 454, top: 102, width: 775, height: 382.152 } },
    mobile: {
      textGap: 32,
      background: { src: agreementBg, box: { left: -381.5, top: -8, width: 1445.003, height: 766.137 } },
    },
  },
  {
    id: 'gurudrive',
    href: '#',
    accent: '#e1ceff',
    eyebrow: 'Novo produto • Plataforma Desktop e Mobile',
    title: [{ text: 'GuruDrive: ' }, { text: 'Indexação de materiais universitários', accent: true }],
    description:
      'O produto de armazenamento de arquivos que permite alunos de todo o país encontrem materiais de estudo, como: atividades resolvidas, provas, trabalhos, livros e muito mais, diretamente da sua universidade e curso.',
    cta: 'Ver mais',
    inset: 56,
    background: { src: gurudriveBg, box: { left: -144, top: -4, width: 1536, height: 1024 } },
    media: {
      kind: 'image',
      box: { left: 477, top: 25, width: 637, height: 478 },
      image: {
        src: gurudriveMockup,
        alt: 'Plataforma meu guru no laptop e no celular, com materiais de Engenharia Elétrica da UFES',
        width: 1274,
        height: 956,
      },
    },
    mobile: {
      textGap: 24,
      background: { src: gurudriveBg, box: { left: -536, top: -5, width: 1509, height: 1006 } },
      media: { width: 308, height: 218, image: { left: 0, top: -12.99, width: 308, height: 230.99 } },
    },
  },
  {
    id: 'art-design-system',
    href: '#',
    accent: '#85b3ff',
    eyebrow: 'Projeto autoral e totalmente white-label',
    title: [{ text: 'Art Design System:', accent: true }, { text: ' Criado do zero para se adaptar a qualquer marca' }],
    description:
      'Como construí um Design System com Server-Driven UI, critérios de acessibilidade da WCAG e uma arquitetura preparada para fluxos com IA e MCP.',
    cta: 'Ver mais',
    inset: 56,
    background: { src: artdsDotGrid, box: { left: 0, top: 0, width: 1024, height: 540 } },
    media: {
      kind: 'composition',
      box: { left: 332, top: 33, width: 1066, height: 677 },
      image: {
        src: artdsComposition,
        alt: 'Componentes do Art Design System em perspectiva: formulários, alertas, abas e paleta de cores',
        width: 2132,
        height: 1354,
      },
      // Exportado do Figma já girado e com a sombra; no card fica em (537, 92)
      logo: { src: artdsLogo, box: { left: 205, top: 59, width: 239, height: 137 } },
    },
    mobile: {
      textGap: 32,
      background: { src: artdsDotGridMobile },
      media: {
        width: 324.28,
        height: 206,
        image: { left: -80, top: -85, width: 738.29, height: 469 },
        // Exportado já girado e com sombra (o logo mobile tem outra posição na composição)
        logo: { src: artdsLogoMobile, box: { left: 8, top: -7, width: 166, height: 95 } },
      },
    },
  },
];

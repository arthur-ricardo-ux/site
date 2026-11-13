import logoUvv from '../assets/images/logo-uvv.webp';
import logoUnifei from '../assets/images/logo-unifei.webp';
import logoCedtec from '../assets/images/logo-cedtec.webp';
import photoRetrato from '../assets/images/about-retrato-meuguru.webp';
import photoEmblema from '../assets/images/about-emblema.webp';
import photoCorrida from '../assets/images/about-corrida.webp';
import photoMergulho from '../assets/images/about-mergulho.webp';
import courseIauxLab from '../assets/images/course-iaux-lab.webp';
import courseCfpro from '../assets/images/course-cfpro.webp';
import courseCursoDeFigma from '../assets/images/course-curso-de-figma.webp';
import courseCoursera from '../assets/images/course-coursera.webp';
import courseDataplus from '../assets/images/course-dataplus.webp';
import courseBpm from '../assets/images/course-bpm.webp';

export type ExperienceAccent = 'blue' | 'green' | 'yellow' | 'pink';

export type ExperienceEntry = {
  role: string;
  period: string;
  accent: ExperienceAccent;
  highlights: string[];
};

export type EducationEntry = {
  title: string;
  period: string;
  logo: { src: string; alt: string };
};

/**
 * Foto do painel "Sobre mim" (Figma 471:6076). `crop` = caixa da imagem em % da área interna do card
 * (216×298 no Figma), convertida das medidas em px do frame para valer em qualquer tamanho.
 */
export type AboutPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  crop: { left: number; top: number; width: number; height: number };
};

/**
 * Curso ou certificado de "Formação" (Figma 617:5742). Para adicionar um curso basta incluir um item;
 * campos opcionais sem valor simplesmente não aparecem no card.
 */
export type CourseEntry = {
  title: string;
  institution: string;
  /** Ano de conclusão */
  year?: string;
  /** Carga horária (ex.: '40h') */
  duration?: string;
  certificateUrl?: string;
  /**
   * Logo da instituição num círculo de 56px. `box` posiciona a imagem em % do círculo quando o logo
   * não ocupa o círculo todo (fica sobre fundo branco); sem `box`, a imagem cobre o círculo.
   */
  icon: { src: string; box?: { left: number; top: number; width: number; height: number } };
};

export type TrajectoryDetails =
  | { kind: 'text'; paragraphs: string[]; photos?: AboutPhoto[] }
  | { kind: 'experience'; entries: ExperienceEntry[] }
  | { kind: 'education'; entries: EducationEntry[]; courses?: CourseEntry[] };

export type TrajectoryItemData = {
  id: string;
  theme: string;
  summary: string;
  details: TrajectoryDetails;
};

export const trajectoryIntro = {
  title: 'Minha trajetória, por tema',
  description:
    'Conheça minha história, experiências e formação. Os caminhos que moldaram minha visão sobre design, tecnologia e produtos digitais.',
};

export const trajectoryItems: TrajectoryItemData[] = [
  {
    id: 'sobre-mim',
    theme: 'Sobre mim',
    summary:
      'De Vitória (ES), apaixonado por tecnologia, design e por transformar problemas complexos em soluções simples.',
    details: {
      kind: 'text',
      paragraphs: [
        'Nascido no Espírito Santo e hoje morando em Vitória. Sempre gostei de tecnologia, design e de descobrir novas formas de fazer as coisas. No design de produtos, encontrei um jeito de reunir esses interesses e transformar minha curiosidade em trabalho.',
        'Minha trajetória começou na Engenharia Elétrica, na Universidade Federal de Itajubá (UNIFEI). Entre laboratórios e projetos, fui descobrindo o prazer de experimentar e ver uma ideia ganhar forma. Durante a graduação participei de diversos projetos de extensão como diretor de marketing, entregando trabalhos de design que sempre foram um hobby de forma profissional. Quando conheci UX, perto do fim dessa fase, encontrei uma área que conectava três coisas que sempre fui apaixonado, tecnologia, design e inovação.',
        'Atualmente, curso Análise e Desenvolvimento de Sistemas e, no meu trabalho, busco diminuir a distância entre design e tecnologia. Mantenho contato próximo com a equipe de desenvolvimento para entender a arquitetura e as limitações técnicas. Assim, consigo projetar soluções melhores, escaláveis e mais rápidas de desenvolver.',
        'Fora do trabalho, gosto de atividades ao ar livre, como correr, remar e escalar. Adoro descobrir um jogo novo no Nintendo Switch ou passar um tempo jogando no computador com os amigos. Também sou entusiasta de tecnologia e estou sempre acompanhando as novidades do mundo tech.',
      ],
      // Layout expandido do Figma (471:7431)
      photos: [
        {
          src: photoRetrato,
          alt: 'Arthur sorrindo no escritório, diante de monitores com telas de produto',
          width: 550,
          height: 977,
          crop: { left: -0.93, top: -13.02, width: 127.31, height: 163.86 },
        },
        {
          src: photoEmblema,
          alt: 'Arthur diante de um emblema luminoso com um raio vermelho',
          width: 600,
          height: 600,
          crop: { left: -3.7, top: -0.67, width: 138.89, height: 100.67 },
        },
        {
          src: photoCorrida,
          alt: 'Arthur correndo numa prova de rua, com número de peito',
          width: 560,
          height: 840,
          crop: { left: -9.62, top: -12.41, width: 121.56, height: 132.2 },
        },
        {
          src: photoMergulho,
          alt: 'Arthur mergulhando com cilindro no fundo do mar',
          width: 1280,
          height: 853,
          crop: { left: -161.57, top: -76.17, width: 516.2, height: 249.3 },
        },
      ],
    },
  },
  {
    id: 'experiencia',
    theme: 'Experiência',
    summary:
      'Hoje, Product Designer na Nuvidio (2024–atual). Antes, UX/UI Designer na Meu Guru (2023–2024) e freelancer em projetos digitais.',
    // Conteúdo do frame "Experiencia" (Figma 306:15979)
    details: {
      kind: 'experience',
      entries: [
        {
          role: 'Product Designer na Nuvidio',
          period: 'Jun 2024 - Presente • 2 anos e 4 meses',
          accent: 'blue',
          highlights: [
            'Lidero a evolução do Agreement de ponta a ponta, abrangendo discovery, estratégia, arquitetura da informação, UX/UI, prototipação, validação, handoff e acompanhamento de métricas.',
            'Participei da criação do Auditor.IA, primeiro produto de IA da empresa, voltado à transcrição e à auditoria automatizada de interações, que contribuiu para um aumento de 40% no faturamento mensal em três meses.',
            'Desenvolvi integralmente o Nuv Design System, com fluxo de versionamento design-to-code integrado ao Storybook, mais de 120 componentes e 80 tokens semânticos. O sistema atende aos critérios de acessibilidade da WCAG, oferece alternância automática entre os modos light e dark e suporte a IA via MCP, reduzindo em 30% o tempo de desenvolvimento front-end.',
            'Implementei o Mixpanel, plataforma de análise de dados baseada em eventos, para acompanhar as métricas dos produtos em tempo real. Atualmente a ferramenta é utilizada por diferentes áreas da empresa e contribui para fortalecer uma cultura de decisões orientadas por dados.',
            'Atuo também como Product Builder, buscando novos produtos e casos de uso para as soluções da Nuvidio. Utilizo protótipos interativos de alta fidelidade, feitos com Figma, ferramentas no-code ou inteligência artificial, para validar MVPs antes do desenvolvimento.',
          ],
        },
        {
          role: 'UX/UI Designer Freelancer',
          period: 'Mai 2024 - Jul 2024 • 2 meses',
          accent: 'green',
          highlights: [
            'Desenvolvi um aplicativo mobile de organização financeira voltado à Geração Z, conduzindo todo o processo de design: pesquisa, definição de personas, benchmarking, UX/UI, criação de protótipo navegável e testes de usabilidade antes da implementação.',
          ],
        },
        {
          role: 'UX/UI Designer Pleno na Meu Guru',
          period: 'Jan 2023 - Jun 2024 • 1 ano e 6 meses',
          accent: 'yellow',
          highlights: [
            'Liderei a reformulação completa da experiência do cliente, resultando em um aumento de 20% no número de pedidos e impactando diretamente a conversão e a receita. O projeto foi orientado por pesquisas, testes de usabilidade e análises comportamentais feitas pessoalmente com os usuários dentro da universidade.',
            'Participei da criação do primeiro produto de IA da empresa, desenvolvido para orientar alunos passo a passo na resolução de questões complexas, contribuindo para um crescimento de 140% nas assinaturas do plano pago.',
            'Redesenhei toda a interface utilizada pelos tutores e implementei um sistema de gamificação que incentivou a participação e atraiu professores mais qualificados, elevando em 15% o ticket médio dos pedidos.',
            'Projetei a experiência e regras de negócio de um microsserviço de reembolso automatizado que permite que alunos e tutores cheguem a um acordo, reduzindo o tempo de reembolso e aumentando a satisfação dos clientes.',
            'Criei e mantive o Design System da empresa, composto por mais de 80 componentes.',
          ],
        },
        {
          role: 'Designer gráfico Freelancer',
          period: 'Jan 2016 - Jan 2023 • 6 anos',
          accent: 'pink',
          highlights: [
            'Desenvolvi projetos de design gráfico de ponta a ponta, criando identidades visuais e materiais digitais, institucionais, editoriais e impressos com Adobe Photoshop, CorelDRAW e InDesign.',
          ],
        },
      ],
    },
  },
  {
    id: 'formacao',
    theme: 'Formação',
    summary:
      'Cursando Análise e Desenvolvimento de Sistemas na UVV, com passagem pela Engenharia Elétrica na UNIFEI.',
    // Conteúdo do frame "formações" (Figma 306:15862)
    details: {
      kind: 'education',
      entries: [
        {
          title: 'UVV — Universidade Vila Velha — Análise e Desenvolvimento de Sistemas',
          period: 'Jan 2026 - Dez 2027',
          logo: { src: logoUvv, alt: 'Brasão da Universidade Vila Velha' },
        },
        {
          title: 'UNIFEI — Universidade Federal de Itajubá — Engenharia Elétrica',
          period: 'Jan 2018 - Dez 2021',
          logo: { src: logoUnifei, alt: 'Logo da Universidade Federal de Itajubá' },
        },
        {
          title: 'CEDTEC — Escola Técnica — Técnico em Eletrotécnica',
          period: 'Jan 2016 - Jun 2017',
          logo: { src: logoCedtec, alt: 'Logo da escola técnica CEDTEC' },
        },
      ],
      // Cursos e Certificados (Figma 617:5890). Ano, carga horária e link do certificado ainda não
      // foram informados: preencha year / duration / certificateUrl quando tiver os dados.
      courses: [
        { title: 'IAUX Lab - IA Design', institution: 'UX unicórnio', icon: { src: courseIauxLab, box: { left: -1.79, top: 30.36, width: 103.57, height: 39.29 } } },
        { title: 'cfPRO - Design Systens', institution: 'Felipe Santana', icon: { src: courseCfpro } },
        { title: 'Curso de Figma', institution: 'Felipe Santana', icon: { src: courseCursoDeFigma } },
        { title: 'Certificado Profissional Google UX Design', institution: 'Coursera', icon: { src: courseCoursera } },
        { title: 'Designer Gráfico — Photoshop avançado', institution: 'Dataplus informática', icon: { src: courseDataplus, box: { left: 16.07, top: 16.07, width: 71.43, height: 71.43 } } },
        { title: 'BPM — Branding para pequenas marcas', institution: 'Renan Sousa', icon: { src: courseBpm, box: { left: 5.92, top: 12.5, width: 88.16, height: 75.66 } } },
      ],
    },
  },
];

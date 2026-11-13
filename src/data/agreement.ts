// Conteúdo do estudo de caso "Contratações bancárias guiadas por agentes de IA" (Figma 424:6646).
import heroPoster from '../assets/agreement/hero-poster.webp';
import contextoImage from '../assets/agreement/contexto-videochamadas.webp';
import hipotesePoster from '../assets/agreement/hipotese-poster.webp';
import solucaoImage from '../assets/agreement/solucao-overview.webp';
import inteligenciaImage from '../assets/agreement/inteligencia-resultados.webp';
import dashboardPoster from '../assets/agreement/dashboard-poster.webp';
import dashboardPlatformBg from '../assets/agreement/dashboard-platform-bg.webp';
import mixpanelOperacao from '../assets/agreement/mixpanel-operacao.webp';
import mixpanelFunil from '../assets/agreement/mixpanel-funil.webp';
import iconUserCircle from '../assets/agreement/icon-user-circle.svg';
import icon24h from '../assets/agreement/icon-24h.svg';
import iconShield from '../assets/agreement/icon-shield.svg';
import iconBuilding from '../assets/agreement/icon-building.svg';
import dashboardTela1 from '../assets/agreement/dashboard-tela-1.webp';
import dashboardTela2 from '../assets/agreement/dashboard-tela-2.webp';
import dashboardTela3 from '../assets/agreement/dashboard-tela-3.webp';
import dashboardTela4 from '../assets/agreement/dashboard-tela-4.webp';
import dashboardTela5 from '../assets/agreement/dashboard-tela-5.webp';
import dashboardTela6 from '../assets/agreement/dashboard-tela-6.webp';

/**
 * Vídeos: os fills de vídeo do Figma não são exportáveis pelo MCP (só o frame de capa, usado como
 * poster). Os arquivos ficam em src/assets/agreement/videos/ e são encontrados pelo nome
 * (veja o README da pasta).
 */
const videoFiles = import.meta.glob<string>('../assets/agreement/videos/*.{mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function findVideo(name: string) {
  const match = Object.entries(videoFiles).find(([path]) => /([^/]+)\.(mp4|webm)$/.exec(path)?.[1] === name);
  return match?.[1];
}

export const videos = {
  hero: { src: findVideo('hero'), poster: heroPoster },
  hipotese: { src: findVideo('hipotese'), poster: hipotesePoster },
  dashboard: { src: findVideo('dashboard'), poster: dashboardPoster },
  /** Gravação da tela do MOMENTO 04 ("Video mockupt momento 4", Figma 438:9916) */
  momento04: { src: findVideo('momento-04') },
};

export const hero = {
  titleLight: 'Contratações bancárias guiadas por ',
  titleHighlight: 'Agentes de IA',
  /** Trechos do subtítulo com o peso usado em cada um no Figma */
  subtitle: [
    { text: 'Uma jornada autônoma com agentes de IA ', weight: 'extrabold' },
    { text: 'para confirmar contratações', weight: 'regular' },
    { text: ', ', weight: 'semibold' },
    { text: 'validar a identidade e registrar consentimentos com mais clareza, segurança e rastreabilidade', weight: 'regular' },
    { text: '.', weight: 'semibold' },
  ] as const,
};

export const contexto = {
  eyebrow: '01 / CONTEXTO',
  title: 'As contratações já eram digitais. O desafio era ir além.',
  kicker: 'NUVIDIO CALL',
  statement:
    'A Nuvidio conecta pessoas e empresas por meio de videochamadas. Seu principal produto, o Nuvidio Call, era utilizado principalmente por call centers bancários para formalizar contratações, validar identidades e registrar consentimentos.',
  detail:
    'Cada contratação era conduzida por um atendente, que orientava o cliente durante o processo e registrava evidências audiovisuais da sua identidade, compreensão e manifestação de vontade. Esses registros ajudavam os bancos a prevenir fraudes e reduzir riscos de contestação jurídica.',
  image: {
    src: contextoImage,
    alt: 'Nuvidio Call no computador e no celular durante uma videochamada entre atendente e cliente',
  },
};

export const problema = {
  eyebrow: '02 / O PROBLEMA',
  title: 'Um modelo seguro, mas difícil de escalar.',
  intro:
    'As videochamadas já ofereciam segurança e evidências para as contratações bancárias. Porém, a dependência de atendentes limitava a escalabilidade, a disponibilidade e a expansão comercial do produto.',
  cards: [
    {
      number: '01',
      icon: iconUserCircle,
      // único ícone de 20×20 no Figma (os demais são 24×24)
      iconSize: 20,
      title: 'Escalabilidade limitada',
      description:
        'Cada contratação exigia um atendente. Para aumentar o volume de operações, era necessário ampliar proporcionalmente a equipe.',
    },
    {
      number: '02',
      icon: icon24h,
      iconSize: 24,
      title: 'Disponibilidade restrita',
      description:
        'As contratações dependiam do horário de funcionamento dos call centers, impedindo operações 24 horas por dia.',
    },
    {
      number: '03',
      icon: iconShield,
      iconSize: 24,
      title: 'Novas ameaças digitais',
      description:
        'Com o avanço dos deepfakes, identificar fraudes apenas pela observação humana se tornava cada vez menos confiável.',
    },
    {
      number: '04',
      icon: iconBuilding,
      iconSize: 24,
      title: 'Barreiras comerciais',
      description:
        'A solução exigia uma estrutura de atendimento, limitando sua adoção por empresas sem call centers próprios ou terceirizados.',
    },
  ],
};

export const hipotese = {
  eyebrow: '03 / DA HIPÓTESE AO PRIMEIRO MVP',
  title: 'E se a IA pudesse substituir o atendente?',
  paragraphs: [
    'Como Product Designer na Nuvidio, acompanhava um problema crescente: as filas de clientes aumentavam mais rápido do que os call centers conseguiam expandir suas operações. Com o avanço da IA e a demanda do mercado por automação, enxerguei a oportunidade de criar um novo produto.',
    'A ideia inicial era simples: automatizar a triagem. Desenvolvi os primeiros protótipos para confirmar dados, realizar biometria e antecipar etapas da contratação antes do atendimento humano. Mas, conforme evoluía a experiência, percebi que muitas jornadas poderiam acontecer de forma totalmente autônoma, recorrendo a um atendente apenas quando necessário.',
    'Após meses de refinamento, nosso primeiro MVP foi apresentado aos diretores de um grande banco. A proposta foi aprovada, dando início ao desenvolvimento do produto e a uma parceria com a IBM para superar os desafios tecnológicos.',
    'O que começou como uma hipótese evoluiu para o Agreement. A seguir, apresento o resultado de diversas POCs, feedbacks de clientes e ciclos de melhoria que transformaram a ideia em uma solução completa.',
  ],
};

export const solucao = {
  eyebrow: '04 / A SOLUÇÃO',
  title: 'Uma experiência completa, do cliente à decisão.',
  paragraphs: [
    'O que começou como uma solução para automatizar a triagem evoluiu para uma plataforma completa de contratações bancárias, conectando todas as etapas da operação de forma autônoma, segura e escalável.',
    'No Agreement, a empresa configura o script da contratação e o cliente realiza toda a jornada sozinho, guiado por um agente de IA, disponível 24 horas por dia. Ao final, o Nuvidio Intelligence audita a gravação e as evidências coletadas, gerando um score de fraude que fica disponível na dashboard de gestão, permitindo automatizar decisões de aprovação ou recusa conforme as regras de cada banco.',
    'Toda essa operação é monitorada por eventos que alimentam painéis no Mixpanel, permitindo acompanhar indicadores em tempo real, identificar pontos de abandono e medir resultados. Esses dados orientam melhorias contínuas e decisões estratégicas para a evolução do produto.',
  ],
  image: {
    src: solucaoImage,
    alt: 'Visão geral do Agreement: dashboard de gestão, experiência do cliente, Nuvidio Intelligence e Mixpanel',
  },
};

export type Moment = {
  number: string;
  title: string;
  /** Parágrafos; '' representa a linha em branco que o Figma usa entre parágrafos */
  body: string[];
  decision: string;
};

export const experiencia = {
  eyebrow: '05 / EXPERIÊNCIA DO CLIENTE',
  title: 'Uma jornada autônoma, projetada para gerar confiança.',
  intro:
    'Sem um atendente para orientar cada etapa, a experiência precisava ser clara, acessível e segura. Desenhamos uma jornada em que a IA conduz a contratação, enquanto a interface orienta o cliente e reduz as incertezas durante o processo.',
  decisionLabel: 'DECISÃO DE UX',
  moments: [
    {
      number: '01',
      title: 'Antes de começar, é preciso entender.',
      body: [
        'Muitos clientes chegam à jornada sem saber exatamente o que vão fazer. Por isso, criamos uma introdução que explica o processo, apresenta o assistente de voz e prepara o usuário para a experiência guiada por IA.',
      ],
      decision: 'Reduzir a insegurança inicial e alinhar expectativas antes de solicitar qualquer ação.',
    },
    {
      number: '02',
      title: 'Segurança começa com a informação correta.',
      body: [
        'Antes de continuar, o cliente confere seus dados pessoais. Caso identifique alguma divergência, pode interromper a jornada autônoma e buscar atendimento humano.',
      ],
      decision: 'Oferecer controle ao usuário e uma alternativa segura quando os dados não correspondem ao esperado.',
    },
    {
      number: '03',
      title: 'A tecnologia não pode ser uma barreira.',
      body: [
        'Para realizar a validação, o cliente precisa autorizar câmera, microfone e localização. Caso não consiga , criamos instruções específicas para diferentes navegadores e dispositivos, ajudando quem encontra dificuldades.',
      ],
      decision:
        'Tornar requisitos técnicos compreensíveis e oferecer um passo a passo personalizado para cada cliente, reduzindo abandonos antes da gravação.',
    },
    {
      number: '04',
      title: 'Uma conversa guiada por inteligência artificial.',
      body: [
        'Durante a gravação, um agente de IA conduz o cliente por uma jornada de contratação, apresentando e solicitando confirmações em cada etapa, conforme o script configurado.',
        'A interface combina orientações visuais, transcrição de voz em tempo real e feedbacks para ajudar o usuário a compreender o que deve fazer e quando deve responder.',
        'Para garantir a qualidade da gravação, o sistema identifica situações como respostas fora do esperado, ausência do rosto ou presença de outras pessoas, orientando o cliente a corrigir o problema ou gravar novamente.',
      ],
      decision:
        'Substituir a condução humana por uma experiência autônoma e intuitiva, utilizando instruções contextuais e feedback em tempo real para reduzir erros, orientar o cliente e preservar os critérios de segurança da contratação.',
    },
    {
      number: '05',
      title: 'Uma conclusão clara, com feedback em cada resultado.',
      body: [
        'Após finalizar a gravação, o cliente aguarda enquanto os motores de inteligência artificial analisam as evidências coletadas para identificar possíveis fraudes, inconsistências ou problemas na gravação.',
        '',
        'Caso seja identificado algum impedimento, o sistema informa o motivo e orienta o cliente a realizar uma nova tentativa, quando permitido. Se nenhuma irregularidade for identificada, o processo é finalizado e uma mensagem configurada pela empresa comunica o resultado e os próximos passos.',
      ],
      decision:
        'Oferecer feedback claro sobre o resultado da análise, explicando possíveis problemas e orientando o cliente a refazer a gravação quando necessário. Dessa forma, a empresa recebe gravações padronizadas, facilitando a análise, a auditoria e as validações de segurança.',
    },
  ] satisfies Moment[],
};

/** Posições dos marcadores sobre as capturas (px do Figma) */
type Marker = { number: string; left: number; top: number };

export const inteligencia = {
  eyebrow: '06 / INTELIGÊNCIA E DECISÃO',
  title: 'A IA transforma evidências em decisões.',
  lead: 'Após a jornada, diferentes motores de inteligência artificial analisam as evidências coletadas, identificam possíveis riscos e transformam os resultados em um score que pode orientar ou automatizar a decisão do banco.',
  capture: {
    src: inteligenciaImage,
    alt: 'Resultados da análise de IA: score de fraude 550/1000, composição do score e mapa com a localização do cliente',
    width: 696,
    height: 387,
    markers: [
      { number: '1', left: -6, top: 65.33 },
      { number: '2', left: -6, top: 161.33 },
      { number: '3', left: 310, top: 161.33 },
      { number: '6', left: 443, top: 76 },
      { number: '4', left: -6, top: 251.33 },
      { number: '5', left: 310, top: 251.33 },
    ] satisfies Marker[],
  },
  note: {
    strong: 'O score orienta ou automatiza a decisão de acordo com as regras de cada instituição.',
    text: 'O design torna o resultado legível para quem decide.',
  },
  categoriesLabel: 'CATEGORIAS DE AVALIAÇÃO',
  categories: [
    {
      number: '01',
      title: 'Score de Fraude',
      description:
        'Pontuação geral calculada a partir da média ponderada dos diferentes scores de análise, com pesos personalizáveis conforme as regras de cada empresa.',
    },
    { number: '02', title: 'Integridade', description: 'Detecta manipulações no vídeo, como deepfakes e tentativas de falsificação.' },
    { number: '03', title: 'Identidade', description: 'Verifica a identidade do cliente por meio de análises biométricas.' },
    { number: '04', title: 'Conformidade', description: 'Avalia se as respostas estão de acordo com o roteiro da contratação.' },
    { number: '05', title: 'Interferência', description: 'Identifica a presença de terceiros e possíveis interferências na gravação.' },
    { number: '06', title: 'Localização', description: 'Analisa a localização do dispositivo e possíveis riscos associados à região.' },
  ],
};

export const dashboard = {
  eyebrow: '07 / DASHBOARD DE GESTÃO',
  title: 'Toda a operação sob controle.',
  lead: 'Para os gestores, o Agreement oferece um ambiente centralizado para acompanhar contratações, consultar evidências, configurar jornadas e administrar processos sem depender da operação de um call center.',
  platformBackground: dashboardPlatformBg,
  url: 'dashboard.agreement.com',
  /** Variantes do componente "Telas Dashboard" (401:12601), na ordem do protótipo */
  screens: [dashboardTela1, dashboardTela2, dashboardTela3, dashboardTela4, dashboardTela5, dashboardTela6],
  /** Protótipo: AFTER_TIMEOUT 3s → DISSOLVE 300ms ease-out */
  holdMs: 3000,
  transitionMs: 300,
  features: [
    { number: '01', title: 'Acompanhamento de processos', description: 'Visualização das contratações, seus status, resultados e scores de análise.' },
    { number: '02', title: 'Jornadas configuráveis', description: 'Criação e gerenciamento de scripts adaptados às regras de negócio de cada instituição.' },
    { number: '03', title: 'Evidências e resultados', description: 'Consulta das gravações, validações e análises geradas durante as jornadas.' },
    { number: '04', title: 'Gestão operacional', description: 'Ferramentas de configuração, controle e acompanhamento da operação.' },
  ],
};

export const dados = {
  eyebrow: '08 / DADOS E EVOLUÇÃO CONTÍNUA',
  title: 'Decisões de produto orientadas por dados.',
  lead: 'Para acompanhar a evolução do Agreement, implementei análises no Mixpanel que permitem observar o comportamento dos usuários, monitorar a conversão das jornadas e identificar os pontos de maior abandono.',
  capture: {
    operacao: { src: mixpanelOperacao, alt: 'Painel "Operação Geral" no Mixpanel com convites criados, links acessados, processos concluídos e taxas de conversão' },
    funil: { src: mixpanelFunil, alt: 'Funil de retenção por etapa no Mixpanel, do link acessado à gravação finalizada' },
    markers: [
      { number: '1', left: 512, top: 90 },
      { number: '2', left: 1069, top: 90 },
      { number: '3', left: 1069, top: 333 },
    ] satisfies Marker[],
  },
  legend: [
    { number: '1', text: 'Volume: convites criados, links acessados e processos concluídos.' },
    { number: '2', text: 'Taxas de conclusão e de conversão da jornada.' },
    { number: '3', text: 'Funil de retenção por etapa, do link acessado à gravação finalizada.' },
  ],
  features: [
    { number: '01', title: 'Funil de conversão', description: 'Acompanhamento da jornada desde o acesso ao convite até a conclusão da gravação.' },
    { number: '02', title: 'Retenção e abandono', description: 'Identificação das etapas em que os clientes enfrentam mais dificuldades ou deixam o processo.' },
    { number: '03', title: 'Desempenho operacional', description: 'Monitoramento de convites criados, processos concluídos e taxas de conversão.' },
    { number: '04', title: 'Evolução contínua', description: 'Uso dos indicadores para investigar problemas e orientar a priorização de melhorias.' },
  ],
};

export const resultados = {
  eyebrow: '09 / RESULTADOS E APRENDIZADOS',
  title: 'De uma hipótese a uma nova frente de negócio.',
  lead: 'O Agreement evoluiu de uma ideia exploratória para uma solução de contratações autônomas, ampliando as possibilidades de atuação da Nuvidio e reduzindo a dependência de operações conduzidas por atendentes.',
  detail:
    'Ao longo das POCs, realizadas com empresas contratantes, diferentes necessidades do mercado orientaram a evolução do produto, conectando experiência, inteligência artificial, gestão e análise de dados.',
  highlights: [
    { display: '24/7', title: 'Operação 24/7', description: 'Jornadas autônomas sem depender do horário de um call center.' },
    { display: 'Escala', title: 'Maior escalabilidade', description: 'Possibilidade de ampliar o volume sem crescimento proporcional da equipe de atendentes.' },
    { display: 'Novos mercados', title: 'Novas oportunidades comerciais', description: 'Adoção por empresas que não possuem estrutura própria de atendimento.' },
    { display: 'IA + regras', title: 'Decisões automatizadas', description: 'Análises de IA integradas às regras de negócio das instituições.' },
  ],
  learningLabel: 'APRENDIZADO',
  learning:
    '“Mais do que desenhar uma nova interface, este projeto ampliou minha visão sobre o papel do Product Designer: conectar oportunidades de negócio, limitações tecnológicas, necessidades dos usuários e decisões de produto para transformar uma hipótese em uma solução real.”',
};

export const cta = {
  title: 'Vamos construir algo juntos?',
  description:
    'Quer conhecer melhor o projeto acima? Agende uma conversa para eu apresentar os bastidores, as decisões e os resultados que não cabem em um estudo de caso.',
};

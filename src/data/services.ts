import { Blocks, BrainCircuit, ChartNoAxesCombined, Component, PanelsTopLeft, Search, Target, UsersRound, Workflow, type LucideIcon } from 'lucide-react';

export type ServiceTone = 'dark' | 'gray' | 'lime';

export type Service = {
  number: string;
  title: string;
  /** Ícone decorativo (Lucide) que representa o tema do card */
  icon: LucideIcon;
  description: string;
  tone: ServiceTone;
  /** Rotação do card (graus); 01–04 como no Figma, 05–09 na mesma amplitude */
  rotate: number;
  /** Deslocamento vertical do card no trilho (px); mesma lógica de rotate */
  offsetY: number;
  /** TODO: destino não definido no Figma — substituir '#' pela URL final */
  href: string;
};

export const services: Service[] = [
  {
    number: '01',
    title: 'UX/UI Design',
    icon: PanelsTopLeft,
    description:
      'Criação de experiências intuitivas e interfaces funcionais, desde a definição de fluxos e wireframes até a prototipação, testes de usabilidade e validação das soluções.',
    tone: 'dark',
    rotate: 0,
    offsetY: 41,
    href: '#',
  },
  {
    number: '02',
    title: 'Estratégia de Produto',
    icon: Target,
    description:
      'Definição de soluções alinhadas aos objetivos do negócio, com foco em expansão de mercado, escalabilidade e crescimento da receita.',
    tone: 'gray',
    rotate: -4,
    offsetY: 9,
    href: '#',
  },
  {
    number: '03',
    title: 'Pesquisa & Discovery',
    icon: Search,
    description:
      'Investigação de problemas, análise de mercado e compreensão das necessidades dos usuários para identificar oportunidades, validar hipóteses e orientar decisões de produto.',
    tone: 'lime',
    rotate: 2,
    offsetY: 49,
    href: '#',
  },
  {
    number: '04',
    title: 'Design Systems',
    icon: Component,
    description:
      'Criação e evolução de Design Systems com componentes reutilizáveis, tokens e padrões de acessibilidade para garantir consistência, escalabilidade e eficiência no desenvolvimento.',
    tone: 'dark',
    rotate: 0,
    offsetY: 9,
    href: '#',
  },
  {
    number: '05',
    title: 'Arquitetura de Produto',
    icon: Workflow,
    description:
      'Estruturação de jornadas, regras de negócio e arquitetura da informação, com eventos para monitorar o uso, identificar problemas e acompanhar métricas.',
    tone: 'gray',
    rotate: 2,
    offsetY: 41,
    href: '#',
  },
  {
    number: '06',
    title: 'Análise de Dados',
    icon: ChartNoAxesCombined,
    description:
      'Monitoramento de indicadores, análise do comportamento dos usuários e construção de dashboards para identificar problemas, medir resultados e orientar a evolução dos produtos.',
    tone: 'lime',
    rotate: -3,
    offsetY: 9,
    href: '#',
  },
  {
    number: '07',
    title: 'Inteligência Artificial',
    icon: BrainCircuit,
    description:
      'Aplicação de IA no dia a dia para automatizar processos de UX, acelerar entregas e reduzir tarefas operacionais, permitindo maior foco em estratégia e decisões de produto.',
    tone: 'dark',
    rotate: 0,
    offsetY: 49,
    href: '#',
  },
  {
    number: '08',
    title: 'Product Building',
    icon: Blocks,
    description:
      'Criação de protótipos e MVPs funcionais com IA e ferramentas low-code para validar hipóteses, testar soluções e acelerar a experimentação antes de investir no desenvolvimento completo.',
    tone: 'gray',
    rotate: 2,
    offsetY: 9,
    href: '#',
  },
  {
    number: '09',
    title: 'Colaboração & Delivery',
    icon: UsersRound,
    description:
      'Colaboração com times de desenvolvimento, priorização de demandas, handoffs detalhados e acompanhamento das entregas para garantir qualidade e eficiência.',
    tone: 'lime',
    rotate: -2,
    offsetY: 41,
    href: '#',
  },
];

export const sectionIds = {
  home: 'inicio',
  projects: 'projetos',
  services: 'servicos',
  about: 'sobre-mim',
  contact: 'contato',
} as const;

/** Item "Experiência" de "Minha trajetória" (o botão que abre o painel; ver TrajectoryItem) */
export const experienceAnchor = 'experiencia-titulo';

export const navItems = [
  { label: 'Projetos', href: `#${sectionIds.projects}` },
  { label: 'Serviços', href: `#${sectionIds.services}` },
  { label: 'Sobre mim', href: `#${sectionIds.about}` },
  { label: 'Experiência', href: `#${experienceAnchor}` },
];

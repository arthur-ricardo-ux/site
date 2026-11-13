import type { MouseEvent } from 'react';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Valor em px do Figma que acompanha a escala da seção (--spacing). */
export function u(px: number) {
  return `calc(var(--spacing) * ${px})`;
}

/**
 * Links cujo destino ainda não foi definido no Figma usam href="#".
 * Mantém o elemento interativo sem rolar a página para o topo.
 */
export function linkProps(href: string) {
  return {
    href,
    onClick:
      href === '#'
        ? (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault()
        : undefined,
  };
}

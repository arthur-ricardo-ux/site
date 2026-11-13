import { useEffect, useId, useState } from 'react';
import { navItems, sectionIds } from '../data/navigation';
import { cn } from '../utils';
import { LogoArt } from './LogoArt';

type HeaderProps = {
  /**
   * Prefixo dos links de navegação. Na Home é '' (âncoras locais); nas páginas de estudo de caso
   * é '/', levando de volta às seções da Home.
   */
  basePath?: '' | '/';
  /** Componente "Topbar" (Figma 466:4066): light na Home, dark nos estudos de caso */
  theme?: 'light' | 'dark';
};

/**
 * Topbar fixa no topo (64px). Hover dos botões = variante 2 do Figma ("Dissolve" 100ms ease-in).
 * No celular os links vão para um menu que abre abaixo da barra.
 */
export function Header({ basePath = '', theme = 'light' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const dark = theme === 'dark';
  const homeHref = basePath ? '/' : `#${sectionIds.home}`;

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  const linkClass = cn(
    'flex items-center justify-center rounded-[32px] px-16 py-12 font-archivo text-14 leading-20 font-semibold whitespace-nowrap',
    'transition-colors duration-100 ease-in',
    dark ? 'text-accent-highlight hover:bg-action-hover-on-dark' : 'text-content-primary hover:bg-action-hover-on-color',
  );
  const contactClass = cn(
    'flex w-126 shrink-0 items-center justify-center rounded-[32px] p-12 font-archivo text-14 leading-20 font-semibold whitespace-nowrap',
    'transition-shadow duration-100 ease-in',
    dark
      ? 'bg-accent-highlight text-content-primary hover:shadow-[inset_0_0_0_999px_var(--color-action-hover-on-color)]'
      : 'bg-background-inverse text-content-inverse hover:shadow-[inset_0_0_0_999px_var(--color-action-hover-on-dark)]',
  );

  return (
    <header className={cn('sticky top-0 z-50', dark ? 'bg-background-inverse' : 'bg-white')}>
      <div className="relative mx-auto flex h-64 max-w-1440 items-center justify-between px-16 md:px-32">
        <a href={homeHref} aria-label="art — início" className="flex w-84 shrink-0 justify-center">
          <LogoArt dark={dark} />
        </a>

        <nav aria-label="Principal" className="max-md:hidden">
          <ul className="flex items-center gap-12">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={basePath + item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-8">
          <a href={`#${sectionIds.contact}`} className={cn(contactClass, 'max-[359px]:w-auto max-[359px]:px-16')}>
            Contato
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(linkClass, 'size-44 cursor-pointer p-0 md:hidden')}
          >
            <span aria-hidden="true" className="relative block h-12 w-18">
              {[0, 1, 2].map((line) => (
                <span
                  key={line}
                  className={cn(
                    'absolute left-0 h-2 w-full rounded-full bg-current transition-[transform,opacity] duration-200 ease-out',
                    line === 0 && (menuOpen ? 'top-5 rotate-45' : 'top-0'),
                    line === 1 && (menuOpen ? 'top-5 opacity-0' : 'top-5'),
                    line === 2 && (menuOpen ? 'top-5 -rotate-45' : 'top-10'),
                  )}
                />
              ))}
            </span>
          </button>
        </div>

        <nav
          id={menuId}
          aria-label="Principal (celular)"
          inert={!menuOpen}
          className={cn(
            'absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-200 ease-out md:hidden',
            dark ? 'bg-background-inverse' : 'bg-white shadow-[0_8px_16px_-12px_rgb(8_11_18/0.25)]',
            menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <ul className="flex min-h-0 flex-col gap-4 overflow-hidden px-16">
            {navItems.map((item, index) => (
              <li key={item.href} className={cn(index === 0 && 'pt-8', index === navItems.length - 1 && 'pb-16')}>
                <a href={basePath + item.href} onClick={() => setMenuOpen(false)} className={cn(linkClass, 'justify-start')}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

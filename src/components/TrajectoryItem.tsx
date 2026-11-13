import { useEffect, useState } from 'react';
import chevronDown from '../assets/icons/tailless-line-arrow-down.svg';
import type { TrajectoryItemData } from '../data/trajectory';
import { cn } from '../utils';
import { TrajectoryDetails } from './TrajectoryDetails';

/** Linha "Tema / Resumo" que expande ao clicar (ícone tailless-line-arrow-down do Figma) */
export function TrajectoryItem({ item }: { item: TrajectoryItemData }) {
  const [open, setOpen] = useState(false);
  const buttonId = `${item.id}-titulo`;
  const panelId = `${item.id}-detalhes`;

  // Links da topbar já abrem o painel: "Experiência" → #experiencia-titulo, "Sobre mim" → #sobre-mim
  // (a âncora da seção, que tem o mesmo id do item). O clique cobre o caso de a URL já ter o hash.
  useEffect(() => {
    const targets = [`#${buttonId}`, `#${item.id}`];
    const openFromHash = () => targets.includes(window.location.hash) && setOpen(true);
    const openFromLink = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a');
      if (link && link.pathname === window.location.pathname && targets.includes(link.hash)) setOpen(true);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    document.addEventListener('click', openFromLink);
    return () => {
      window.removeEventListener('hashchange', openFromHash);
      document.removeEventListener('click', openFromLink);
    };
  }, [buttonId, item.id]);

  return (
    <div>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full cursor-pointer items-center gap-10 pr-8 text-left text-content-primary"
        >
          <span className="flex min-w-px flex-1 flex-col gap-6 transition-opacity duration-150 group-hover:opacity-80">
            <span className="font-archivo text-20 leading-28 font-bold">{item.theme}</span>
            <span className="font-archivo text-14 leading-20 tracking-[0.025em] text-content-secondary">
              {item.summary}
            </span>
          </span>
          <img
            src={chevronDown}
            alt=""
            width={20}
            height={20}
            className={cn('size-20 shrink-0 transition-transform duration-300 ease-out', open && 'rotate-180')}
          />
        </button>
      </h3>

      {/* grid 0fr → 1fr anima a altura sem medir o conteúdo */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-24">
            <TrajectoryDetails details={item.details} />
          </div>
        </div>
      </div>
    </div>
  );
}

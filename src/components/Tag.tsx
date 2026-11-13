import type { ReactNode } from 'react';
import { cn } from '../utils';

type TagProps = {
  children: ReactNode;
  /** "tag-personalized" no Figma: fundo escuro e texto lima */
  highlighted?: boolean;
};

export function Tag({ children, highlighted = false }: TagProps) {
  return (
    <span
      className={cn(
        // Borda de 1.5px desenhada com sombra interna: o Chrome arredonda border-width para pixels inteiros em telas 1x
        'inline-flex items-center justify-center rounded-[20px] px-21.5 py-9.5 font-condensed text-18 leading-32 whitespace-nowrap shadow-[inset_0_0_0_1.5px_var(--color-content-neutral-hard)]',
        highlighted ? 'bg-ink text-lime-soft' : 'bg-lime-soft text-ink-soft',
      )}
    >
      {children}
    </span>
  );
}

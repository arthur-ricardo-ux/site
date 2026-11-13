import type { ReactNode } from 'react';
import { cn } from '../utils';

const widths = {
  /** Grid das seções no Figma: 1216px de conteúdo (112px de margem no frame de 1440) */
  default: 'max-w-[calc(1216px_+_2*var(--gutter))]',
  /** "Minha trajetória": 1040px de conteúdo (200px de margem no frame de 1440) */
  narrow: 'max-w-[calc(1040px_+_2*var(--gutter))]',
};

type ContainerProps = {
  size?: keyof typeof widths;
  className?: string;
  children: ReactNode;
};

export function Container({ size = 'default', className, children }: ContainerProps) {
  return <div className={cn('mx-auto w-full px-(--gutter)', widths[size], className)}>{children}</div>;
}

import type { ReactNode } from 'react';
import { cn } from '../../utils';

type CrossfadeStackProps = {
  items: ReactNode[];
  activeIndex: number;
  /** 0 = troca instantânea (protótipo sem transição) */
  durationMs?: number;
  /** Deve posicionar a pilha (ex.: "absolute inset-0" ou "relative size-full") */
  className: string;
  layerClassName?: string;
};

/**
 * Equivalente ao "Dissolve" do Figma: a camada nova aparece por cima da anterior (que continua
 * opaca até o fim da transição), então nada "some" no meio da troca.
 */
export function CrossfadeStack({ items, activeIndex, durationMs = 300, className, layerClassName }: CrossfadeStackProps) {
  return (
    <div className={className}>
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <div
            key={index}
            aria-hidden={!active}
            className={cn('absolute inset-0', layerClassName)}
            style={{
              opacity: active ? 1 : 0,
              zIndex: active ? 2 : 1,
              transition: active
                ? `opacity ${durationMs}ms cubic-bezier(0, 0, 0.58, 1)`
                : `opacity 0ms linear ${durationMs}ms`,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

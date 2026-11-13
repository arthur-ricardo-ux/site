import type { CSSProperties } from 'react';
import { cn } from '../../utils';

type AnnotationMarkerProps = {
  number: string;
  /** "Case / Annotation Marker": 32px sobre capturas (com sombra) ou 24px nas legendas */
  size?: 'capture' | 'legend';
  className?: string;
  style?: CSSProperties;
};

export function AnnotationMarker({ number, size = 'capture', className, style }: AnnotationMarkerProps) {
  return (
    <span
      style={style}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-[16px] bg-accent-highlight font-archivo text-14 leading-20 font-semibold whitespace-nowrap text-background-inverse',
        size === 'capture' ? 'size-24 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.25)] md:size-32' : 'size-24',
        className,
      )}
    >
      {number}
    </span>
  );
}

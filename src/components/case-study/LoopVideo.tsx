import { useEffect, useRef, type CSSProperties } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../utils';

type LoopVideoProps = {
  /** Arquivo do vídeo; sem ele, o frame de capa exportado do Figma fica visível */
  src?: string;
  poster: string;
  className?: string;
  style?: CSSProperties;
  /** Vídeo da primeira dobra: carrega e toca de imediato */
  eager?: boolean;
};

/**
 * Vídeo decorativo em loop: autoplay, mudo, inline e sem controles. Fora da viewport fica pausado
 * (e só começa a baixar quando se aproxima dela); com "reduzir movimento" fica no frame de capa.
 */
export function LoopVideo({ src, poster, className, style, eager = false }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const near = useInView(ref, '300px');
  const reduceMotion = usePrefersReducedMotion();
  const shouldLoad = Boolean(src) && (eager || near);

  useEffect(() => {
    const video = ref.current;
    if (!video || !shouldLoad) return;
    video.muted = true;
    if (near && !reduceMotion) {
      video.play().catch(() => {
        /* autoplay bloqueado: o poster continua visível */
      });
    } else {
      video.pause();
    }
  }, [near, reduceMotion, shouldLoad]);

  return (
    <video
      ref={ref}
      className={cn('pointer-events-none', className)}
      style={style}
      poster={poster}
      autoPlay={!reduceMotion}
      loop
      muted
      playsInline
      disablePictureInPicture
      preload={eager ? 'auto' : 'metadata'}
      aria-hidden="true"
      tabIndex={-1}
      src={shouldLoad ? src : undefined}
    />
  );
}

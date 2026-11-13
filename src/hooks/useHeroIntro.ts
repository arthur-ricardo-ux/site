import { useEffect, useState, type RefObject } from 'react';

type IntroState = 'idle' | 'run' | undefined;

const canAnimate = () =>
  typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Valor de `data-intro` da Hero: "idle" (estado inicial oculto) até a seção entrar na viewport,
 * depois "run" — uma única vez, sem reiniciar em re-renderizações. Com "reduzir movimento" (ou sem
 * IntersectionObserver) fica undefined e tudo aparece direto.
 */
export function useHeroIntro(ref: RefObject<HTMLElement | null>): IntroState {
  const [state, setState] = useState<IntroState>(() => (canAnimate() ? 'idle' : undefined));

  useEffect(() => {
    const node = ref.current;
    if (state !== 'idle' || !node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('run');
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, state]);

  return state;
}

import { useRef } from 'react';
import browserDots from '../../assets/agreement/browser-dots.svg';
import browserLock from '../../assets/agreement/browser-lock.svg';
import { dashboard, videos } from '../../data/agreement';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTimedSequence } from '../../hooks/useTimedSequence';
import { CrossfadeStack } from './CrossfadeStack';
import { LoopVideo } from './LoopVideo';

/**
 * Seção 07 · "Container" (1232×532): fundo da plataforma + vídeo "cta" + janela de navegador com o
 * componente "Telas Dashboard". As telas trocam sozinhas (3 s + dissolve 300 ms, como no protótipo)
 * apenas enquanto a seção está na viewport.
 */
export function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, '100px');
  const reduceMotion = usePrefersReducedMotion();
  const screen = useTimedSequence(dashboard.screens.length, {
    holdMs: dashboard.holdMs,
    transitionMs: dashboard.transitionMs,
    running: inView,
  });

  return (
    <div
      ref={ref}
      className="relative aspect-[343/300] w-full overflow-hidden rounded-[8px] md:aspect-[1232/532] lg:mx-[-8px] lg:w-[calc(100%_+_16px)]"
    >
      <img
        src={dashboard.platformBackground}
        alt=""
        width={1024}
        height={443}
        loading="lazy"
        className="absolute inset-0 size-full object-cover object-bottom"
      />
      <LoopVideo
        src={videos.dashboard.src}
        poster={videos.dashboard.poster}
        className="absolute top-[-1.69%] left-[calc(50%_-_1.867%)] aspect-[1920/546] h-[102.63%] max-w-none -translate-x-1/2 object-cover"
      />

      {/* Janela de navegador (800×600) — posições em % e textos em cqw para escalar junto */}
      <div className="@container absolute top-[8%] left-[6%] aspect-[4/3] w-[88%] md:top-[10.53%] md:left-[17.53%] md:w-[64.94%]">
        <div className="absolute inset-0 rounded-[1cqw] border border-[rgba(229,237,245,0.5)] bg-[rgba(248,250,253,0.45)] shadow-[0px_15px_35px_0px_rgba(23,23,23,0.08)] backdrop-blur-[6px]">
          <img
            src={browserDots}
            alt=""
            width={32}
            height={8}
            className="absolute top-[2.25%] left-[2.5%] h-[1.333%] w-[4%]"
          />
          <div className="absolute top-[1.25%] left-[33.625%] h-[3.333%] w-[32.75%] rounded-[2cqw] border border-[rgba(229,237,245,0.5)] bg-[rgba(255,255,255,0.38)]">
            <img src={browserLock} alt="" width={7} height={8} className="absolute top-[32.5%] left-[27.86%] h-[40%] w-[2.67%]" />
            <span className="absolute top-1/2 left-[32%] -translate-y-1/2 font-[Inter,sans-serif] text-[1.05cqw] leading-[normal] font-light whitespace-nowrap text-[#50617a]">
              {dashboard.url}
            </span>
          </div>

          <div
            role="img"
            aria-label="Telas do dashboard de gestão do Agreement, alternando automaticamente"
            className="absolute top-[5.833%] left-[0.75%] h-[81.15%] w-[98.5%] overflow-hidden bg-white"
          >
            <CrossfadeStack
              className="relative size-full"
              activeIndex={screen}
              durationMs={reduceMotion ? 0 : dashboard.transitionMs}
              items={dashboard.screens.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width={1708}
                  height={1055}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-top"
                />
              ))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

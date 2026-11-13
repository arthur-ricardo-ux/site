import { useEffect, useRef, useState, type RefObject } from 'react';
import type { Moment } from '../../data/agreement';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils';
import { PhoneMockup } from './PhoneMockup';

type MomentsExperienceProps = {
  moments: Moment[];
  decisionLabel: string;
};

/**
 * Seção 05 · "Frame scroll": o iPhone fica sticky enquanto os Momentos passam; a tela muda para a
 * variante do Momento que cruza o centro da viewport (scroll para baixo e para cima).
 */
export function MomentsExperience(props: MomentsExperienceProps) {
  return (
    <>
      <DesktopMoments {...props} />
      <StackedMoments {...props} />
    </>
  );
}

/** Índice (1-based) do bloco que cruza a linha central da viewport */
function useActiveMoment(refs: RefObject<(HTMLElement | null)[]>) {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const elements = (refs.current ?? []).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.moment));
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [refs]);

  return active;
}

/** Elipse "Glow" 520×520, branco 8%, layer blur 120 no Figma (= blur(60px)), centrada no iPhone */
function Glow({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute left-1/2 aspect-square -translate-1/2 rounded-full bg-white/8 blur-[60px]', className)}
    />
  );
}

function MomentText({ moment, decisionLabel, className }: { moment: Moment; decisionLabel: string; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-24', className)}>
      <div className="font-archivo text-18 leading-32 text-content-tertiary">
        {moment.body.map((paragraph, index) =>
          paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />,
        )}
      </div>
      <div className="flex flex-col gap-8 border-l-2 border-accent-highlight pl-16">
        <p className="font-archivo text-12 leading-16 font-semibold text-accent-highlight">{decisionLabel}</p>
        <p className="font-archivo text-16 leading-24 text-content-inverse">{moment.decision}</p>
      </div>
    </div>
  );
}

function MomentTitle({ moment, className }: { moment: Moment; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-16', className)}>
      <p className="font-archivo text-14 leading-20 font-semibold text-accent-highlight">MOMENTO {moment.number}</p>
      <h3 className="font-archivo text-32 leading-40 font-normal text-content-inverse md:text-40 md:leading-48">
        {moment.title}
      </h3>
    </div>
  );
}

/** lg+: três colunas do Figma (400 · 352 · 368, gap 48) com 960px por Momento */
function DesktopMoments({ moments, decisionLabel }: MomentsExperienceProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const active = useActiveMoment(rowRefs);
  const inView = useInView(gridRef);

  return (
    <div
      ref={gridRef}
      className="hidden grid-cols-[minmax(0,400fr)_minmax(300px,352px)_minmax(0,368fr)] gap-x-32 lg:grid xl:gap-x-48"
    >
      <div>
        {moments.map((moment, index) => (
          <div
            key={moment.number}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            data-moment={index + 1}
            className="flex h-960 flex-col justify-center"
          >
            <MomentTitle moment={moment} />
          </div>
        ))}
      </div>

      {/* "Col / Sticky track" + "Frame scroll": o iPhone acompanha só até o fim desta coluna */}
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center gap-10 py-24">
          {moments.map((moment) => (
            <div key={moment.number} className="contents">
              <span className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-white/16 bg-background-inverse font-archivo text-12 leading-16 font-semibold text-content-tertiary">
                {moment.number}
              </span>
              <span className="min-h-px w-px flex-1 bg-white/12" />
            </div>
          ))}
        </div>

        <div className="sticky top-[calc(50vh_-_382px)] h-764">
          <Glow className="top-[381.33px] w-520" />
          <PhoneMockup
            moment={active}
            playing={inView}
            className="absolute top-[90.49px] left-1/2 w-280 -translate-x-1/2"
          />
        </div>
      </div>

      <div>
        {moments.map((moment) => (
          <div key={moment.number} className="flex h-960 flex-col justify-center">
            <MomentText moment={moment} decisionLabel={decisionLabel} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * < lg (sem versão no Figma): tablet mantém o iPhone sticky ao lado do texto; no celular cada
 * Momento mostra a própria tela logo abaixo do título.
 */
function StackedMoments({ moments, decisionLabel }: MomentsExperienceProps) {
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const active = useActiveMoment(blockRefs);
  const inView = useInView(wrapperRef);

  return (
    <div ref={wrapperRef} className="md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-x-48 lg:hidden">
      <div className="relative hidden md:block">
        <div className="sticky top-[calc(50vh_-_250px)] h-500">
          <Glow className="top-1/2 w-446" />
          <PhoneMockup moment={active} playing={inView} className="absolute top-1/2 left-0 w-240 -translate-y-1/2" />
        </div>
      </div>

      <div className="flex flex-col gap-64 md:gap-0">
        {moments.map((moment, index) => (
          <div
            key={moment.number}
            ref={(el) => {
              blockRefs.current[index] = el;
            }}
            data-moment={index + 1}
            className="flex flex-col gap-32 md:min-h-[80vh] md:justify-center md:py-48"
          >
            <MomentTitle moment={moment} />
            <InlinePhone moment={index + 1} />
            <MomentText moment={moment} decisionLabel={decisionLabel} />
          </div>
        ))}
      </div>
    </div>
  );
}

function InlinePhone({ moment }: { moment: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} className="relative mx-auto w-[min(240px,64vw)] py-24 md:hidden">
      <Glow className="top-1/2 w-[186%]" />
      <PhoneMockup moment={moment} playing={inView} className="w-full" />
    </div>
  );
}

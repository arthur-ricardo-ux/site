import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { Container } from '../components/Container';
import { caseStudies } from '../data/caseStudies';
import { sectionIds } from '../data/navigation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn, linkProps } from '../utils';

/**
 * Empilhamento só onde o card inteiro cabe preso abaixo da topbar (96px + degraus + 540px) e sem
 * "reduzir movimento"; no celular (cards mais altos que a tela) os cards ficam em sequência normal.
 */
const STACK_QUERY = '(min-width: 48rem) and (min-height: 45rem) and (prefers-reduced-motion: no-preference)';
/** Redução de escala por nível de profundidade */
const SCALE_STEP = 0.03;
/** Página "Todos os projetos" (projetos/index.html) */
const ALL_PROJECTS_HREF = '/projetos/';

/**
 * Posições de rolagem (px) em que cada card começa a ser coberto pelo seguinte e em que o último
 * card chega ao seu ponto de parada. Medidas a cada resize, nunca durante o scroll.
 */
type StackLayout = { coverStart: number[]; end: number };

export function CaseStudies() {
  const stacked = useMediaQuery(STACK_QUERY);
  const listRef = useRef<HTMLUListElement>(null);
  const layout = useMotionValue<StackLayout>({ coverStart: [], end: 0 });
  const { scrollY } = useScroll();

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !stacked) return;

    const measure = () => {
      const items = [...list.querySelectorAll<HTMLElement>(':scope > [data-stack-card]')];
      const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
      // posição natural (sem sticky) de cada card: topo da lista + alturas e espaços anteriores
      let naturalTop = list.getBoundingClientRect().top + window.scrollY;
      const tops = items.map((item) => {
        const top = naturalTop;
        naturalTop += item.offsetHeight + gap;
        return top;
      });
      const stickyTop = items.map((item) => parseFloat(getComputedStyle(item).top) || 0);
      layout.set({
        // o card i começa a ser coberto quando o topo do próximo encosta na base dele
        coverStart: items.map((item, i) => {
          const cardHeight = (item.firstElementChild as HTMLElement).offsetHeight;
          return i < items.length - 1 ? tops[i + 1] - stickyTop[i] - cardHeight : 0;
        }),
        end: tops[items.length - 1] - stickyTop[items.length - 1],
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [stacked, layout]);

  return (
    <section
      id={sectionIds.projects}
      aria-labelledby="case-studies-title"
      className="bg-background-inverse py-64 md:py-96 lg:py-112"
    >
      <Container>
        <h2
          id="case-studies-title"
          className="text-center font-archivo text-36 leading-44 font-bold text-content-inverse md:text-48 md:leading-56 xl:pl-64"
        >
          Estudos de Caso Selecionados
        </h2>
      </Container>

      <ul
        ref={listRef}
        aria-label="Estudos de caso"
        className="mt-40 flex flex-col items-center gap-16 px-(--gutter) md:mt-64 md:gap-32 md:[--stack-step:24px] md:[--stack-top:88px] lg:[--stack-step:28px] lg:[--stack-top:96px]"
      >
        {caseStudies.map((study, index) => (
          <StackItem
            key={study.id}
            index={index}
            total={caseStudies.length}
            stacked={stacked}
            scrollY={scrollY}
            layout={layout}
          >
            <CaseStudyCard study={study} eager={index === 0} />
          </StackItem>
        ))}
        {/* Pausa com a pilha completa antes de liberar a rolagem para o botão e a próxima seção */}
        {stacked && <li aria-hidden="true" className="h-[20svh]" />}
      </ul>

      <div className="mt-48 flex justify-center px-(--gutter) md:mt-64">
        <a
          {...linkProps(ALL_PROJECTS_HREF)}
          className="rounded-full border-2 border-white px-40 py-14 text-center font-condensed text-16 leading-24 font-medium text-white transition-colors duration-300 ease-in-out hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Ver todos os projetos
        </a>
      </div>
    </section>
  );
}

type StackItemProps = {
  index: number;
  total: number;
  stacked: boolean;
  scrollY: MotionValue<number>;
  layout: MotionValue<StackLayout>;
  children: ReactNode;
};

/** Card preso (sticky) em degraus; encolhe enquanto os seguintes sobem por cima dele */
function StackItem({ index, total, stacked, scrollY, layout, children }: StackItemProps) {
  const targetScale = 1 - (total - 1 - index) * SCALE_STEP;
  const scale = useTransform(() => {
    const { coverStart, end } = layout.get();
    const y = scrollY.get();
    const start = coverStart[index];
    if (!stacked || index === total - 1 || start === undefined || end <= start) return 1;
    const progress = Math.min(1, Math.max(0, (y - start) / (end - start)));
    return 1 - progress * (1 - targetScale);
  });

  return (
    <motion.li
      data-stack-card
      className={cn('flex w-full justify-center', stacked && 'sticky top-[calc(var(--stack-top)+var(--i)*var(--stack-step))] origin-top')}
      style={
        {
          '--i': index,
          zIndex: index + 1,
          scale: stacked ? scale : 1,
          // bases alinhadas (topo em degrau + folga decrescente): a pilha inteira sai junta da tela
          paddingBottom: stacked ? `calc(${total - 1 - index} * var(--stack-step))` : undefined,
        } as CSSProperties & { scale: MotionValue<number> | number }
      }
    >
      {children}
    </motion.li>
  );
}

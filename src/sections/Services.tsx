import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useLayoutEffect, useRef, type CSSProperties, type FocusEvent } from 'react';
import { Container } from '../components/Container';
import { ServiceCard } from '../components/ServiceCard';
import { sectionIds } from '../data/navigation';
import { services } from '../data/services';
import { useDragScroll } from '../hooks/useDragScroll';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '../utils';

/**
 * Scroll vertical → horizontal só onde a seção inteira cabe na viewport e sem "reduzir movimento".
 * Nos demais casos (celular, janela baixa) os cards ficam num trilho com scroll horizontal nativo.
 */
const PINNED_QUERY = '(min-width: 48rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)';

export function Services() {
  const pinned = useMediaQuery(PINNED_QUERY);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useDragScroll<HTMLUListElement>();

  // Medidas em MotionValues: nada aqui re-renderiza os cards durante o scroll
  const distance = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const x = useTransform(() => -distance.get() * scrollYProgress.get());
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    if (!pinned) {
      distance.set(0);
      section.style.height = '';
      return;
    }

    const measure = () => {
      const travel = Math.max(0, track.offsetWidth - viewport.clientWidth);
      distance.set(travel);
      // 1px de scroll = 1px de trilho: a seção termina assim que o último card chega
      section.style.height = `calc(100svh + ${travel}px)`;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, [pinned, distance, trackRef]);

  // Navegação por teclado: leva a página até o ponto do percurso em que o card focado aparece
  const revealFocusedCard = (event: FocusEvent<HTMLUListElement>) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const item = event.target.closest('li');
    if (!pinned || !section || !track || !item || !event.target.matches(':focus-visible')) return;
    const { left, right } = item.getBoundingClientRect();
    if (left >= 0 && right <= window.innerWidth) return;
    const position = item.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft);
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + Math.min(distance.get(), Math.max(0, position)) });
  };

  return (
    <section
      ref={sectionRef}
      id={sectionIds.services}
      aria-labelledby="services-title"
      className={cn('overflow-x-clip bg-white', pinned ? '-scroll-mt-64' : 'py-64 md:py-96 lg:py-112')}
    >
      <div
        ref={viewportRef}
        className={cn(
          'flex flex-col',
          // pt-64: a composição é centralizada na área abaixo da topbar fixa
          pinned ? 'sticky top-0 h-svh justify-center gap-48 overflow-clip pt-64 [@media(max-height:700px)]:gap-24' : 'gap-40 md:gap-48',
        )}
      >
        <Container>
          <div className="flex flex-col items-start gap-16 text-content-primary lg:flex-row lg:items-center lg:justify-between lg:px-36">
            <h2
              id="services-title"
              className="font-archivo text-38 leading-[1.2] font-bold tracking-[-0.01em] md:text-52"
            >
              As minhas
              <br />
              frentes de trabalho
            </h2>
            <p className="max-w-394 font-archivo text-16 leading-24">
              Cada frente é estruturada para atuar em pontos reais do produto e não como etapas separadas.
            </p>
          </div>
        </Container>

        {/* Fileira contínua alinhada ao título (mesma margem do Container + lg:px-36); o restante transborda à direita */}
        <motion.ul
          ref={trackRef}
          onFocus={revealFocusedCard}
          style={{ x }}
          className={cn(
            'relative flex items-start gap-24 px-(--track-x) [--track-x:var(--gutter)] lg:[--track-x:calc(max(var(--gutter),(100cqw-1216px)/2)+36px)]',
            pinned
              ? 'w-max pb-5 will-change-transform'
              : 'scrollbar-none snap-x scroll-px-(--track-x) overflow-x-auto overscroll-x-contain pt-8 pb-16 [&[data-dragging]]:cursor-grabbing [&[data-dragging]]:snap-none [&[data-dragging]]:select-none pointer-fine:cursor-grab',
          )}
        >
          {services.map((service) => (
            <li
              key={service.number}
              className="mt-(--offset) shrink-0 snap-start"
              style={{ '--offset': `${service.offsetY}px` } as CSSProperties}
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

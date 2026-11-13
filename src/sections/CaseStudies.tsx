import { CaseStudyCard } from '../components/CaseStudyCard';
import { Container } from '../components/Container';
import { caseStudies } from '../data/caseStudies';
import { sectionIds } from '../data/navigation';
import { useDragScroll } from '../hooks/useDragScroll';

export function CaseStudies() {
  const scrollerRef = useDragScroll<HTMLUListElement>();

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
        ref={scrollerRef}
        aria-label="Estudos de caso"
        className="scrollbar-none mt-40 flex snap-x snap-mandatory scroll-px-(--gutter) gap-16 overflow-x-auto overscroll-x-contain px-(--gutter) md:mt-64 lg:gap-24 [&[data-dragging]]:cursor-grabbing [&[data-dragging]]:snap-none [&[data-dragging]]:select-none pointer-fine:cursor-grab"
      >
        {caseStudies.map((study, index) => (
          <li key={study.id} className="flex shrink-0 snap-start max-md:items-start">
            <CaseStudyCard study={study} eager={index === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}

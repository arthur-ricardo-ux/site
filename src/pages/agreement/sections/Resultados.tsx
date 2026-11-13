import { Container } from '../../../components/Container';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { resultados } from '../../../data/agreement';
import { cn } from '../../../utils';

export function Resultados() {
  return (
    <section aria-labelledby="resultados-title" className="bg-background-inverse pt-64 md:pt-96 lg:pt-112">
      <Container className="flex flex-col gap-64 lg:gap-96">
        <div className="flex flex-col gap-48">
          <SectionHeader
            id="resultados-title"
            theme="dark"
            size="display"
            eyebrow={resultados.eyebrow}
            title={resultados.title}
            className="max-w-1000"
          />
          <div className="flex flex-col gap-24 font-archivo text-18 leading-30 md:flex-row md:gap-48 md:text-20 md:leading-32">
            <p className="min-w-px flex-1 text-content-inverse">{resultados.lead}</p>
            <p className="min-w-px flex-1 text-content-tertiary">{resultados.detail}</p>
          </div>
        </div>

        {/* "Destaques de impacto": 2×2 com divisórias brancas a 12% */}
        <ul className="grid border-b border-white/12 md:grid-cols-2">
          {resultados.highlights.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                'flex flex-col gap-12 border-t border-white/12 py-32 md:py-48',
                index % 2 === 0 ? 'md:pr-48' : 'md:border-l md:pl-48',
              )}
            >
              <p className="font-archivo text-48 leading-56 tracking-[-0.02em] text-accent-highlight md:text-64 md:leading-72">
                {item.display}
              </p>
              <span aria-hidden="true" className="h-12" />
              <h3 className="font-archivo text-20 leading-28 font-bold text-content-inverse">{item.title}</h3>
              <p className="font-archivo text-16 leading-24 text-content-tertiary">{item.description}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-24 pb-64 md:pb-96 lg:pb-112">
          <p className="font-archivo text-14 leading-20 font-semibold text-accent-highlight">{resultados.learningLabel}</p>
          <blockquote className="max-w-1000 font-archivo text-28 leading-40 font-light text-content-inverse md:text-36 md:leading-50">
            {resultados.learning}
          </blockquote>
        </div>

        {/* "Divisor · fim do estudo" */}
        <hr className="border-0 border-t border-white/12" />
      </Container>
    </section>
  );
}

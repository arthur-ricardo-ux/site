import { Container } from '../../../components/Container';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { contexto } from '../../../data/agreement';

export function Contexto() {
  return (
    <section aria-labelledby="contexto-title" className="bg-background-inverse py-64 md:py-96 lg:py-112">
      <Container className="flex flex-col gap-48 lg:gap-64">
        <SectionHeader id="contexto-title" theme="dark" eyebrow={contexto.eyebrow} title={contexto.title} />

        <div className="flex flex-col gap-48 lg:flex-row lg:items-center lg:gap-64">
          <div className="flex min-w-px flex-1 flex-col gap-32">
            <div className="flex flex-col gap-16">
              <p className="font-archivo text-14 leading-20 font-semibold text-accent-highlight">{contexto.kicker}</p>
              <p className="font-archivo text-20 leading-32 text-content-inverse md:text-24 md:leading-36">{contexto.statement}</p>
            </div>
            <p className="font-archivo text-18 leading-30 text-content-tertiary md:text-20 md:leading-32">{contexto.detail}</p>
          </div>

          <img
            src={contexto.image.src}
            alt={contexto.image.alt}
            width={1130}
            height={817}
            loading="lazy"
            decoding="async"
            className="aspect-[565/408] w-full object-cover lg:w-[46.46%] lg:shrink-0"
          />
        </div>
      </Container>
    </section>
  );
}

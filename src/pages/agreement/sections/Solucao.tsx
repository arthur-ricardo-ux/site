import { Container } from '../../../components/Container';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { solucao } from '../../../data/agreement';

export function Solucao() {
  return (
    <section aria-labelledby="solucao-title" className="bg-background-primary py-64 md:py-96 lg:py-112">
      <Container className="flex flex-col gap-48 lg:gap-64">
        <div className="flex flex-col gap-48">
          <SectionHeader id="solucao-title" theme="light" eyebrow={solucao.eyebrow} title={solucao.title} />
          <div className="flex flex-col gap-[1lh] font-archivo text-20 leading-32 text-content-primary md:text-24 md:leading-36">
            {solucao.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <img
          src={solucao.image.src}
          alt={solucao.image.alt}
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          className="aspect-[1536/1024] w-full object-cover"
        />
      </Container>
    </section>
  );
}

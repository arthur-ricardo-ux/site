import { Container } from '../../../components/Container';
import { LoopVideo } from '../../../components/case-study/LoopVideo';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { hipotese, videos } from '../../../data/agreement';

export function Hipotese() {
  return (
    <section aria-labelledby="hipotese-title" className="bg-background-inverse py-64 md:py-96 lg:py-112">
      <Container className="flex flex-col gap-48 lg:gap-64">
        <SectionHeader id="hipotese-title" theme="dark" eyebrow={hipotese.eyebrow} title={hipotese.title} />

        <div className="flex flex-col gap-48 lg:flex-row lg:items-start lg:gap-64">
          {/* Parágrafos separados por uma linha em branco, como no Figma */}
          <div className="flex min-w-px flex-1 flex-col gap-[1lh] font-archivo text-18 leading-30 text-content-inverse md:text-20 md:leading-32">
            {hipotese.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* "atendimento_ia_loop_5s": 340×340, raio 24 */}
          <div className="relative aspect-square w-full max-w-340 shrink-0 overflow-hidden rounded-[24px]">
            <LoopVideo
              src={videos.hipotese.src}
              poster={videos.hipotese.poster}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

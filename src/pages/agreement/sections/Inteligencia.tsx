import { AnnotationMarker } from '../../../components/case-study/AnnotationMarker';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { inteligencia } from '../../../data/agreement';

const { capture } = inteligencia;

/** Painel branco de 1400px (20px do fundo escuro em cada lado), raio 32, conteúdo de 1176px */
export function Inteligencia() {
  return (
    <section aria-labelledby="inteligencia-title" className="bg-background-inverse px-8 md:px-20">
      <div className="mx-auto max-w-1400 overflow-hidden rounded-[32px] bg-background-primary px-[max(20px,calc((min(1400px,100cqw_-_40px)_-_1176px)/2))] py-48 md:px-[max(32px,calc((min(1400px,100cqw_-_40px)_-_1176px)/2))] md:py-80">
        <div className="flex flex-col gap-32">
          <div className="flex flex-col gap-48">
            <SectionHeader id="inteligencia-title" theme="light" eyebrow={inteligencia.eyebrow} title={inteligencia.title} />
            <p className="font-archivo text-20 leading-32 text-content-primary md:text-24 md:leading-36">{inteligencia.lead}</p>
          </div>

          <div className="flex flex-col gap-48 lg:flex-row">
            {/* "Captura anotada" */}
            <figure className="flex flex-col items-center rounded-[24px] bg-background-secondary p-16 md:p-32 lg:w-[64.63%] lg:shrink-0">
              <div className="flex w-full flex-1 items-center justify-center py-24 md:py-48 lg:py-0">
                <div className="relative aspect-[696/387] w-full max-w-696">
                  <img
                    src={capture.src}
                    alt={capture.alt}
                    width={1392}
                    height={773}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                  {capture.markers.map((marker) => (
                    <AnnotationMarker
                      key={marker.number}
                      number={marker.number}
                      className="absolute"
                      style={{ left: `${(marker.left / capture.width) * 100}%`, top: `${(marker.top / capture.height) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <figcaption className="flex w-full items-center gap-16 border-t border-border-primary pt-20">
                <span aria-hidden="true" className="h-44 w-4 shrink-0 rounded-[2px] bg-content-tertiary" />
                <span className="min-w-px flex-1 font-archivo text-15 leading-22 text-content-secondary">
                  <strong className="font-semibold text-content-primary">{inteligencia.note.strong}</strong>{' '}
                  <br />
                  {inteligencia.note.text}
                </span>
              </figcaption>
            </figure>

            {/* "Categorias de avaliação" */}
            <div className="flex min-w-px flex-1 flex-col gap-12">
              <p className="font-archivo text-14 leading-20 font-semibold text-content-secondary">{inteligencia.categoriesLabel}</p>
              <ul className="flex flex-col gap-12">
                {inteligencia.categories.map((item) => (
                  <li key={item.number} className="flex flex-col gap-8 border-t border-border-primary pt-12">
                    <div className="flex items-center gap-8 text-content-primary">
                      <span className="font-archivo text-14 leading-20 font-semibold">{item.number}</span>
                      <h3 className="font-archivo text-20 leading-28 font-bold">{item.title}</h3>
                    </div>
                    <p className="font-archivo text-14 leading-20 tracking-[0.025em] text-content-secondary">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

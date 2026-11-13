import { Container } from '../../../components/Container';
import { AnnotationMarker } from '../../../components/case-study/AnnotationMarker';
import { FeatureItem } from '../../../components/case-study/FeatureItem';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { dados } from '../../../data/agreement';

const { capture } = dados;
// "Captura · Operação Geral (Mixpanel)": 1136×607.44
const W = 1136;
const H = 607.44;
const pctX = (value: number) => `${(value / W) * 100}%`;
const pctY = (value: number) => `${(value / H) * 100}%`;

export function Dados() {
  return (
    <section aria-labelledby="dados-title" className="bg-background-primary py-64 md:py-96 lg:py-112">
      <Container className="flex flex-col gap-48">
        <div className="flex flex-col gap-48">
          <SectionHeader id="dados-title" theme="light" eyebrow={dados.eyebrow} title={dados.title} />
          <p className="font-archivo text-20 leading-32 text-content-primary md:text-24 md:leading-36">{dados.lead}</p>
        </div>

        {/* "Painel · Mixpanel" */}
        <figure className="flex flex-col gap-24 rounded-[24px] bg-background-inverse p-16 md:p-40">
          <div className="relative aspect-[1136/607.44] w-full">
            <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-[#27292b]">
              <img
                src={capture.operacao.src}
                alt={capture.operacao.alt}
                width={1831}
                height={645}
                loading="lazy"
                decoding="async"
                className="absolute max-w-none"
                style={{ left: pctX(-142), top: pctY(-59.166), width: pctX(1278), height: pctY(450.2) }}
              />
              <img
                src={capture.funil.src}
                alt={capture.funil.alt}
                width={1619}
                height={349}
                loading="lazy"
                decoding="async"
                className="absolute max-w-none object-cover"
                style={{ left: pctX(-1.704), top: pctY(289.82), width: pctX(1130.03), height: pctY(243.6) }}
              />
            </div>
            {/* "Destaque · Funil" */}
            <span
              aria-hidden="true"
              className="absolute rounded-[12px] border-2 border-accent-highlight"
              style={{ left: pctX(9), top: pctY(325), width: pctX(1118), height: pctY(200) }}
            />
            {capture.markers.map((marker) => (
              <AnnotationMarker
                key={marker.number}
                number={marker.number}
                className="absolute"
                style={{ left: pctX(marker.left), top: pctY(marker.top) }}
              />
            ))}
          </div>

          <figcaption>
            <ul className="flex flex-col gap-16 md:flex-row md:gap-32">
              {dados.legend.map((item) => (
                <li key={item.number} className="flex min-w-px flex-1 items-start gap-10">
                  <AnnotationMarker number={item.number} size="legend" />
                  <span className="min-w-px flex-1 font-archivo text-14 leading-20 tracking-[0.025em] text-content-tertiary">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>

        <ul className="grid gap-24 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {dados.features.map((feature) => (
            <li key={feature.number}>
              <FeatureItem theme="light" {...feature} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

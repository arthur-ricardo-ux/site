import molduraSuperior from '../../../assets/agreement/hero-moldura-superior.svg';
import molduraInferior from '../../../assets/agreement/hero-moldura-inferior.svg';
import { Container } from '../../../components/Container';
import { LoopVideo } from '../../../components/case-study/LoopVideo';
import { hero, videos } from '../../../data/agreement';
import { cn } from '../../../utils';

const highlightGradient = 'linear-gradient(95.595deg, #e25f22 1.6385%, #df003c 48.005%, #ef0074 101.62%)';
const weights = { extrabold: 'font-extrabold', semibold: 'font-semibold', regular: 'font-normal' } as const;

export function AgreementHero() {
  return (
    <section aria-labelledby="agreement-title" className="relative isolate overflow-hidden bg-background-inverse">
      {/* "Nuvidio-Novo-16x9": 1542×868 centralizado (51px além de cada lateral), recortado pelo hero */}
      <LoopVideo
        eager
        src={videos.hero.src}
        poster={videos.hero.poster}
        className="absolute top-1/2 left-[-51px] aspect-video min-h-full w-[calc(100%_+_102px)] max-w-none -translate-y-1/2 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-247 bg-[linear-gradient(to_top,#080b12,rgba(8,11,18,0))]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-142 bg-[linear-gradient(to_bottom,rgba(8,11,18,0.7),rgba(8,11,18,0))]" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-482 max-w-full bg-[linear-gradient(to_right,rgba(8,11,18,0.7),rgba(8,11,18,0))]" />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-112 bg-[linear-gradient(to_left,rgba(8,11,18,0.7),rgba(8,11,18,0))]" />

      <Container className="relative flex min-h-[640px] flex-col pt-64 pb-32 md:min-h-780 md:pt-142 md:pb-80">
        {/* Bloco de 377×296 (a 56px): posições em em para escalar junto com a fonte */}
        <h1
          id="agreement-title"
          className="relative w-[6.732em] font-archivo text-[42px] leading-[1.32] text-content-inverse sm:text-56"
        >
          <span className="block font-extralight">{hero.titleLight}</span>
          <span
            className="block bg-clip-text font-bold text-transparent"
            style={{ backgroundImage: highlightGradient }}
          >
            {hero.titleHighlight}
          </span>
          <img
            src={molduraSuperior}
            alt=""
            width={102.5}
            height={51.5}
            className="absolute top-[-0.0134em] left-[4.379em] h-[0.9196em] w-[1.83em] max-w-none rotate-180"
          />
          <img
            src={molduraInferior}
            alt=""
            width={398.5}
            height={114.5}
            className="absolute top-[3.54em] left-[-0.3705em] h-[2.045em] w-[7.116em] max-w-none"
          />
        </h1>

        <p className="mt-auto w-full max-w-340 self-start rounded-[40px] bg-[rgba(8,9,10,0.4)] p-24 font-archivo text-18 leading-32 font-semibold text-content-inverse md:mt-54 md:self-end">
          {hero.subtitle.map((part) => (
            <span key={part.text} className={cn(weights[part.weight])}>
              {part.text}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}

import { useRef, type CSSProperties } from 'react';
import halftonePoster from '../assets/images/hero-halftone.webp';
import halftoneVideo from '../assets/videos/hero-halftone.mp4';
import avatar from '../assets/images/avatar-arthur.webp';
import asterisk from '../assets/icons/glyph-asterisk.svg';
import arrowUpRight from '../assets/icons/arrow-up-right-28-white.svg';
import { LoopVideo } from '../components/case-study/LoopVideo';
import { StarSeal } from '../components/StarSeal';
import { Tag } from '../components/Tag';
import { sectionIds } from '../data/navigation';
import { useHeroIntro } from '../hooks/useHeroIntro';
import { cn, u } from '../utils';

const expertise = ['Estratégia de produto', 'produtos de IA', 'Design systems', 'Análise de dados', '0 → 1'];
const roles = ['Product Designer_', 'UX/UI designer_', 'Product Builder_'];

const welcomeCardGradient =
  'linear-gradient(119.396deg, #0a0a0a 7.4074%, #212121 33.333%, #060606 48.148%, #171717 66.667%, #060606 81.481%)';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const intro = useHeroIntro(ref);

  return (
    <section ref={ref} id={sectionIds.home} aria-labelledby="hero-title" className="hero-scale" data-intro={intro}>
      <div className="hero-grid mx-auto max-w-1440 px-16 pt-24 pb-24 md:px-32 md:pt-36">
        <Headline />

        <div className="relative flex flex-col gap-12 [grid-area:left]">
          <StarSeal className="absolute -top-76 left-12 z-10 max-md:[--spacing:0.75px]" />

          <div className="intro-up relative h-165 overflow-hidden rounded-[28px] bg-content-neutral-hard md:max-xl:h-auto md:max-xl:min-h-165 md:max-xl:flex-1">
            {/* Halftone animado (scripts/generate-hero-halftone.mjs): só o raio dos pontos muda */}
            <LoopVideo
              src={halftoneVideo}
              poster={halftonePoster}
              eager
              className="absolute top-0 left-0 h-[109.09%] w-full max-w-none object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-12">
            <Stat value="+4 anos" label="Experiência" className="bg-silver text-content-neutral-hard" labelClassName="text-gray-555" />
            <Stat value="700K+" label="UAM impactados" className="bg-graphite text-silver" />
          </div>
        </div>

        <WelcomeCard />

        <div className="intro-up rounded-[30px] bg-lime-soft px-20 py-28 [grid-area:flex] md:px-28 md:py-36">
          <ul aria-label="Especialidades" className="flex flex-wrap items-center gap-12">
            {expertise.map((item, index) => (
              <li key={item} className="intro-tag" style={{ '--i': index } as CSSProperties}>
                <Tag highlighted={index === 0}>{item}</Tag>
              </li>
            ))}
          </ul>

          <h2 className="mt-24 max-w-501 font-condensed text-40 leading-48 font-bold text-content-neutral-hard md:text-48 md:leading-56">
            End-to-end
          </h2>

          <div className="mt-24 flex flex-wrap items-center justify-between gap-x-24 gap-y-20">
            <p className="max-w-501 font-condensed text-18 leading-32 text-content-neutral-hard">
              Lidero o design de produto desde a estratégia até a execução, transformando problemas complexos em
              produtos claros, sistemas escaláveis e experiências que as pessoas desejam usar.
            </p>
            <a
              href={`#${sectionIds.projects}`}
              className="hover-overlay-on-dark flex shrink-0 items-center justify-center gap-8 rounded-[50px] bg-black py-16 pr-20 pl-24 backdrop-blur-[2.5px]"
            >
              <span className="font-condensed text-24 leading-28 font-semibold whitespace-nowrap text-content-inverse">
                Ver projetos
              </span>
              <img src={arrowUpRight} alt="" width={28} height={28} className="size-28" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Headline() {
  return (
    <h1
      id="hero-title"
      className="intro-ltr hero-headline font-condensed leading-[0.7917em] font-bold tracking-[-0.01em] text-ink [grid-area:head]"
    >
      <span className="ml-[2.25em] block">PRODUTOS</span>{' '}
      <span className="mt-[0.2083em] ml-[0.0417em] flex items-start gap-[0.125em]">
        <span>ESCALAVEIS</span>{' '}
        <span className="flex h-[0.75em] w-[1.2083em] shrink-0 items-center justify-center rounded-[0.4167em] border-2 border-content-neutral-hard">
          <span className="font-oswald text-[0.4896em] leading-[1.1] font-medium tracking-normal text-content-neutral-hard">
            &amp;
          </span>
        </span>
      </span>{' '}
      <span className="mt-[0.1979em] ml-[2.7708em] block">INTERFACES</span>{' '}
      <span className="mt-[0.125em] ml-[4.8854em] block">INTUITIVAS</span>
    </h1>
  );
}

type StatProps = {
  value: string;
  label: string;
  className: string;
  labelClassName?: string;
};

function Stat({ value, label, className, labelClassName }: StatProps) {
  return (
    <div
      className={cn(
        // @container: em cards mais estreitos que os 244px do Figma o texto acompanha a largura do card
        'intro-up @container flex h-146 flex-col items-center justify-center gap-4 rounded-[28px] text-center font-condensed font-bold',
        className,
      )}
    >
      <p className="text-[length:min(calc(var(--spacing)*52),27cqi)] leading-[1.2] tracking-[-0.01em] whitespace-nowrap">
        <TypeText text={value} />
      </p>
      <p className={cn('text-[length:min(calc(var(--spacing)*24),12cqi)] leading-32 whitespace-nowrap', labelClassName)}>
        <TypeText text={label} />
      </p>
    </div>
  );
}

function WelcomeCard() {
  return (
    <div
      className="intro-rtl relative w-full rounded-[24px] px-24 pt-24 pb-25 [grid-area:card] max-[359px]:px-20 xl:mr-3 xl:w-340 xl:justify-self-end"
      style={{ backgroundImage: welcomeCardGradient }}
    >
      <img
        src={asterisk}
        alt=""
        width={66}
        height={68}
        draggable={false}
        className="pointer-events-none absolute"
        style={{ right: u(21.14), top: u(52.58), width: u(65.86), height: u(67.82) }}
      />

      <div className="relative flex w-full max-w-266 items-start justify-between gap-12">
        <p className="rounded-[20px] border border-gray-aaa px-19 py-14 font-condensed text-18 leading-32 whitespace-nowrap text-white">
          Olá! Sou o Arthur
        </p>
        <div className="relative size-72 shrink-0 overflow-hidden rounded-full bg-white">
          <img
            src={avatar}
            alt="Foto de Arthur sorrindo"
            width={400}
            height={533}
            draggable={false}
            className="absolute max-w-none object-cover"
            style={{ left: '-34.52%', top: '-51.46%', width: '184.52%', height: '245.97%' }}
          />
        </div>
      </div>

      <ul className="relative mt-6 flex flex-col gap-12 font-condensed text-24 leading-32 font-bold text-lime-soft">
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>

      <p className="relative mt-12 max-w-278 font-condensed text-18 leading-32 text-gray-d0">
        Transformo desafios complexos em produtos digitais, conectando design, tecnologia e estratégia.
      </p>
    </div>
  );
}

/** Máquina de escrever da entrada: cada caractere aparece no seu tempo (espaço já reservado) */
function TypeText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((char, index) => (
          <span key={index} className="intro-char" style={{ '--i': index } as CSSProperties}>
            {char}
          </span>
        ))}
      </span>
    </>
  );
}

import type { CSSProperties } from 'react';
import arrowUpRight from '../assets/icons/arrow-up-right-dark.svg';
import padlock from '../assets/icons/padlock-square.svg';
import laptopKeyboard from '../assets/images/case-agreement-keyboard.webp';
import laptopKeyboardMobile from '../assets/images/case-agreement-keyboard-mobile.webp';
import { videos } from '../data/agreement';
import type { Box, CaseStudy, CaseStudyMedia } from '../data/caseStudies';
import { cn, linkProps, u } from '../utils';
import { LoopVideo } from './case-study/LoopVideo';

const boxVars = (prefix: string, box: Box) => ({
  [`--${prefix}-l`]: u(box.left),
  [`--${prefix}-t`]: u(box.top),
  [`--${prefix}-w`]: u(box.width),
  [`--${prefix}-h`]: u(box.height),
});
const pct = (value: number, total: number) => `${(value / total) * 100}%`;
/** Caixa em % de um quadro (mídia mobile) */
const pctVars = (prefix: string, box: Box, frame: { width: number; height: number }) => ({
  [`--${prefix}-l`]: pct(box.left, frame.width),
  [`--${prefix}-t`]: pct(box.top, frame.height),
  [`--${prefix}-w`]: pct(box.width, frame.width),
  [`--${prefix}-h`]: pct(box.height, frame.height),
});
/** Mesmo limite do variant max-md: (< 768px) */
const MOBILE = '(width < 48rem)';

/**
 * Card de estudo de caso (Figma 590:2638–2640).
 * - md+ (tablet e desktop): composição de 1024×540 do Figma; --spacing = largura do card / 1024, então tudo escala junto.
 * - < md: composição mobile do Figma (593:6039–6041), centralizada; só classes max-md: e os dados `mobile`.
 * Hover: o card encolhe para 98% e o botão passa à variante preenchida (300ms ease-in-out).
 * Também desenha os cards de "Todos os projetos" (Figma 526:4954), com os campos opcionais do tipo.
 */
export function CaseStudyCard({ study, eager = false }: { study: CaseStudy; eager?: boolean }) {
  const { media, mobile } = study;
  const mobileBg = mobile.background.box;
  const [eyebrowLead, eyebrowRest] = mobile.eyebrowBreak ? study.eyebrow.split(' • ') : [study.eyebrow];

  return (
    <a
      {...linkProps(study.href)}
      draggable={false}
      className="group @container block w-[min(560px,calc(100cqw_-_2*var(--gutter)_-_32px))] shrink-0 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-98 motion-reduce:hover:scale-100 md:w-[min(1024px,calc(100cqw_-_2*var(--gutter)_-_32px))] max-md:w-[calc(100cqw_-_2*var(--gutter))]"
    >
      <div
        style={
          {
            '--accent': study.accent,
            '--inset': u(study.inset),
            '--title-w': u(study.titleWidth ?? 421),
            '--desc-w': u(study.descriptionWidth ?? 410),
            ...boxVars('bg', study.background.box),
            ...boxVars('m', media.box),
            '--text-gap': `${mobile.textGap}px`,
            ...(mobileBg && { '--mbg-l': `${mobileBg.left}px`, '--mbg-t': `${mobileBg.top}px`, '--mbg-w': `${mobileBg.width}px`, '--mbg-h': `${mobileBg.height}px` }),
          } as CSSProperties
        }
        // Borda = traço "inside" do Figma: desenhada por cima (::after), sem deslocar o conteúdo
        className="relative flex h-full flex-col overflow-clip rounded-[32px] bg-background-inverse p-24 text-content-inverse after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-2 after:border-white md:block md:aspect-[1024/540] md:h-auto md:rounded-[calc(var(--spacing)*48)] md:p-0 md:[--spacing:calc(100cqw/1024)] md:after:border-[calc(var(--spacing)*2)] max-md:rounded-[24px] max-md:p-26 max-md:text-center"
      >
        <picture>
          <source media={MOBILE} srcSet={mobile.background.src} />
          <img
            src={study.background.src}
            alt=""
            draggable={false}
            loading={eager ? 'eager' : 'lazy'}
            className={cn(
              'pointer-events-none absolute inset-0 size-full max-w-none object-cover md:inset-auto md:top-(--bg-t) md:left-(--bg-l) md:h-(--bg-h) md:w-(--bg-w)',
              mobileBg
                ? // cobre o card mesmo quando o texto quebra em mais linhas
                  'max-md:inset-auto max-md:top-(--mbg-t) max-md:left-(--mbg-l) max-md:h-[max(var(--mbg-h),calc(100%_-_var(--mbg-t)))] max-md:w-(--mbg-w)'
                : mobile.background.anchor === 'bottom'
                  ? 'max-md:object-bottom'
                  : 'max-md:object-left-top',
            )}
          />
        </picture>

        <div className="relative flex flex-col gap-16 max-md:gap-24 md:absolute md:top-(--inset) md:left-(--inset) md:gap-24">
          <div className="flex flex-col gap-12 md:w-max md:min-w-421">
            <p className="font-archivo text-16 leading-24 md:text-20 md:leading-32 md:whitespace-nowrap">
              {eyebrowRest ? (
                <>
                  <span className="max-md:block">{eyebrowLead} •</span> <span className="max-md:block">{eyebrowRest}</span>
                </>
              ) : (
                study.eyebrow
              )}
            </p>
            <div className="h-2 w-full bg-content-tertiary" />
          </div>
          <h3 className="font-archivo text-28 leading-36 font-bold max-md:text-32 max-md:leading-44 md:w-(--title-w) md:text-34 md:leading-44">
            {study.title.map((part) => (
              <span key={part.text} className={cn(part.accent && 'text-(--accent)')}>
                {part.lineBreak && <br />}
                {part.text}
              </span>
            ))}
          </h3>
        </div>

        <div className="relative mt-24 flex flex-col items-start gap-32 max-md:mt-(--text-gap) max-md:items-center md:absolute md:bottom-(--inset) md:left-(--inset) md:mt-0 md:w-(--desc-w)">
          <p className="font-archivo text-16 leading-24">{study.description}</p>
          <span className="flex items-center gap-4 rounded-[50px] py-[calc(var(--spacing)*9.5)] pr-[calc(var(--spacing)*21.5)] pl-[calc(var(--spacing)*25.5)] font-condensed text-16 leading-24 font-semibold whitespace-nowrap text-(--accent) shadow-[inset_0_0_0_calc(var(--spacing)*1.5)_var(--accent)] backdrop-blur-[2.5px] transition-colors duration-300 ease-in-out group-hover:bg-(--accent) group-hover:text-content-primary group-focus-visible:bg-(--accent) group-focus-visible:text-content-primary">
            {study.cta}
            <span aria-hidden="true" className="flex size-24 shrink-0 items-center justify-center">
              <span
                className={cn('bg-current', study.ctaIcon === 'padlock' ? 'size-16' : 'size-24')}
                style={{ mask: `url("${study.ctaIcon === 'padlock' ? padlock : arrowUpRight}") center / 100% 100% no-repeat` }}
              />
            </span>
          </span>
        </div>

        <div className="relative mt-auto pt-32 max-md:mt-48 max-md:pt-0 md:static md:pt-0">
          <Media media={media} mobile={mobile.media} eager={eager} />
        </div>
      </div>
    </a>
  );
}

type MobileMedia = CaseStudy['mobile']['media'];

function Media({ media, mobile, eager }: { media: CaseStudyMedia; mobile: MobileMedia; eager: boolean }) {
  const frame =
    'relative w-full aspect-(--ratio) max-md:aspect-(--mratio) md:absolute md:top-(--m-t) md:left-(--m-l) md:h-(--m-h) md:w-(--m-w) md:aspect-auto';
  const ratio = {
    '--ratio': `${media.box.width} / ${media.box.height}`,
    '--mratio': mobile ? `${mobile.width} / ${mobile.height}` : `${media.box.width} / ${media.box.height}`,
    ...(mobile && pctVars('mi', mobile.image, mobile)),
  } as CSSProperties;
  const adjust = media.kind === 'image' ? media : undefined;

  if (media.kind === 'laptop-video') {
    return (
      <div className={frame} style={ratio}>
        <Laptop />
      </div>
    );
  }

  const { crop, rotate, mask } = adjust ?? {};
  const mobileMask = mobile?.mask ?? mask;
  // caixa da imagem: o quadro inteiro no desktop; no mobile, a caixa do frame mobile (em %)
  const image = (
    <div
      className={cn(
        'pointer-events-none absolute inset-0',
        mobile && 'max-md:inset-auto max-md:top-(--mi-t) max-md:left-(--mi-l) max-md:h-(--mi-h) max-md:w-(--mi-w)',
        crop && 'overflow-hidden',
        mask && '[mask-size:100%_100%] [mask-repeat:no-repeat] [mask-image:var(--mask)] max-md:[mask-image:var(--mask-m)]',
      )}
      style={
        {
          rotate: rotate ? `${rotate}deg` : undefined,
          '--mask': mask && `url("${mask}")`,
          '--mask-m': mobileMask && `url("${mobileMask}")`,
        } as CSSProperties
      }
    >
      <img
        src={media.image.src}
        alt={media.image.alt}
        width={media.image.width}
        height={media.image.height}
        draggable={false}
        loading={eager ? 'eager' : 'lazy'}
        className={cn('absolute max-w-none', crop ? '' : 'inset-0 size-full object-cover')}
        style={crop && { left: `${crop.left}%`, top: `${crop.top}%`, width: `${crop.width}%`, height: `${crop.height}%` }}
      />
    </div>
  );

  if (media.kind === 'image') {
    return (
      <div className={frame} style={ratio}>
        {image}
      </div>
    );
  }

  const { logo, box } = media;
  return (
    <div className={frame} style={ratio}>
      {image}
      <img
        src={logo.src}
        alt=""
        width={logo.box.width}
        height={logo.box.height}
        draggable={false}
        className={cn('pointer-events-none absolute max-w-none', mobile?.logo && 'max-md:hidden')}
        style={{
          left: pct(logo.box.left, box.width),
          top: pct(logo.box.top, box.height),
          width: pct(logo.box.width, box.width),
          height: pct(logo.box.height, box.height),
        }}
      />
      {mobile?.logo && (
        <img
          src={mobile.logo.src}
          alt=""
          width={mobile.logo.box.width}
          height={mobile.logo.box.height}
          draggable={false}
          className="pointer-events-none absolute max-w-none md:hidden"
          style={{
            left: pct(mobile.logo.box.left, mobile.width),
            top: pct(mobile.logo.box.top, mobile.height),
            width: pct(mobile.logo.box.width, mobile.width),
            height: pct(mobile.logo.box.height, mobile.height),
          }}
        />
      )}
    </div>
  );
}

/** "Laptop" do Card Agreement (775×382): medidas do Figma em unidades do próprio laptop */
function Laptop() {
  return (
    <div className="@container absolute inset-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [--spacing:calc(100cqw/775)]">
        {/* Bottom */}
        <div
          className="absolute bg-black"
          style={{ left: 0, top: u(381.11), width: u(775.101), height: u(1.059), borderRadius: u(9.53), filter: `blur(${u(3.177)})` }}
        />
        <div
          className="absolute bg-[rgba(0,0,0,0.6)]"
          style={{ left: u(0.53), top: u(381.64), width: u(774.042), height: u(0.529), borderRadius: u(9.53), filter: `blur(${u(0.794)})` }}
        />
        {/* No mobile o Figma usa um teclado mais estreito, centralizado (727 × 14 nestas unidades) */}
        <div
          className="absolute h-(--kb-h) w-(--kb-w) overflow-hidden max-md:h-[calc(var(--spacing)*14.007)] max-md:w-[calc(var(--spacing)*727.03)]"
          style={{ left: u(24), top: u(368), '--kb-w': u(775.101), '--kb-h': u(13.765), borderRadius: u(0.529) } as CSSProperties}
        >
          <picture>
            <source media={MOBILE} srcSet={laptopKeyboardMobile} />
            <img src={laptopKeyboard} alt="" width={776} height={14} className="absolute inset-0 size-full max-w-none object-cover" />
          </picture>
          <div className="absolute inset-0 bg-linear-to-b from-[rgba(239,239,239,0.2)] to-[rgba(219,219,219,0.2)]" />
          <div
            className="absolute inset-0"
            style={{ boxShadow: `inset 0 ${u(-0.529)} ${u(0.529)} 0 rgba(0,0,0,0.3), inset 0 ${u(-1.059)} ${u(0.529)} 0 rgba(255,255,255,0.7)` }}
          />
        </div>

        {/* Top */}
        <div
          className="absolute border-solid border-[#ccc] bg-[#d6d6d6]"
          style={{ left: u(77.83), top: u(-0.09), width: u(619.445), height: u(367.432), borderWidth: u(0.529), borderRadius: `${u(11.648)} ${u(11.648)} 0 0` }}
        />
        <div
          className="absolute bg-[#050505]"
          style={{
            left: u(79.42),
            top: u(1.5),
            width: u(616.269),
            height: u(365.843),
            borderRadius: `${u(10.589)} ${u(10.589)} 0 0`,
            boxShadow: `0 0 ${u(0.265)} ${u(0.265)} rgba(255,255,255,0.6), inset 0 0 ${u(2.118)} ${u(1.059)} rgba(0,0,0,0.1)`,
          }}
        />
        <div className="absolute overflow-clip" style={{ left: u(88.86), top: u(12.69), width: u(597.279), height: u(346.743), borderRadius: u(1.336) }}>
          <LoopVideo
            src={videos.hero.src}
            poster={videos.hero.poster}
            className="absolute max-w-none object-cover"
            style={{ left: u(-105.56), top: u(-54.12), width: u(808.955), height: u(455.037) }}
          />
        </div>
        {/* Screen--Glow */}
        <div
          className="absolute"
          style={{
            left: u(79.42),
            top: u(1.5),
            width: u(616.269),
            height: u(365.843),
            borderRadius: `${u(10.589)} ${u(10.589)} 0 0`,
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 616.27 365.84' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(64.803 37.838 -63.738 83.942 45.532 37.374)'><stop stop-color='rgba(255,255,255,0.24)' offset='0.15583'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\")",
            boxShadow: `inset 0 0 ${u(1.059)} ${u(0.529)} rgba(0,0,0,0.4)`,
          }}
        />
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import phoneMomento1 from '../../assets/agreement/phone-momento-1.webp';
import phoneMomento2 from '../../assets/agreement/phone-momento-2.webp';
import phoneMomento3 from '../../assets/agreement/phone-momento-3.webp';
import phoneMomento4 from '../../assets/agreement/phone-momento-4.webp';
import phoneMomento5 from '../../assets/agreement/phone-momento-5.webp';
import passo1 from '../../assets/agreement/m1-passo-1.svg';
import passo2 from '../../assets/agreement/m1-passo-2.svg';
import passo3 from '../../assets/agreement/m1-passo-3.svg';
import statusAnalise from '../../assets/agreement/m5-status-analise.svg';
import statusSucesso from '../../assets/agreement/m5-status-sucesso.svg';
import loader from '../../assets/agreement/m5-loader.webp';
import { videos } from '../../data/agreement';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTimedSequence } from '../../hooks/useTimedSequence';
import { cn } from '../../utils';
import { CrossfadeStack } from './CrossfadeStack';

/**
 * Componente "Mockup iPhone 16" (Figma 401:5116) — uma variante por MOMENTO.
 * Geometria em % da variante (377×785); a imagem inclui os botões laterais (x −3 … 380).
 */
const screens = [phoneMomento1, phoneMomento2, phoneMomento3, phoneMomento4, phoneMomento5];
const pct = (value: number, total: number) => `${(value / total) * 100}%`;
const box = (x: number, y: number, w: number, h: number) => ({
  left: pct(x, 377),
  top: pct(y, 785),
  width: pct(w, 377),
  height: pct(h, 785),
});

// MOMENTO 01 · "Passo a passo": AFTER_TIMEOUT 1.5s → DISSOLVE 300ms ease-out, em loop
const PASSO_HOLD = 1500;
const PASSO_TRANSITION = 300;
// MOMENTO 05 · "Component 1106": 3s analisando → troca instantânea → 5s sucesso → volta
const STATUS_HOLDS = [3000, 5000] as const;

type PhoneMockupProps = {
  /** 1–5 */
  moment: number;
  /** Animações internas rodando (tela visível) */
  playing: boolean;
  className?: string;
  /** Transição entre telas de momentos diferentes */
  transitionMs?: number;
};

export function PhoneMockup({ moment, playing, className, transitionMs = 300 }: PhoneMockupProps) {
  const reduceMotion = usePrefersReducedMotion();
  const passo = useTimedSequence(3, {
    holdMs: PASSO_HOLD,
    transitionMs: PASSO_TRANSITION,
    running: playing && moment === 1,
    restartOnRun: true,
  });
  const status = useTimedSequence(2, { holdMs: STATUS_HOLDS, running: playing && moment === 5, restartOnRun: true });

  const layers = screens.map((src, index) => (
    <div key={src} className="absolute inset-0">
      <img
        src={src}
        alt=""
        width={766}
        height={1570}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute top-0 h-full max-w-none"
        style={{ left: pct(-3, 377), width: pct(383, 377) }}
      />

      {index === 0 && (
        // Card "Frame 427321450" (#e6e6e6, raio 16) por trás do "Passo a passo"
        <div className="absolute overflow-hidden rounded-[5%/3.95%] bg-[#e6e6e6]" style={box(32, 235, 320, 405)}>
          <CrossfadeStack
            className="absolute inset-x-0 bottom-[1.98%] h-[94.07%]"
            activeIndex={passo}
            durationMs={reduceMotion ? 0 : PASSO_TRANSITION}
            items={[passo1, passo2, passo3].map((step) => (
              <img key={step} src={step} alt="" width={320} height={381} className="size-full" draggable={false} />
            ))}
          />
        </div>
      )}

      {index === 3 && videos.momento04.src && (
        // "screen-here" (raio 52) recorta o vídeo, que ocupa só a área de conteúdo (Figma 438:9916)
        <div className="absolute overflow-hidden rounded-[14.73%/6.83%]" style={box(12, 12, 353, 761)}>
          <ScreenVideo src={videos.momento04.src} playing={playing && moment === 4 && !reduceMotion} />
        </div>
      )}

      {index === 4 && (
        <div className="absolute bg-[#f2f2f2]" style={box(32.5, 303, 312, 196)}>
          <CrossfadeStack
            className="absolute inset-0"
            activeIndex={status}
            durationMs={0}
            items={[
              <div key="analise" className="absolute inset-0">
                <img src={statusAnalise} alt="" width={312} height={196} className="size-full" draggable={false} />
                {/* "Loader anim": 24 estados de 15° a cada 50 ms (smart animate) = 1 volta em 1.2 s */}
                <img
                  src={loader}
                  alt=""
                  width={96}
                  height={96}
                  draggable={false}
                  className="absolute top-0 left-[39.74%] h-[32.65%] w-[20.51%] animate-loader-spin motion-reduce:animate-none"
                />
              </div>,
              <img key="sucesso" src={statusSucesso} alt="" width={312} height={196} className="size-full" draggable={false} />,
            ]}
          />
        </div>
      )}
    </div>
  ));

  return (
    <div className={cn('relative aspect-[377/785]', className)}>
      <CrossfadeStack
        className="absolute inset-0"
        activeIndex={moment - 1}
        durationMs={reduceMotion ? 0 : transitionMs}
        items={layers}
      />
    </div>
  );
}

/**
 * Gravação do MOMENTO 04 (360×686): mesma área do frame "colar aqui" (353×672.67 a 51px do topo da
 * tela). Começa do início sempre que o Momento fica ativo e pausa quando sai; até o primeiro frame
 * carregar, a tela estática do Figma continua visível por baixo.
 */
function ScreenVideo({ src, playing }: { src: string; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) {
      video.muted = true;
      video.currentTime = 0;
      video.play().catch(() => {
        /* autoplay bloqueado: a tela estática continua visível */
      });
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <video
      ref={ref}
      src={src}
      className="absolute left-0 h-[88.39%] w-full object-cover"
      style={{ top: pct(51, 761) }}
      loop
      muted
      playsInline
      disablePictureInPicture
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

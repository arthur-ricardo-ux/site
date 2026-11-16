import type { CSSProperties } from 'react';
import letterA from '../assets/icons/logo-art-a.svg';
import letterR from '../assets/icons/logo-art-r.svg';
import letterT from '../assets/icons/logo-art-t.svg';
import { cn } from '../utils';

/**
 * Componente "Logo animação" (Figma 453:3556), em unidades do quadro de 62×24 (exibido a 82,67×32).
 * Hover (Smart Animate): as letras atuais saem do quadro e as de reserva (b1–b3) entram, passando
 * de amarelo a #c9f255 — 400ms cubic-bezier(0, 0, 0.246, 1); ao sair, volta em 300ms ease-in.
 */
const letters = [
  // [máscara, x, y, largura, altura, deslocamento no hover (a) / fora do quadro (b)]
  { src: letterA, x: 1, y: 2, w: 21.176, h: 21.176, out: [-23, 21], from: [21, -24] },
  { src: letterR, x: 25, y: 6, w: 16.941, h: 16.941, out: [25, -24], from: [-19, 19] },
  { src: letterT, x: 36.706, y: 0, w: 25.412, h: 24, out: [-24.706, 25], from: [18.294, -18] },
] as const;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

export function LogoArt({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('logo-art', dark && 'logo-art--dark', className)}
    >
      {letters.flatMap(({ src, x, y, w, h, out, from }) => {
        const box = { left: pct(x, 62), top: pct(y, 24), width: pct(w, 62), height: pct(h, 24), '--mask': `url("${src}")` };
        return [
          <span
            key={`${src}-a`}
            className="logo-art__letter logo-art__letter--current"
            style={{ ...box, '--dx': out[0], '--dy': out[1] } as CSSProperties}
          />,
          <span
            key={`${src}-b`}
            className="logo-art__letter logo-art__letter--next"
            style={{ ...box, '--dx': from[0], '--dy': from[1] } as CSSProperties}
          />,
        ];
      })}
    </span>
  );
}

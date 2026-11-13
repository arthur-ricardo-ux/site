import starGlyph from '../assets/icons/glyph-star.svg';
import { cn, u } from '../utils';

/**
 * Texto circular do "star-deco" (plugin Arktist arc no Figma).
 * Cada letra e rotação são as renderizadas no Figma ("Metodologia AI-Frist", repetido duas vezes);
 * o centro da linha fica a 78.2px do centro do selo.
 */
const arcLetters: Array<[string, number]> = [
  ['•', -92.87], ['M', -77.33], ['e', -67.39], ['t', -59.35], ['o', -51.31], ['d', -42.46],
  ['o', -33.6], ['l', -25.83], ['o', -18.07], ['g', -9.21], ['i', -1.44], ['a', 6.32],
  ['A', 21.58], ['I', 29.62], ['-', 36.3], ['F', 44.07], ['r', 51.84], ['i', 58.79],
  ['s', 66.55], ['t', 74.32],
  ['•', 87.95], ['M', 103.48], ['e', 113.43], ['t', 121.47], ['o', 129.51], ['d', 138.36],
  ['o', 147.22], ['l', 154.98], ['o', 162.75], ['g', 171.61], ['i', 179.37], ['a', -172.86],
  ['A', -157.6], ['I', -149.56], ['-', -142.88], ['F', -135.11], ['r', -127.35], ['i', -120.39],
  ['s', -112.63], ['t', -104.86],
];

const ARC_RADIUS = 78.2;

export function StarSeal({ className }: { className?: string }) {
  return (
    <div role="img" aria-label="Metodologia AI-Frist" className={cn('size-190 rounded-full bg-white', className)}>
      <img
        src={starGlyph}
        alt=""
        width={67}
        height={67}
        draggable={false}
        className="absolute"
        style={{ left: u(61.39), top: u(64.56), width: u(66.05), height: u(66.05) }}
      />
      {/* Só o anel de texto gira (em torno do centro do selo); a estrela fica fixa */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 animate-seal-spin font-condensed text-15 leading-[normal] text-black motion-reduce:animate-none"
      >
        {arcLetters.map(([char, angle], index) => (
          <span key={index} className="absolute top-0 left-0" style={{ transform: `rotate(${angle}deg)` }}>
            <span
              className="absolute left-0 -translate-1/2 whitespace-pre"
              style={{ top: `calc(var(--spacing) * -${ARC_RADIUS})` }}
            >
              {char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

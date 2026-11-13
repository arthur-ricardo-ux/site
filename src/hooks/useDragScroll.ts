import { useEffect, useRef } from 'react';

const DRAG_THRESHOLD = 6;
const SWIPE_THRESHOLD = 60;

/**
 * Permite arrastar um container de scroll horizontal com o mouse.
 * Touch e trackpad continuam usando o scroll nativo (com scroll-snap).
 * Durante o arraste o snap é desligado (data-dragging) e, ao soltar,
 * o container desliza suavemente até o card mais próximo.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pointerId: number | null = null;
    let startX = 0;
    let startScroll = 0;
    let dragged = false;
    let releaseTimer: number | undefined;

    const snapPositions = () => {
      const paddingStart = parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;
      const max = el.scrollWidth - el.clientWidth;
      return Array.from(el.children).map((child) =>
        Math.min(max, Math.max(0, (child as HTMLElement).offsetLeft - paddingStart)),
      );
    };

    const settle = (delta: number) => {
      const positions = snapPositions();
      const current = el.scrollLeft;
      let target = positions.reduce((best, pos) => (Math.abs(pos - current) < Math.abs(best - current) ? pos : best), 0);

      // Arraste curto mas intencional: avança/volta um card na direção do gesto
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        const startIndex = positions.findIndex((pos) => pos >= startScroll - 1);
        const nextIndex = Math.min(positions.length - 1, Math.max(0, startIndex + (delta < 0 ? 1 : -1)));
        if (Math.abs(target - startScroll) < 1) target = positions[nextIndex];
      }

      const finish = () => {
        window.clearTimeout(releaseTimer);
        el.removeEventListener('scrollend', finish);
        delete el.dataset.dragging;
      };

      el.addEventListener('scrollend', finish, { once: true });
      releaseTimer = window.setTimeout(finish, 700);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollTo({ left: target, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScroll = el.scrollLeft;
      dragged = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      const delta = event.clientX - startX;
      if (!dragged) {
        if (Math.abs(delta) < DRAG_THRESHOLD) return;
        dragged = true;
        window.clearTimeout(releaseTimer);
        el.dataset.dragging = 'true';
        el.setPointerCapture(event.pointerId);
      }
      el.scrollLeft = startScroll - delta;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      pointerId = null;
      if (dragged) settle(event.clientX - startX);
    };

    // Impede que soltar o mouse após arrastar dispare a navegação do card
    const onClickCapture = (event: MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };

    const onDragStart = (event: DragEvent) => event.preventDefault();

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('dragstart', onDragStart);

    return () => {
      window.clearTimeout(releaseTimer);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('dragstart', onDragStart);
    };
  }, []);

  return ref;
}

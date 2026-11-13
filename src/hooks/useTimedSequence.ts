import { useEffect, useState } from 'react';

type Options = {
  /** Tempo que cada estado fica visível (ms). Array = um valor por estado (use uma constante estável). */
  holdMs: number | readonly number[];
  /** Duração da transição para o próximo estado: o timer seguinte só começa depois dela. */
  transitionMs?: number;
  /** Pausa a sequência (ex.: fora da viewport). Ao retomar, continua do estado atual. */
  running: boolean;
  /** Volta ao primeiro estado sempre que `running` liga (ex.: tela que acabou de aparecer). */
  restartOnRun?: boolean;
};

/**
 * Reproduz um fluxo de protótipo "AFTER_TIMEOUT → CHANGE_TO" em loop:
 * estado 0 → (hold) → estado 1 → … → último → estado 0.
 */
export function useTimedSequence(length: number, { holdMs, transitionMs = 0, running, restartOnRun = false }: Options) {
  const [state, setState] = useState({ index: 0, viaTransition: false });
  const [wasRunning, setWasRunning] = useState(running);

  // Ajuste de estado durante a renderização quando `running` muda (sem efeito extra)
  if (running !== wasRunning) {
    setWasRunning(running);
    if (running && restartOnRun && state.index !== 0) setState({ index: 0, viaTransition: false });
  }

  useEffect(() => {
    if (!running || length < 2) return;
    const hold = typeof holdMs === 'number' ? holdMs : holdMs[state.index % holdMs.length];
    const delay = hold + (state.viaTransition ? transitionMs : 0);
    const timer = window.setTimeout(
      () => setState((current) => ({ index: (current.index + 1) % length, viaTransition: true })),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [state, running, length, holdMs, transitionMs]);

  return state.index;
}

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useLandingEffects';

/**
 * Número que conta de 0 até o valor ao entrar na tela (desaceleração cúbica; 1,4s acima de 9, 0,9s abaixo).
 * O HTML pré-renderizado já traz o valor final; sem contagem com movimento reduzido.
 */
export function CountUp({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const final = `${value}${suffix}`;
  const [text, setText] = useState(final);
  const [counting, setCounting] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      el.style.minWidth = `${el.offsetWidth}px`; // a largura não treme durante a contagem
      setCounting(true);
      const t0 = performance.now();
      const dur = value > 9 ? 1400 : 900;
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        setText(`${Math.round(value * eased)}${k === 1 ? suffix : ''}`);
        if (k < 1) raf = requestAnimationFrame(step);
        else setCounting(false);
      };
      setText('0');
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        timer = setTimeout(run, 450);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);

  return (
    <>
      <span ref={ref} className="stat__num" aria-hidden={counting || undefined}>
        {text}
      </span>
      {/* durante a contagem, o leitor de tela recebe o valor final */}
      {counting && <span className="sr-only">{final}</span>}
      <span className="stat__label">{label}</span>
    </>
  );
}

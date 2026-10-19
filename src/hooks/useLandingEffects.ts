import { useEffect } from 'react';
import { edgeGlow } from '../components/BorderGlow';

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Efeitos globais. O conteúdo pré-renderizado é visível sem JS; estes efeitos só acrescentam comportamento. */
export function useLandingEffects() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const reduce = prefersReducedMotion();

    // Cabeçalho fixo: sabe se está sobre uma seção clara (linho) para adensar o vidro.
    const header = document.querySelector('.site-header');
    const light = document.querySelectorAll('.seam, .services, .about');
    if (header && light.length && 'IntersectionObserver' in window) {
      const over = new Set<Element>();
      // faixa observada: só o topo da janela, onde a pílula fica
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => (en.isIntersecting ? over.add(en.target) : over.delete(en.target)));
          if (over.size) header.setAttribute('data-surface', 'light');
          else header.removeAttribute('data-surface');
        },
        { rootMargin: '0px 0px -92% 0px' },
      );
      light.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Entradas ao rolar (uma vez), escalonadas dentro de cada seção. Animação em CSS: `.js [data-reveal]`.
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
    } else {
      document.querySelectorAll('section').forEach((sec) => {
        sec.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => el.style.setProperty('--d', String(Math.min(i, 6))));
      });
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
      );
      targets.forEach((el) => io.observe(el));
      // impressão e leitores que não rolam a página: mostra tudo
      const showAll = () => targets.forEach((el) => el.classList.add('is-in'));
      window.addEventListener('beforeprint', showAll);
      const late = setTimeout(() => {
        targets.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
        });
      }, 2500);
      cleanups.push(() => {
        io.disconnect();
        window.removeEventListener('beforeprint', showAll);
        clearTimeout(late);
      });
    }

    // Vidro que responde ao mouse (.tilt): brilho dourado segue o cursor e o card inclina na direção dele
    // (data-tilt = inclinação máxima em graus). Só com mouse; sem inclinação com movimento reduzido.
    document.querySelectorAll<HTMLElement>('.tilt').forEach((card) => {
      const max = reduce ? 0 : Number(card.dataset.tilt || 0);
      const move = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.setProperty('--rx', `${((x / r.width - 0.5) * 2 * max).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${((0.5 - y / r.height) * 2 * max).toFixed(2)}deg`);
        // borda luminosa (BorderGlow): proximidade da borda (0 a 100) e ângulo do cursor
        if (card.querySelector(':scope > .bglow')) {
          const glow = edgeGlow(r.width, r.height, x, y);
          card.style.setProperty('--edge-proximity', glow.edge.toFixed(2));
          card.style.setProperty('--cursor-angle', `${glow.angle.toFixed(2)}deg`);
        }
        card.style.setProperty('--glow', '1');
      };
      const leave = () => ['--mx', '--my', '--rx', '--ry', '--glow', '--edge-proximity', '--cursor-angle'].forEach((v) => card.style.removeProperty(v));
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', leave);
        leave();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}

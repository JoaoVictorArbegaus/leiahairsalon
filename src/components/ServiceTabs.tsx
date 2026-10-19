import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { servicos } from '../content/site';
import { Glass } from './Glass';
import { prefersReducedMotion } from '../hooks/useLandingEffects';

// useLayoutEffect avisa no servidor; lá nada disto roda
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Categorias de serviço em abas. O HTML pré-renderizado (e a página sem JS) mostra todas as listas empilhadas,
 * com o trilho oculto; depois de montar, viram abas com pílula deslizante, palco com altura animada e
 * troca com slide + fade na direção da aba escolhida.
 */
export function ServiceTabs() {
  const cats = servicos.categorias;
  const [tabbed, setTabbed] = useState(false);
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [entering, setEntering] = useState<number | null>(null);
  const [atEnd, setAtEnd] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const userMoved = useRef(false);

  const place = useCallback(() => {
    const t = tabRefs.current[current];
    const pill = pillRef.current;
    if (!t || !pill) return;
    pill.style.setProperty('--px', `${t.offsetLeft}px`);
    pill.style.setProperty('--py', `${t.offsetTop}px`);
    pill.style.setProperty('--pw', `${t.offsetWidth}px`);
    pill.style.setProperty('--ph', `${t.offsetHeight}px`);
  }, [current]);

  // o palco acompanha a altura do painel ativo (transição em CSS): sem salto e sem vazio sob listas curtas
  const fit = useCallback(() => {
    const p = panelRefs.current[current];
    if (p && stageRef.current) stageRef.current.style.height = `${p.offsetHeight}px`;
  }, [current]);

  useEffect(() => setTabbed(true), []);

  useIsoLayoutEffect(() => {
    if (!tabbed) return;
    place();
    fit();
  }, [tabbed, place, fit]);

  // só depois da primeira posição a pílula passa a deslizar; fontes web mudam a largura das abas
  useEffect(() => {
    if (!tabbed) return;
    const raf = requestAnimationFrame(() => setReady(true));
    document.fonts?.ready.then(place);
    return () => cancelAnimationFrame(raf);
  }, [tabbed, place]);

  useEffect(() => {
    if (!tabbed || !('ResizeObserver' in window)) return;
    const ro = new ResizeObserver(place);
    if (listRef.current) ro.observe(listRef.current);
    const rp = new ResizeObserver(fit);
    panelRefs.current.forEach((p) => p && rp.observe(p));
    return () => {
      ro.disconnect();
      rp.disconnect();
    };
  }, [tabbed, place, fit]);

  // o painel que entra começa deslocado, sem transição, e é solto no quadro seguinte
  useIsoLayoutEffect(() => {
    if (entering === null) return;
    void panelRefs.current[entering]?.offsetWidth;
    const raf = requestAnimationFrame(() => setEntering(null));
    return () => cancelAnimationFrame(raf);
  }, [entering]);

  // trilho que rola no celular: tira o esmaecimento da borda quando chega ao fim
  const onScroll = () => {
    const el = listRef.current;
    if (el) setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };
  useEffect(() => {
    if (tabbed) onScroll();
  }, [tabbed]);

  const select = (i: number, focus = false) => {
    if (i !== current) {
      setDir(i >= current ? 1 : -1);
      setEntering(i);
      setCurrent(i);
    }
    userMoved.current = true;
    if (focus) tabRefs.current[i]?.focus();
  };

  // mantém a aba visível no trilho que rola (celular)
  useEffect(() => {
    if (!userMoved.current) return;
    tabRefs.current[current]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [current]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = cats.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  const tabsClass = ['cats__tabs', tabbed && 'has-pill', ready && 'is-ready', atEnd && 'is-end'].filter(Boolean).join(' ');

  return (
    <div className="cats" data-reveal="">
      <h3 className="cats__title" id="cats-titulo">
        {servicos.todos}
      </h3>
      <Glass
        tone="strong"
        className={tabsClass}
        role="tablist"
        aria-labelledby="cats-titulo"
        hidden={!tabbed}
        ref={listRef}
        onScroll={onScroll}
      >
        {tabbed && <span ref={pillRef} className="cats__pill" aria-hidden="true" />}
        {cats.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${c.id}`}
            aria-controls={`cat-${c.id}`}
            aria-selected={i === current}
            tabIndex={i === current ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {c.nome}
          </button>
        ))}
      </Glass>
      <div ref={stageRef} className={tabbed ? 'cats__stage is-tabbed' : 'cats__stage'} data-stage="" style={{ '--dir': String(dir) } as CSSProperties}>
        {cats.map((c, i) => {
          const on = i === current;
          const panelProps = tabbed
            ? {
                role: 'tabpanel',
                'aria-labelledby': `tab-${c.id}`,
                tabIndex: 0, // painel sem itens focáveis: o Tab entra na lista (padrão APG)
                inert: !on,
                'data-inactive': on ? undefined : '',
                'data-enter': entering === i ? '' : undefined,
              }
            : {};
          return (
            <div
              key={c.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="cat"
              id={`cat-${c.id}`}
              data-panel=""
              {...panelProps}
            >
              <h4 className="cat__name">{c.nome}</h4>
              <ul>
                {c.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

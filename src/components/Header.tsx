import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { menuCelular, nav } from '../content/site';
import { Button } from './Button';
import { CardNav } from './CardNav';
import { GooeyNav } from './GooeyNav';
import { useLiquidGlass } from './LiquidGlass';

/** Pílula de vidro: fixa a partir de 768px. No celular fica sobre a foto do topo e abre em cards (CardNav). */
export function Header() {
  const [active, setActive] = useState<string | null>(null);
  // depois de um clique no menu, a seção ativa fica presa no destino enquanto a rolagem suave passa pelas outras
  const lockRef = useRef(0);
  // vidro líquido (GlassSurface) na pílula: a borda entorta o que passa por trás
  const liquid = useLiquidGlass<HTMLDivElement>({ borderRadius: 30, borderWidth: 0.5, blur: 9, distortionScale: -120 });

  // seção que ocupa o meio da tela
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (performance.now() < lockRef.current) return;
          if (en.isIntersecting) setActive(en.target.id);
          else setActive((cur) => (cur === en.target.id ? null : cur));
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    nav.forEach((n) => {
      const s = document.getElementById(n.href.slice(1));
      if (s) io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  const lockTo = (href: string) => {
    lockRef.current = performance.now() + 1400;
    setActive(href.slice(1));
  };
  const onGooey = (i: number) => lockTo(nav[i].href);
  const activeIndex = nav.findIndex((n) => n.href.slice(1) === active);

  const brand = (
    <a className="brand" href="#inicio" aria-label="Léia Salão, voltar ao início">
      <img src="/img/logo-leia.webp" width={400} height={128} alt="Léia Salão" />
    </a>
  );

  return (
    <header className="site-header">
      <div
        ref={liquid.ref}
        className={liquid.on ? 'wrap site-header__bar liquid-on' : 'wrap site-header__bar'}
        style={liquid.on ? ({ '--liquid': `url(#${liquid.filterId})` } as CSSProperties) : undefined}
      >
        {liquid.defs}
        {brand}
        {/* a partir de 768px: pílula dourada translúcida que acompanha a seção ativa (GooeyNav) */}
        <nav className="nav-desktop" aria-label="Principal">
          <GooeyNav
            items={nav}
            activeIndex={activeIndex}
            onSelect={onGooey}
            color="#B49B3E"
            pillOpacity={0.3}
            shadow={0.12}
            activeTextColor="#F4F1EA"
            hoverColor="rgba(244, 241, 234, 0.08)"
          />
        </nav>
        <Button href="#casas" size="small" className="site-header__cta" specular>
          Agendar
        </Button>
      </div>
      {/* celular: a pílula abre em cards (CardNav) */}
      <div className="wrap header-cards">
        <CardNav logo={brand} items={menuCelular.cards} cta={menuCelular.cta} active={active} onNavigate={lockTo} />
      </div>
    </header>
  );
}

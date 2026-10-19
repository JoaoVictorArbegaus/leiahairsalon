import { useRef, type CSSProperties } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { hero, paris, SR_NOVA_ABA } from '../content/site';
import { Button } from './Button';
import { HouseLinks, useChooser } from './Chooser';
import { CountUp } from './CountUp';
import { Glass } from './Glass';
import { MedalIcon, WhatsAppIcon } from './Icons';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

/** Topo. As entradas daqui são CSS (`data-line`, `data-rise`) para não atrasar o LCP. */
export function Hero() {
  const chooser = useChooser('escolha-topo');
  const [l1, l2, l3] = hero.titulo;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // a foto do salão desce mais devagar que a página (só transform; o vidro do topo continua valendo)
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 150]);

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-titulo" ref={ref}>
      <m.div className="hero__bg" aria-hidden="true" style={{ y: bgY }}>
        <img src={hero.fundo.src} srcSet={hero.fundo.srcSet} sizes="100vw" width={1536} height={1024} alt="" fetchPriority="high" />
      </m.div>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title" id="hero-titulo">
            <span className="line">
              <span data-line="" style={i(0)}>
                {l1}
              </span>
            </span>
            <span className="line">
              <span data-line="" style={i(1)}>
                {l2}
              </span>
            </span>
            <span className="line">
              <span data-line="" style={i(2)}>
                <em>{l3}</em>
              </span>
            </span>
          </h1>

          <div className="hero__body" data-rise="" style={i(2)}>
            <p className="lead">{hero.lead}</p>
            <div className="chooser" {...chooser.rootProps}>
              <div className="chooser__actions">
                <Button href="#casas" specular {...chooser.toggleProps}>
                  <WhatsAppIcon className="icon" />
                  {hero.cta}
                </Button>
                <Button href="#noivas" variant="glass">
                  {hero.ctaNoivas}
                </Button>
              </div>
              <div className="chooser__panel" {...chooser.panelProps}>
                <p className="chooser__label" id="escolha-topo-rotulo">
                  {hero.escolha}
                </p>
                <HouseLinks labelledBy="escolha-topo-rotulo" />
              </div>
            </div>
          </div>

          <ul className="stats" data-rise="" style={i(4)}>
            {hero.numeros.map((n) => (
              <li key={n.href}>
                <Glass as="a" className="stat" tilt={5} href={n.href}>
                  <CountUp value={n.valor} suffix={n.sufixo} label={n.rotulo} />
                </Glass>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <Glass as="figure" className="hero__portrait" data-rise="" style={i(1)}>
            <div className="frame">
              <img src={hero.foto.src} width={hero.foto.w} height={hero.foto.h} alt={hero.foto.alt} />
            </div>
            <figcaption>{hero.foto.legenda}</figcaption>
          </Glass>

          <Glass as="aside" className="paris" tilt={4} glow liquid aria-labelledby="paris-titulo">
            <MedalIcon />
            <h2 className="paris__title" id="paris-titulo">
              {paris.titulo}
            </h2>
            <p className="paris__honor">{paris.honra}</p>
            <p>{paris.texto}</p>
            <p>
              <a className="text-link" href={paris.link.href} target="_blank" rel="noopener">
                {paris.link.texto}
                <span className="sr-only">{SR_NOVA_ABA}</span>
              </a>
            </p>
          </Glass>
        </div>
      </div>
    </section>
  );
}

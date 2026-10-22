import type { CSSProperties } from 'react';
import { barber, casas, casasSecao, especialidades, MSG_AGENDAR, MSG_NOIVAS, noivas, SR_NOVA_ABA, SR_WHATSAPP, servicos, sobre, whatsapp } from '../content/site';
import { BorderGlow } from './BorderGlow';
import { Button } from './Button';
import { SpecIcon } from './Icons';
import { LineWaves } from './LineWaves';
import { m } from 'motion/react';
import { inView, LiftItem, LiftList, Reveal, SplitHeading } from './Motion';
import { PatternWaves } from './PatternWaves';
import { Rail } from './Rail';
import { ServiceTabs } from './ServiceTabs';

type Foto = { src: string; w: number; h: number; alt: string; legenda: string };

/** Foto com degradê e legenda, nunca acima do tamanho natural (--w). Entra ao rolar quando `reveal`. */
function Photo({ foto, className, reveal }: { foto: Foto; className: string; reveal?: number }) {
  const props = { className: `photo ${className}`, style: { '--w': `${foto.w}px` } as CSSProperties };
  const inner = (
    <>
      <img src={foto.src} width={foto.w} height={foto.h} loading="lazy" decoding="async" alt={foto.alt} />
      <figcaption>{foto.legenda}</figcaption>
    </>
  );
  // reveal = ordem da entrada (sobe e sai do desfoque); sem ele, a foto entra junto do mosaico
  return reveal !== undefined ? (
    <m.figure {...props} {...inView(reveal)}>
      {inner}
    </m.figure>
  ) : (
    <figure {...props}>{inner}</figure>
  );
}

/** Título de seção que sobe palavra por palavra de dentro de uma máscara. */
const Title = ({ id, text }: { id: string; text: string }) => <SplitHeading id={id} className="h-section" nodes={[text]} />;

/** Divisa topo → Serviços: cards de vidro, metade sobre a foto e metade sobre o linho. */
export function Seam() {
  return (
    <section className="seam" aria-labelledby="destaques-titulo">
      <div className="wrap">
        <h2 className="sr-only" id="destaques-titulo">
          {especialidades.titulo}
        </h2>
        <LiftList className="specs">
          {especialidades.itens.map((e, i) => (
            <LiftItem key={e.titulo} i={i}>
              <a className={`spec ${e.escuro ? 'spec--dark' : 'spec--glass'} tilt`} data-tilt="6" href={e.href}>
                <BorderGlow />
                <SpecIcon name={e.icone} />
                <h3 className="spec__title">{e.titulo}</h3>
                <p>{e.texto}</p>
                <span className="spec__more">{e.acao}</span>
              </a>
            </LiftItem>
          ))}
        </LiftList>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="services" id="servicos" aria-labelledby="servicos-titulo">
      <PatternWaves preset="silk" color="#6F5F25" opacity={0.24} fade="edges" fadeSize={0.6} />
      <div className="wrap services__grid">
        <div className="services__intro">
          <Title id="servicos-titulo" text={servicos.titulo} />
          <Reveal i={1}>{servicos.texto}</Reveal>
          <Button href="#casas" variant="ink">
            {servicos.cta}
          </Button>
        </div>

        <Photo foto={servicos.foto} className="services__photo" reveal={2} />

        <div className="services__main">
          <ServiceTabs />
        </div>
      </div>
    </section>
  );
}

export function Brides() {
  const [a, b, c] = noivas.fotos;
  return (
    <section className="brides" id="noivas" aria-labelledby="noivas-titulo">
      <div className="wrap brides__grid">
        <div className="brides__copy">
          <Title id="noivas-titulo" text={noivas.titulo} />
          <Reveal as="div" className="brides__text" i={1}>
            <p className="lead">{noivas.lead}</p>
            <p>{noivas.texto}</p>
          </Reveal>
          <Reveal as="div" className="brides__cta" i={2}>
            <p className="brides__cta-label" id="noivas-orcamento">
              {noivas.orcamento}
            </p>
            <ul className="city-links" aria-labelledby="noivas-orcamento">
              {casas.map((casa) => (
                <li key={casa.id}>
                  <Button href={whatsapp(casa.whatsapp.numero, MSG_NOIVAS)} variant="glass" external srText={SR_WHATSAPP}>
                    {casa.cidade}
                  </Button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal as="div" className="mosaic mosaic--brides" i={1}>
          <Photo foto={a} className="mosaic__a" />
          <Photo foto={b} className="mosaic__b" />
          <Photo foto={c} className="mosaic__c" />
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  const [a, b] = sobre.fotos;
  return (
    <section className="about" id="sobre" aria-labelledby="sobre-titulo">
      <div className="wrap about__grid">
        <div className="about__copy tilt" data-tilt="2">
          <BorderGlow />
          <Title id="sobre-titulo" text={sobre.titulo} />
          <Reveal as="div" className="about__text" i={1}>
            <p className="lead">{sobre.lead}</p>
            {sobre.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
        <Reveal as="div" className="mosaic mosaic--about" i={1}>
          <Photo foto={a} className="mosaic__a" />
          <Photo foto={b} className="mosaic__b" />
        </Reveal>
      </div>
    </section>
  );
}

export function Houses() {
  return (
    <section className="houses" id="casas" aria-labelledby="casas-titulo">
      <LineWaves color1="#B49B3E" color2="#C9B566" color3="#6F5F25" brightness={0.08} speed={0.2} rotation={-24} innerLineCount={24} outerLineCount={28} />
      <div className="wrap houses__head">
        <Title id="casas-titulo" text={casasSecao.titulo} />
        <Reveal className="lead" i={1}>
          {casasSecao.lead}
        </Reveal>
      </div>

      <div className="wrap">
        <Rail className="houses__grid" label="Casas">
        {casas.map((c, i) => {
          const wa = whatsapp(c.whatsapp.numero, MSG_AGENDAR);
          return (
            <LiftItem key={c.id} i={i}>
            <article className="house" id={`casa-${c.id}`} aria-labelledby={`casa-${c.id}-titulo`}>
              <figure className="photo house__photo" style={{ '--w': `${c.foto.w}px` } as CSSProperties}>
                <img src={c.foto.src} width={c.foto.w} height={c.foto.h} loading="lazy" decoding="async" alt={c.foto.alt} />
                <figcaption>{c.regiao}</figcaption>
              </figure>
              <h3 className="house__city" id={`casa-${c.id}-titulo`}>
                {c.cidade}
              </h3>
              <dl className="house__rows">
                <div>
                  <dt>Endereço</dt>
                  <dd>
                    <address>{c.endereco}</address>
                  </dd>
                </div>
                <div>
                  <dt>Telefone</dt>
                  <dd>
                    <a href={`tel:${c.telefone.tel}`}>{c.telefone.texto}</a>
                  </dd>
                </div>
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a href={wa} target="_blank" rel="noopener">
                      {c.whatsapp.texto}
                      <span className="sr-only">{SR_WHATSAPP}</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Mapa</dt>
                  <dd>
                    <a href={c.mapa} target="_blank" rel="noopener">
                      Abrir no Google Maps
                      <span className="sr-only">{SR_NOVA_ABA}</span>
                    </a>
                  </dd>
                </div>
              </dl>
              <Button href={wa} className="house__cta" target="_blank" rel="noopener">
                Agendar em {c.cidade}
                <span className="sr-only">{SR_WHATSAPP}</span>
                {/* o espaço final vira um item do flex e soma o gap (+0,6rem de largura), como no HTML original */}{' '}
              </Button>
              {c.id === 'lages' && (
                <details className="barber">
                  <summary>{barber.resumo}</summary>
                  <p>{barber.texto}</p>
                  <p>
                    Telefones: <a href={`tel:${barber.telefones[0].tel}`}>{barber.telefones[0].texto}</a> e{' '}
                    <a href={`tel:${barber.telefones[1].tel}`}>{barber.telefones[1].texto}</a>
                  </p>
                </details>
              )}
            </article>
            </LiftItem>
          );
        })}
        </Rail>
      </div>
    </section>
  );
}

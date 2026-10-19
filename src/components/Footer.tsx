import { useEffect, useState } from 'react';
import { casas, flutuante, MSG_AGENDAR, rodape, SR_WHATSAPP, whatsapp } from '../content/site';
import { HouseLinks, useChooser } from './Chooser';
import { Glass } from './Glass';
import { WhatsAppIcon } from './Icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__mark">
        <img src="/img/logo-leia-grande.webp" width={1105} height={354} loading="lazy" decoding="async" alt="Léia Salão" />
        <p className="site-footer__tag">{rodape.frase}</p>
      </div>
      <div className="wrap site-footer__cols">
        <div>
          <h2 className="foot-title">Casas</h2>
          <ul>
            {casas.map((c) => (
              <li key={c.id}>
                {c.cidade}: {c.enderecoCurto}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="foot-title">WhatsApp</h2>
          <ul>
            {casas.map((c) => (
              <li key={c.id}>
                <a href={whatsapp(c.whatsapp.numero, MSG_AGENDAR)} target="_blank" rel="noopener">
                  {c.cidade} <span className="tel-nowrap">{c.whatsapp.texto}</span>
                  <span className="sr-only">{SR_WHATSAPP}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="foot-title">Navegue</h2>
          <ul>
            {rodape.navegue.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="foot-title">Redes</h2>
          <ul>
            {rodape.redes.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noopener">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap">
        <p className="legal">{rodape.legal}</p>
      </div>
    </footer>
  );
}

/** Botão flutuante de WhatsApp: some enquanto o botão de agendar do topo está na tela. */
export function WhatsAppFloat() {
  const chooser = useChooser('escolha-flutuante', { focusFirstOnKeyboard: true });
  const [hidden, setHidden] = useState(false);
  const { close } = chooser;

  useEffect(() => {
    const heroActions = document.querySelector('.hero .chooser');
    if (!heroActions || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([en]) => setHidden(en.isIntersecting));
    io.observe(heroActions);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (hidden) close();
  }, [hidden, close]);

  return (
    <div className={hidden ? 'wa-float is-hidden' : 'wa-float'} inert={hidden} {...chooser.rootProps}>
      <Glass tone="strong" className="wa-float__panel chooser__panel" {...chooser.panelProps}>
        <p className="chooser__label" id="escolha-flutuante-rotulo">
          {flutuante.rotulo}
        </p>
        <HouseLinks labelledBy="escolha-flutuante-rotulo" />
      </Glass>
      <a className="wa-float__btn" href="#casas" aria-label={flutuante.aria} {...chooser.toggleProps}>
        <WhatsAppIcon />
      </a>
    </div>
  );
}

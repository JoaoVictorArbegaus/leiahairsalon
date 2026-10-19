// Léia Salão - interações leves. Sem JS a página funciona: links levam à seção Casas,
// e as casas e as categorias de serviços aparecem empilhadas.
(() => {
  'use strict';

  /* Escolha de casa (topo e botão flutuante): botão abre/fecha a lista de WhatsApps */
  const choosers = [...document.querySelectorAll('[data-chooser]')];
  const closeChooser = (c, focusToggle) => {
    const t = c.querySelector('[data-chooser-toggle]');
    const p = c.querySelector('[data-chooser-panel]');
    if (!t || !p) return;
    p.setAttribute('data-closed', '');
    t.setAttribute('aria-expanded', 'false');
    if (focusToggle) t.focus();
  };
  choosers.forEach((c) => {
    const t = c.querySelector('[data-chooser-toggle]');
    const p = c.querySelector('[data-chooser-panel]');
    if (!t || !p) return;
    t.setAttribute('role', 'button');
    t.setAttribute('aria-expanded', 'false');
    p.setAttribute('data-closed', '');
    t.addEventListener('click', (e) => {
      e.preventDefault();
      const open = t.getAttribute('aria-expanded') === 'true';
      choosers.forEach((o) => o !== c && closeChooser(o));
      if (open) { closeChooser(c); return; }
      p.removeAttribute('data-closed');
      t.setAttribute('aria-expanded', 'true');
      const first = p.querySelector('a');
      // foco no primeiro link só quando aberto pelo teclado (no mouse o anel parecia uma pré-seleção)
      if (first && c.hasAttribute('data-float') && e.detail === 0) first.focus();
    });
    // Espaço também ativa (papel de botão)
    t.addEventListener('keydown', (e) => { if (e.key === ' ') { e.preventDefault(); t.click(); } });
    c.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && t.getAttribute('aria-expanded') === 'true') closeChooser(c, true);
    });
  });
  document.addEventListener('click', (e) => {
    choosers.forEach((c) => { if (!c.contains(e.target)) closeChooser(c); });
  });

  /* Botão flutuante: some enquanto o topo (que já tem o botão de agendar) está na tela */
  const float = document.querySelector('[data-float]');
  const heroActions = document.querySelector('.hero .chooser');
  if (float && heroActions && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      const hide = entry.isIntersecting;
      float.classList.toggle('is-hidden', hide);
      if (hide) { closeChooser(float); float.setAttribute('inert', ''); } else { float.removeAttribute('inert'); }
    }).observe(heroActions);
  }

  /* Cabeçalho fixo: sabe se está sobre uma seção clara (linho) para engrossar o vidro */
  const header = document.querySelector('.site-header');
  const light = [...document.querySelectorAll('.services, .about')];
  if (header && light.length && 'IntersectionObserver' in window) {
    // faixa observada: só o topo da janela, onde a pílula fica
    const over = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? over.add(en.target) : over.delete(en.target)));
      if (over.size) header.setAttribute('data-surface', 'light');
      else header.removeAttribute('data-surface');
    }, { rootMargin: '0px 0px -92% 0px' });
    light.forEach((el) => io.observe(el));
  }

  /* Abas com troca em crossfade (Casas e categorias de Serviços) */
  document.querySelectorAll('[data-tabs]').forEach((tablist) => {
    const stage = tablist.parentElement.querySelector('[data-stage]');
    if (!stage) return;
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    tablist.hidden = false;
    // trilho que rola no celular: tira o esmaecimento da borda quando chega ao fim
    const edge = () => tablist.classList.toggle('is-end', tablist.scrollLeft + tablist.clientWidth >= tablist.scrollWidth - 2);
    tablist.addEventListener('scroll', edge, { passive: true });
    edge();
    stage.classList.add('is-tabbed');
    panels.forEach((p, i) => {
      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', tabs[i].id);
      p.setAttribute('tabindex', '0'); // painel sem itens focáveis: o Tab entra na lista (padrão APG)
    });

    // pílula ativa que desliza até a aba escolhida
    const pill = document.createElement('span');
    pill.className = 'cats__pill';
    pill.setAttribute('aria-hidden', 'true');
    tablist.prepend(pill);
    tablist.classList.add('has-pill');
    let current = 0;
    const place = () => {
      const t = tabs[current];
      pill.style.setProperty('--px', t.offsetLeft + 'px');
      pill.style.setProperty('--py', t.offsetTop + 'px');
      pill.style.setProperty('--pw', t.offsetWidth + 'px');
      pill.style.setProperty('--ph', t.offsetHeight + 'px');
    };
    // o palco acompanha a altura do painel ativo (transição em CSS): sem salto e sem vazio sob listas curtas
    const fit = () => { stage.style.height = panels[current].offsetHeight + 'px'; };
    if ('ResizeObserver' in window) {
      new ResizeObserver(place).observe(tablist);
      const ro = new ResizeObserver(fit);
      panels.forEach((p) => ro.observe(p));
    }

    const select = (i, focus, first) => {
      const dir = i >= current ? 1 : -1;
      stage.style.setProperty('--dir', String(dir));
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const p = panels[j];
        if (on) {
          // entra pelo lado da aba escolhida: posiciona sem transição e solta no próximo quadro
          if (!first && p.hasAttribute('data-inactive')) { p.setAttribute('data-enter', ''); void p.offsetWidth; }
          p.removeAttribute('data-inactive'); p.removeAttribute('inert');
          requestAnimationFrame(() => p.removeAttribute('data-enter'));
        } else { p.setAttribute('data-inactive', ''); p.setAttribute('inert', ''); }
      });
      current = i;
      place();
      fit();
      // mantém a aba visível no trilho que rola (celular)
      if (!first) tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      // carrega as fotos da casa escolhida imediatamente
      panels[i].querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        let n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') n = 0;
        if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); select(n, true); }
      });
    });
    select(0, false, true);
    // só depois da primeira posição a pílula passa a deslizar; fontes web mudam a largura das abas
    requestAnimationFrame(() => tablist.classList.add('is-ready'));
    if (document.fonts) document.fonts.ready.then(place);
  });

  /* Números do topo: contagem ao entrar na tela e brilho que segue o cursor */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.stat').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    card.addEventListener('pointerleave', () => { card.style.removeProperty('--mx'); card.style.removeProperty('--my'); });
  });
  const counters = [...document.querySelectorAll('[data-count]')];
  if (!reduce && counters.length && 'IntersectionObserver' in window) {
    const run = (el) => {
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const final = el.textContent;
      el.style.minWidth = el.offsetWidth + 'px'; // sem tremer a largura durante a contagem
      el.setAttribute('aria-hidden', 'true');
      const label = el.parentElement;
      label.setAttribute('aria-label', final + ' ' + label.querySelector('.stat__label').textContent);
      const t0 = performance.now();
      const dur = end > 9 ? 1400 : 900;
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(end * eased) + (k === 1 ? suffix : '');
        if (k < 1) requestAnimationFrame(step);
        else { el.textContent = final; el.removeAttribute('aria-hidden'); label.removeAttribute('aria-label'); }
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { cio.unobserve(en.target); setTimeout(() => run(en.target), 450); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }

  /* Revelação ao rolar (uma vez) */
  const targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
  } else {
    // escalonamento dentro de cada seção
    document.querySelectorAll('section').forEach((sec) => {
      sec.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--d', String(Math.min(i, 6))));
    });
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    targets.forEach((el) => io.observe(el));
    // impressão e leitores que não rolam a página: mostra tudo
    window.addEventListener('beforeprint', () => targets.forEach((el) => el.classList.add('is-in')));
    window.addEventListener('load', () => setTimeout(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    }, 2500));
  }
})();

import type { ReactNode } from 'react';
import type { Especialidade } from '../content/site';

/** Sprite com o ícone de WhatsApp, usado por <WhatsAppIcon />. Renderizado uma vez no App. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <symbol id="i-whatsapp" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.69C5.78.69.68 5.79.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.65l6.04-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.27 0 11.37-5.1 11.38-11.37 0-3.04-1.18-5.9-3.33-8.04"
        />
      </symbol>
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <use href="#i-whatsapp" />
    </svg>
  );
}

/** Medalha do card de Paris. */
export function MedalIcon() {
  return (
    <svg className="paris__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="28" height="28">
      <path d="M8.2 2.5h7.6L13.6 9M10.4 9 8.2 2.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="12" cy="15.25" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="m12 12.2.95 1.95 2.15.3-1.55 1.5.37 2.13L12 17.06l-1.92 1.02.37-2.13-1.55-1.5 2.15-.3z" fill="currentColor" />
    </svg>
  );
}

const SPEC_PATHS: Record<Especialidade['icone'], ReactNode> = {
  mechas: <path d="M9 3c-2 4 2 7 0 11s1 6 3 7M13 3c-2 4 2 7 0 11s1 6 3 7" />,
  coloracao: (
    <>
      <path d="M12 3.5c3 4 5.5 7 5.5 10a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-10z" />
      <path d="M9.3 14.5a2.8 2.8 0 0 0 2.7 2.6" />
    </>
  ),
  tratamentos: (
    <>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" />
      <path d="M5 19 13 11" />
    </>
  ),
  noivas: (
    <>
      <circle cx="12" cy="15" r="5.5" />
      <path d="m9.5 6.5 2.5-3 2.5 3-2.5 3z" />
    </>
  ),
};

/** Ícone de traço fino dos cards de especialidade, num círculo. */
export function SpecIcon({ name }: { name: Especialidade['icone'] }) {
  return (
    <span className="spec__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {SPEC_PATHS[name]}
      </svg>
    </span>
  );
}

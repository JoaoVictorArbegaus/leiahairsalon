import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { casas, MSG_AGENDAR, SR_WHATSAPP, whatsapp } from '../content/site';

const OPEN_EVENT = 'chooser:open';

/**
 * Botão que abre a lista de WhatsApps das casas (topo e botão flutuante).
 * Sem JS o botão é um link para #casas e a lista fica visível (CSS: `.js .chooser__panel[data-closed]`).
 */
export function useChooser(id: string, { focusFirstOnKeyboard = false } = {}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    // abrir uma escolha fecha a outra; clicar fora fecha
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) setOpen(false);
    };
    const onDoc = (e: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener(OPEN_EVENT, onOther);
    document.addEventListener('click', onDoc);
    return () => {
      document.removeEventListener(OPEN_EVENT, onOther);
      document.removeEventListener('click', onDoc);
    };
  }, [id]);

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // as âncoras do Lenis (no window) ignoram preventDefault e rolariam até #casas: o clique para aqui
    e.stopPropagation();
    if (open) {
      setOpen(false);
      return;
    }
    document.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
    setOpen(true);
    // foco no primeiro link só quando aberto pelo teclado (no mouse o anel parecia uma pré-seleção)
    if (focusFirstOnKeyboard && e.detail === 0) requestAnimationFrame(() => panelRef.current?.querySelector('a')?.focus());
  };
  // papel de botão: Espaço também ativa
  const onKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  };
  const onRootKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
  };

  return {
    open,
    close,
    rootProps: { ref: rootRef, onKeyDown: onRootKeyDown },
    toggleProps: { ref: toggleRef, role: 'button', 'aria-expanded': open, 'aria-controls': id, onClick, onKeyDown },
    panelProps: { ref: panelRef, id, 'data-closed': open ? undefined : '' },
  };
}

/** Lista com o WhatsApp de cada casa e a mensagem de agendamento. */
export function HouseLinks({ labelledBy }: { labelledBy: string }) {
  return (
    <ul className="chooser__list" aria-labelledby={labelledBy}>
      {casas.map((c) => (
        <li key={c.id}>
          <a href={whatsapp(c.whatsapp.numero, MSG_AGENDAR)} target="_blank" rel="noopener">
            {c.cidade}
            <span className="sr-only">{SR_WHATSAPP}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

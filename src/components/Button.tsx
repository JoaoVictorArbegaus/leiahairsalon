import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { SR_NOVA_ABA } from '../content/site';
import { SpecularLight } from './SpecularLight';

type Props = ComponentPropsWithoutRef<'a'> & {
  href: string;
  /** `gold`: ação principal (sólido); `ink`: escuro sobre linho; `glass`: secundário de vidro. */
  variant?: 'gold' | 'ink' | 'glass';
  size?: 'md' | 'small';
  /** Abre em nova aba com rel="noopener". `srText` substitui o aviso padrão para leitores de tela. */
  external?: boolean;
  srText?: string;
  /** Reflexo especular que corre pela borda e segue o cursor (SpecularButton; só com mouse). */
  specular?: boolean;
};

export const Button = forwardRef<HTMLAnchorElement, Props>(function Button(
  { href, variant = 'gold', size = 'md', external = false, srText, specular = false, className, children, ...rest },
  ref,
) {
  const classes = ['btn', `btn--${variant}`, variant === 'glass' && 'glass', size === 'small' && 'btn--small', specular && 'btn-specular', className]
    .filter(Boolean)
    .join(' ');
  return (
    <a ref={ref} className={classes} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
      {specular ? (
        <>
          {/* luz quente sobre o dourado, contorno base em ouro escuro */}
          <SpecularLight lineColor={[1, 0.97, 0.86]} baseColor={[0.44, 0.37, 0.15]} />
          <span className="specular__label">{children}</span>
        </>
      ) : (
        children
      )}
      {external && <span className="sr-only">{srText ?? SR_NOVA_ABA}</span>}
    </a>
  );
});

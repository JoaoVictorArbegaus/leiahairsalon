import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from 'react';
import { BorderGlow } from './BorderGlow';
import { useLiquidGlass } from './LiquidGlass';

type Props<T extends ElementType> = {
  as?: T;
  /** `default`: tinta grafite (números, botões); `strong`: mais densa (trilho de abas, painel flutuante). */
  tone?: 'default' | 'strong';
  /** Responde ao mouse: brilho que segue o cursor e inclinação de até `tilt` graus (ver useLandingEffects). */
  tilt?: number;
  /** Borda luminosa dourada que acende perto da borda, na direção do cursor (BorderGlow). */
  glow?: boolean;
  /** Vidro líquido: refração e aberração cromática nas bordas (GlassSurface; só Chromium). */
  liquid?: boolean;
} & Omit<ComponentPropsWithRef<T>, 'as'>;

const classes = (tone: string, tilt: number | undefined, className?: string, extra?: string) =>
  [className, 'glass', tone === 'strong' && 'glass--strong', tilt !== undefined && 'tilt', extra].filter(Boolean).join(' ');

/** Superfície de vidro: desfoque, reflexo diagonal, borda clara e brilho interno (classe `.glass` em landing.css). */
export function Glass<T extends ElementType = 'div'>({ as, tone = 'default', tilt, glow = false, liquid = false, className, children, ...rest }: Props<T>) {
  if (liquid) {
    return (
      <LiquidGlassTag as={as} tone={tone} tilt={tilt} glow={glow} className={className} rest={rest}>
        {children}
      </LiquidGlassTag>
    );
  }
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag className={classes(tone, tilt, className)} {...(tilt !== undefined ? { 'data-tilt': tilt } : {})} {...rest}>
      {glow && <BorderGlow />}
      {children}
    </Tag>
  );
}

function LiquidGlassTag({
  as,
  tone,
  tilt,
  glow,
  className,
  rest,
  children,
}: {
  as?: ElementType;
  tone: string;
  tilt?: number;
  glow: boolean;
  className?: string;
  rest: Record<string, unknown>;
  children?: ReactNode;
}) {
  const Tag = (as ?? 'div') as ElementType;
  const liquid = useLiquidGlass<HTMLElement>({ borderRadius: 16 });
  // o filtro só entra no backdrop-filter depois de montar e no Chromium (classe .liquid-on + --liquid)
  const style = liquid.on ? ({ ...(rest.style as CSSProperties), '--liquid': `url(#${liquid.filterId})` } as CSSProperties) : (rest.style as CSSProperties);
  return (
    <Tag
      ref={liquid.ref}
      className={classes(tone, tilt, className, liquid.on ? 'liquid-on' : undefined)}
      {...(tilt !== undefined ? { 'data-tilt': tilt } : {})}
      {...rest}
      style={style}
    >
      {liquid.defs}
      {glow && <BorderGlow />}
      {children}
    </Tag>
  );
}

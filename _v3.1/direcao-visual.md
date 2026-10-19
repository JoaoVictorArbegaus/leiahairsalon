# Direção visual - Léia Salão (v3.1-glass)

Contrato visual de `clientes/leia-salao-glass/`. Revisão de 13/10/2026 sobre a v3-glass, a pedido do cliente. Mantém conteúdo, estrutura de seções, SEO e links de WhatsApp. Acrescenta luz ambiente intencional, vidro perceptível, microinterações nos números e nas abas, e acerta listas e botões. A página `clientes/leia-salao/` (v2) fica intacta. Este documento substitui por completo as versões anteriores; não há regras antigas em vigor fora dele.

## Direção

**"Grafite e ouro, editorial, com vidro pontual."** Minimalismo editorial quente: fundo grafite com fotos em molduras retrato, alternando com blocos em linho. O dourado aparece pouco e sempre com função. O vidro é um acabamento de superfície em seis elementos, nunca o estilo da página inteira. **Todo vidro tem algo colorido ou texturizado atrás** (luz ambiente, foto ou faixa de luz), senão o blur não aparece.

## Paleta

| Token | Hex | Papel |
|---|---|---|
| `--ink` | `#1E1D1B` | Fundo escuro principal; texto sobre linho |
| `--ink-2` / `--ink-3` | `#2B2A27` / `#262421` | Degraus de tom sobre o escuro |
| `--graphite` | `#3B3B3B` | Corpo sobre linho |
| `--linen` / `--linen-2` | `#EFE9DF` / `#E8E1D4` | Fundos claros (Serviços, Sobre) |
| `--paper` | `#F4F1EA` | Texto claro; pílula ativa das abas |
| `--gold` | `#B49B3E` | Acento: botão principal (texto `--ink`), números, filetes, links e bordas acesas no vidro |
| `--gold-hover` | `#C9B566` | Hover do dourado |
| `--gold-deep` | `#6F5F25` | Dourado para texto sobre linho; contorno de foco na aba ativa |
| `--muted-dark` | `#B8B2A6` | Secundário sobre escuro sólido |
| texto secundário no vidro | `#D2CCC0` | Secundário dentro de vidro |

Vidro:

| Token / regra | Valor | Uso |
|---|---|---|
| `--glass-tint` | `rgba(34,32,29,.56)` | Botões secundários, números, pílula do celular |
| `--glass-tint-strong` | `rgba(30,29,27,.74)` | Pílula fixa, trilho de abas, painel flutuante |
| Card de Paris | `rgba(30,29,27,.40)` + `blur(18px) saturate(140%)` + degradê escuro vertical (0 sob o ícone, até .44 sob os parágrafos) | Vidro aberto: a foto aparece através; o degradê fica só onde há texto |
| pílula sobre linho | `rgba(30,29,27,.86)` | Cabeçalho fixo sobre Serviços/Sobre (`data-surface="light"`) |
| `--glass-sheen` | degradê 145°, branco 10% → 0 | Reflexo diagonal |
| `--glass-border` | `rgba(244,241,234,.17)` | Borda fina clara (1px) |
| `--glass-shadow` | brilho interno 1px no topo + sombra longa difusa | Brilho interno e profundidade |
| `--glass-blur` | `blur(14px) saturate(135%)` | Blur moderado |
| `--glass-solid` | `#2A2825` | Fallback sem `backdrop-filter` e com `prefers-reduced-transparency` |
| `--radius-glass` | `16px` | Cards de vidro |

Proibido: `#B49B3E` como texto sobre linho (2,26:1) e texto branco sobre botão dourado (2,73:1).

### Contraste medido (pior pixel de fundo sob o texto, screenshots reais da v3.1)

| Elemento | Texto | Desktop | Celular |
|---|---|---|---|
| Pílula do topo sobre o topo / sobre linho | `#F4F1EA` | 12,18 / 8,75:1 | 9,61:1 (não fixa) |
| Botão "Orçamento para noivas" | `#F4F1EA` | 9,87:1 | 9,33:1 |
| Números 40+ / 3 (rótulos) | `#D2CCC0` | 8,26:1 | 8,24:1 |
| Card de Paris: texto / link dourado | `#D2CCC0` / `#B49B3E` | 6,67 / 5,41:1 | 9,14 / 5,76:1 |
| Abas: inativas / ativa | `#F4F1EA` / `#1E1D1B` | 5,07 / 12,79:1 | 12,79:1 (ativa) |
| Botões por cidade (Noivas) | `#F4F1EA` | 5,70:1 | 6,02:1 |
| Painel flutuante sobre linho | `#F4F1EA` | 5,72:1 | 5,91:1 |

Todos AA. Pares sólidos: `#F4F1EA`/`#1E1D1B` 14,93:1; `#B8B2A6`/`#1E1D1B` 7,99:1; `#B49B3E`/`#1E1D1B` 6,17:1; `#3B3B3B`/`#EFE9DF` 9,28:1; `#6F5F25`/`#E8E1D4` 4,84:1.

## Tipografia

- **Família única:** Sora (Google Fonts, `wght` 300-700, `display=swap`), fallback `system-ui, "Segoe UI", Roboto, Arial, sans-serif`.
- **Pesos:** 300 (h1, títulos de seção, números, Paris), 400 (corpo), 600 (títulos de bloco, botões, abas).
- **Escala:** `--step-small` 14-15px, `--step-body` 16-17px, `--step-lead` 18-22px, `--step-head` 30-48px, `--step-display` 34-64px (h1 ≤ 64px; medido 62,4px em 1440).
- Números com `font-variant-numeric: tabular-nums` (a contagem não faz a largura tremer).

## Estilo

### Base

- Fotos em molduras retrato, grades e cards, **nunca acima do tamanho natural**.
- Profundidade: filete dourado de 3rem acima dos títulos, moldura dourada deslocada na foto da Léia, degradê grafite e legenda sobre as fotos.
- Hover marcado: cards de serviço sobem 6px com borda dourada; foto aproxima 6%; botão dourado sobe 2px.
- Cantos: fotos e cards sólidos 6px; botões e pílulas raio total; vidro 16px.
- Ícones só em SVG inline. **Nenhum emoji.** O ícone de WhatsApp aparece **só** no botão principal do topo e no botão flutuante.

### Luz ambiente (o que o vidro refrata)

| Onde | Como |
|---|---|
| Topo | `.hero__light` com três manchas grandes e muito suaves: grafite clara (34%) atrás do título e dos botões, dourada (30%) atrás da foto da Léia, dourada baixa e larga (30%) sob os números. Deriva lenta: 26s, 30s e 22s, `alternate`. Paradas com `prefers-reduced-motion`. Sem manchas pequenas soltas. |
| Abas de Serviços | Uma faixa de luz dentro da coluna: dourada à esquerda, grafite clara à direita, atrás do trilho, sem vazar para o linho ao lado. |
| Noivas | Luz dourada larga centrada atrás dos três botões por cidade. |
| Pílula fixa | Refrata o conteúdo que rola por baixo (fotos, cards); sobre linho fica mais densa. |
| Cabeçalho do celular | Manchas grafite e dourada no fundo do próprio cabeçalho. |

### Vidro: os seis elementos

| Elemento | Tratamento | Hover e foco |
|---|---|---|
| Menu do topo | ≥ 768px: barra inteira em pílula fixa. Celular: a lista de links é a pílula | Links com sublinhado dourado; contorno de foco dourado |
| Card de Paris | Vidro aberto (40%, blur 18px) sobreposto ao canto da foto; filete dourado de 2px no topo. No celular sobe 9rem sobre a foto | Borda acende em dourado no hover e quando o link interno tem foco |
| Números 40+ e 3 | Links (40+ → Sobre, 3 → Casas). Contagem ao entrar na tela (40 em 1,4s, 3 em 0,9s, desaceleração cúbica). Sem contagem com movimento reduzido | Sobe 4px, borda dourada acende e brilho dourado segue o cursor (só mouse). No foco: o mesmo, com o brilho centrado. No toque, só a contagem |
| Botões secundários | "Orçamento para noivas" e os três por cidade em Noivas (grade de 3 colunas iguais a partir de 600px; empilhados no celular) | Borda dourada e fundo mais claro; no foco, a borda acende junto do contorno |
| Abas de categorias | Trilho de vidro escuro na largura da coluna; **pílula ativa desliza** (transform + width, 300ms, ease suave) | Inativas: texto dourado claro e borda suave; foco com contorno interno (dourado escuro sobre a pílula, dourado sobre o vidro) |
| Painel do WhatsApp flutuante | Vidro escuro com links em pílulas translúcidas | Links ficam dourados; foco no primeiro link só quando aberto pelo teclado |

- **Botão principal "Agendar pelo WhatsApp" é sólido dourado**, como o "Agendar" do cabeçalho, os "Agendar em X" das casas e o botão flutuante.
- **Contagem por tela (1440x900):** topo 5, Serviços 2, Noivas 4, demais 1. No celular, no máximo 4.
- **Fallback:** `@supports not (backdrop-filter)` e `prefers-reduced-transparency` trocam o vidro por `#2A2825` sólido. Em `forced-colors`, a pílula deslizante some e a aba ativa usa `Highlight`.

### Serviços: troca de aba e listas

- O conteúdo troca com **slide + fade na direção da aba escolhida** (1,25rem, 480ms; o painel que sai vai para o lado oposto). O palco anima a altura até a do painel ativo (480ms), sem salto e sem vazio abaixo de listas curtas. O recorte é só vertical (`clip-path: inset(0 -3rem)`), então o texto não é cortado durante o slide.
- Teclado: setas, Home e End trocam e focam a aba (tabindex móvel); painéis com `tabindex="0"`, inativos com `inert`.
- **Listas em CSS columns:** 2 colunas balanceadas a partir de 768px (`break-inside: avoid`), espaçamento vertical constante de 0,55rem, alinhadas ao topo. No celular, 1 coluna.

### Referências (`referencias/`, 3 imagens): aproveitado e deixado de fora

Aproveitado (traços recorrentes):
- Pílula translúcida de navegação com o botão de ação sólido no fim.
- Cards foscos sobrepostos a uma transição foto → fundo, com borda fina clara, cantos de 14-20px e sombra longa e difusa (Paris, números).
- Card pequeno de número em vidro sobre a imagem (40+ e 3, só números reais).
- Blur moderado e tinta neutra quente.

Deixado de fora:
- Vidro claro e leitoso: trocado por grafite tingido (paleta do cliente e contraste sobre linho).
- Tipografia serifada e letras recortadas: a Sora continua única.
- Paleta bege/bronze, layouts em cascata, foto em tela cheia no topo, vídeo, avatares, textos e números das referências.

## Estrutura de seções (desktop ≥ 1024px; cada uma cabe em 1440x900)

| # | Seção | Altura medida | Layout |
|---|---|---|---|
| 0 | Cabeçalho | 76px (fixo) | Pílula de vidro: logo, Serviços, Noivas, Sobre, Casas, "Agendar" dourado |
| 1 | Topo `#inicio` | 900px | 7/12 texto (h1, apoio, "Agendar pelo WhatsApp" + "Orçamento para noivas", números) e 5/12 foto da Léia com card de Paris |
| 2 | Serviços `#servicos` | 864px (aba Cabelo) | Esquerda: título, apoio, CTA, foto. Direita: 4 cards 2x2 e abas com listas em 2 colunas |
| 3 | Noivas & Noivos `#noivas` | 803px | 6/12 texto e grade de 3 botões; 6/12 grade de 3 fotos |
| 4 | Sobre `#sobre` | 763px | Texto e grade `equipe` + `lages-recepcao` |
| 5 | Casas `#casas` | 893px | 3 casas lado a lado; "Agendar em X" sem ícone |
| 6 | Rodapé | 518px | Logo com 80px, frase, colunas |
| - | WhatsApp flutuante | - | Botão dourado com ícone; painel de vidro com as 3 casas |

## Movimento

Entrada do h1 linha a linha, `data-rise` no topo, `data-reveal` ao rolar, `settle` na foto da Léia, deriva da luz ambiente, contagem dos números, pílula deslizante, slide das listas e `pop` do painel flutuante. Tudo desligado com `prefers-reduced-motion` (verificado: nenhuma animação rodando e números já no valor final).

## Fontes do conteúdo

- **Briefing (`briefing.md`)**: todo o texto, serviços, endereços, telefones, links e fotos. Nenhum texto de marketing novo.
- **Texto acessível novo** (não visível): "(WhatsApp, abre em nova aba)" em todos os links de WhatsApp, para leitores de tela.
- **Estilo desejado e pedidos do cliente**: elementos de vidro, botão principal sólido, paleta, Sora e os ajustes da v3.1.
- **Referências**: só linguagem visual do vidro.

## Acabamento

### v3.1: critique de 13/10/2026

Duas avaliações isoladas (A: revisão de design; B: detector e navegador). **Nota 24/32** (75%, "Good"; heurísticas 7 e 10 n/a). Aplicado depois (polish, harden, adapt, animate):

| Achado | Mudança |
|---|---|
| P1: números e botão de vidro do topo sobre grafite chapado | A mancha dourada baixa da luz ambiente passa sob os números; a grafite se estende até os botões |
| P1: aba ativa invisível em alto contraste | `forced-colors`: aba ativa com `Highlight`/`HighlightText` |
| P2: Paris no celular quase todo sobre fundo liso | Sobe 9rem sobre a foto |
| P2: luz de Noivas abaixo dos botões; saídas para o WhatsApp sem aviso | Luz centrada atrás dos botões; "(WhatsApp, abre em nova aba)" em `sr-only` nos 18 links |
| P3: slide cortava o texto; durações diferentes | Recorte só vertical, deslocamento de 1,25rem, altura e slide com 480ms |
| APG | Painéis das abas com `tabindex="0"` |

Verificação visual que levou a correções antes da critique: o degradê atrás do texto de Paris formava faixas retangulares (virou um degradê vertical único); o palco das abas deixava cerca de 200px vazios no celular (passou a animar a altura); a faixa de luz das abas vazava à direita do trilho (o trilho passou a ocupar a coluna inteira).

Falsos positivos do detector: legendas sobre fotos medidas contra o fundo da seção; "cramped-padding" em seções de fundo total e nas linhas com filete das casas; dourado 4,3:1 no h1 "com propósito" (texto grande, exige 3:1). O "radial-spotlight-glow" nas três manchas do topo é a luz ambiente pedida pelo cliente.

### Não aplicado

- **Contagem no "3"**: a avaliação A achou de pouco valor, mas o cliente pediu contagem nos dois números.
- **Números como cards não interativos**: a avaliação A sugeriu, mas o pedido exige foco visível neles; viraram links com destino real (Sobre e Casas), não elementos focáveis sem função.
- **Unificar os caminhos de agendamento** (cabeçalho → Casas, topo → escolha inline, flutuante → painel): mudaria o comportamento dos CTAs de WhatsApp, que o pedido manda manter.
- **Vidro sobre as fotos de Noivas**: fora dos seis elementos autorizados.

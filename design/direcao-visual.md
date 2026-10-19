# Direção visual - Léia Salão (v4-glass)

Contrato visual de `clientes/leia-salao-glass/`. Revisão de 14/10/2026 sobre a v3.1-glass, a pedido do cliente: "inspirar mais nas referências", usar a foto nova `design/originais/Salão de Beleza Luxuoso em Luz Dourada.png` como fundo para o vidro e trocar a fonte por algo mais "old money". Mantém conteúdo, SEO, links de WhatsApp e a paleta grafite e ouro. A v3.1 está guardada em `_v3.1/`. Desde 14/10/2026 a página é um projeto Vite + React + TypeScript (ver `README.md`); a versão em HTML puro equivalente está em `_legado-html/`. A página `clientes/leia-salao/` (v2) fica intacta. Este documento substitui por completo as versões anteriores.

## Direção

**"Salão à meia-luz, serifa clássica e vidro sobre a luz dourada."** O topo é a foto do salão em tela cheia (como na referência Aura Salon); o texto fica sobre a parede escura e o vidro (pílula do menu, números, moldura da Léia, card de Paris) desfoca os espelhos e as cadeiras douradas. Na divisa entre o topo e Serviços, cards de vidro claro ficam metade sobre a foto e metade sobre o linho. A foto volta espelhada e fixa ao fundo de Noivas. Em Sobre, o texto vira um card de papel sobreposto às fotos (as camadas da segunda referência). **Todo vidro tem foto ou luz atrás.**

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

### Contraste medido na v3.1 (a remedir na v4: topo, divisa e Noivas mudaram de fundo)

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

- **Títulos e números:** Cormorant Garamond (Google Fonts, 400/500/600 e itálico 400/500), fallback `Garamond, "Times New Roman", serif`. Peso 500; "com propósito" em itálico 400 dourado claro (`--gold-hover`). **Algarismos de linha** forçados (`lining-nums`): por padrão a Cormorant usa algarismos antigos e "40" parecia "4o".
- **Texto, botões, abas e rótulos:** Jost (`wght` 300-600), fallback `system-ui, "Segoe UI", Roboto, Arial, sans-serif`. Corpo 400, apoio do topo 300, botões e abas 500 com espaçamento 0,02-0,03em. Rótulos pequenos ("Agendar" dos cards, títulos do rodapé) em caixa alta com espaçamento de 0,14em.
- **Escala:** `--step-small` 14-15px, `--step-body` 16-17px, `--step-lead` 18-22px, `--step-head` 38-62px, `--step-display` 46-86px. A serifa tem altura-x menor, por isso a escala subiu em relação à Sora.
- Números com `tabular-nums` (a contagem não faz a largura tremer).
- A briefing pedia a Sora; a troca foi pedido do cliente em 14/10/2026.

## Estilo

### Base

- Fotos em molduras retrato, grades e cards, **nunca acima do tamanho natural**.
- Profundidade: filete dourado de 3rem acima dos títulos, moldura de vidro na foto da Léia, degradê grafite e legenda sobre as fotos.
- Hover marcado: cards de serviço sobem 6px com borda dourada; foto aproxima 6%; botão dourado sobe 2px.
- Cantos: fotos 6px; botões e pílulas raio total; vidro 16px; cards da divisa 20px; moldura da Léia e card de Sobre 22px.
- Ícones só em SVG inline. **Nenhum emoji.** O ícone de WhatsApp aparece **só** no botão principal do topo e no botão flutuante.

### Fundo fotográfico (o que o vidro refrata)

| Onde | Como |
|---|---|
| Topo | `public/img/salao-luz.webp` (1536px; 1024px no `srcset`), `<img>` decorativo com `fetchpriority="high"` e pré-carregado. Desktop: véu horizontal (86% à esquerda → 5% à direita) e faixas escuras no alto e na base. Celular: véu vertical mais denso no meio, atrás do texto. Aproximação lenta de 1,08 para 1 em 9s ao carregar (desligada com movimento reduzido) |
| Noivas | `public/img/salao-luz-espelhada.webp` (espelhada para os espelhos dourados ficarem à esquerda, atrás do texto e dos botões), véu de 76-88%. Fixa ao rolar só no desktop com mouse (`background-attachment: fixed`) |
| Abas de Serviços | Faixa de luz dourada e grafite atrás do trilho, como na v3.1 |
| Pílula fixa | Mais translúcida (`--glass-tint-header`, 46%, blur 18px); sobre o linho (Serviços, Sobre e a divisa) fica com 86% |

**Transparência reduzida** (`prefers-reduced-transparency`, ligada no Chrome quando o Windows está sem "Efeitos de transparência"): o vidro **mantém o desfoque** e só fica mais denso (tinta escura 70-86%, vidro claro 58%). Decisão de 14/10/2026: na versão anterior o vidro virava cor sólida e o cliente, com a transparência desligada, não via o efeito. Sem suporte a `backdrop-filter`, continua o fallback sólido.

Escurecimento (ajuste de 14/10/2026, "fundo menos poluído"): topo no desktop com véu de 92% → 40% da esquerda para a direita; no celular, 55-82%. Noivas com véu de 80-92% e uma camada extra mais escura do lado do texto.

### Vidro que responde ao mouse (`.tilt`)

Números 40+ e 3, card de Paris, os 4 cards da divisa e o card de Sobre. Com mouse: um brilho dourado segue o cursor (camada `--glow-layer`; `--glow` é registrado com `@property` e anima de 0 a 1), o card inclina na direção do cursor (`data-tilt`: 5° nos números, 4° em Paris, 6° nos cards, 2° em Sobre), sobe 6px e a borda acende em dourado. Com foco do teclado: brilho e subida, sem inclinação. Sem efeito no toque; sem inclinação com movimento reduzido. Paris entra só com fade (o `transform` fica livre para a inclinação).

### Paris e Sobre: afastados das fotos

- Paris fica quase todo fora do retrato: `left` de -4rem a -16rem (`30vw - 12,5rem`), com 320px de largura; de 1024 a 1279px, 250px e -6,5rem. Vidro a 34%.
- Sobre: card de **vidro claro** (papel a 42%, `blur(24px)`, borda branca) sobre duas manchas de luz (dourada e grafite) no linho; sobrepõe só cerca de 24px da foto da equipe.

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

### Cards da divisa (Mechas, Coloração, Tratamentos, Noivas)

- Seção `.seam` entre o topo e Serviços, puxada para cima em `--seam-up` (4,5rem no celular, 5rem a partir de 600px, 6,5rem no desktop). Fundo transparente até essa altura e linho depois.
- Três cards de **vidro claro**: linho a 40% com reflexo branco, borda branca de 55%, `blur(22px) saturate(160%)`, raio de 20px, sombra longa. Texto `--ink`/`--graphite`, centralizado, com ícone SVG de traço fino num círculo branco.
- Noivas é o card escuro (grafite a 80%, borda dourada, título dourado claro, texto `#D2CCC0`).
- Título h2 só para leitores de tela: "Especialistas em mechas, coloração, tratamentos e noivas" (bio do Instagram).
- Celular: carrossel com encaixe (cards a 76% da largura). De 600 a 1023px: 2x2. Desktop: 4 colunas.

### Referências (`referencias/`, 2 imagens)

Aproveitado na v4: foto do salão em tela cheia no topo, menu em pílula translúcida, cards de vidro claro e leitoso sobre a divisa foto → fundo claro, ícones em círculo, títulos em serifa clássica, cards sobrepostos em camadas (Sobre, Paris sobre a moldura da Léia) e cards claros e escuros misturados.

Deixado de fora: a paleta bege/mocha (fica o grafite e ouro do cliente), textos, logos e imagens das referências.

## Estrutura de seções (desktop ≥ 1024px)

| # | Seção | Layout |
|---|---|---|
| 0 | Cabeçalho | Pílula de vidro fixa: logo, Serviços, Noivas, Sobre, Casas, "Agendar" dourado. No celular fica sobre a foto do topo (absoluta) |
| 1 | Topo `#inicio` | Foto em tela cheia; altura de 100svh menos 5,5rem (os títulos dos cards da divisa entram na primeira tela). 7/12 texto (h1, apoio, botões, números) e 5/12 retrato da Léia em moldura de vidro (10px, raio de 22px) com o card de Paris sobreposto |
| 1b | Divisa | 4 cards (ver acima) |
| 2 | Serviços `#servicos` | 3 colunas: título, apoio e CTA / abas com listas em 2 colunas / foto `maquiagem` na altura do bloco |
| 3 | Noivas & Noivos `#noivas` | Foto espelhada fixa ao fundo; 6/12 texto e 3 botões de vidro; 6/12 grade de 3 fotos |
| 4 | Sobre `#sobre` | Card de vidro claro (raio de 22px) com o texto, encostando cerca de 24px na grade `equipe` + `lages-recepcao` |
| 5 | Casas `#casas` | 3 casas lado a lado; nomes das cidades em Cormorant |
| 6 | Rodapé | Logo, frase, colunas com títulos em caixa alta |
| - | WhatsApp flutuante | Botão dourado; painel de vidro com as 3 casas |

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

## Componentes modernos (v5, 15/10/2026)

Pedido do cliente: atualizar com componentes modernos e fluidos, como na JK Software. Paleta, tipos e tom do vidro deste contrato não mudaram; o texto digitado e o texto que se transforma ficaram de fora (destoariam do tom sóbrio da marca).

| Componente | Onde | Como |
|---|---|---|
| SplitHeading (Motion) | Títulos das seções | Sobem palavra por palavra de dentro de uma máscara |
| Reveal / LiftList (Motion) | Textos, fotos e cards | Textos e fotos sobem saindo do desfoque; cards de vidro sobem com mola, em sequência, só com transform |
| Paralaxe (Motion `useScroll`) | Foto do salão no topo | Desce até 150px mais devagar que a página |
| GlassSurface (React Bits) | Pílula do cabeçalho e card de Paris | Refração com aberração cromática nas bordas, somada ao desfoque do contrato; só Chromium |
| BorderGlow (React Bits) | Cards de especialidade, card de Paris e card do Sobre | Trecho da borda acende em degradê dourado na direção do cursor; ouro escuro nos vidros claros; só com mouse |
| SpecularButton (React Bits) | "Agendar pelo WhatsApp" e "Agendar" do cabeçalho | Reflexo quente que corre pela borda do botão dourado e segue o cursor; só com mouse |
| GooeyNav (React Bits) | Links do cabeçalho a partir de 768px | Pílula dourada a 30% que acompanha a seção ativa; texto ativo em papel |
| PatternWaves (React Bits) | Fundo de Serviços | Pontos em ouro escuro (24%) ondulando, só do lado das abas e da foto |
| LineWaves (React Bits) | Fundo de Casas | Linhas douradas discretas (brilho 0,08), apagadas atrás do cabeçalho da seção |
| Rail | Casas abaixo de 960px | Carrossel com deslizamento e indicadores dourados |

Todos adaptados sob licença MIT, sem dependência nova (PatternWaves e LineWaves reescritos em WebGL direto, sem `ogl`). Verificado em 1440 e 390px: console vazio no dev e no build, sem rolagem lateral.

### v5.1 (15/10/2026): cabeçalho do celular numa linha só

- Abaixo de 768px o cabeçalho tem uma linha: logo, **Agendar** e um botão redondo de vidro (44px) que abre o menu. A segunda faixa com os links saiu, então o topo da página sobe (`.hero` com `padding-top: 6.75rem`).
- Os links abrem num painel de vidro escuro logo abaixo do cabeçalho (links à esquerda, 48px de altura). O painel fecha ao escolher um link, no próprio botão ou com Esc (o foco volta ao botão). `aria-expanded`/`aria-controls` no botão.
- A partir de 768px nada muda: pílula de vidro líquido com o menu líquido (GooeyNav).

### v6 (15/10/2026): menu do celular em cards (CardNav)

- Substitui a v5.1 abaixo de 768px. A pílula de vidro tem a logo e o botão "Menu". Ao tocar, ela cresce com uma mola e mostra três cards: O salão (Serviços, Noivas & Noivos), Sobre (Nossa história) e Casas (Endereços e contatos). Embaixo fica o botão dourado "Agendar na sua casa", que leva às casas.
- Títulos dos cards em Cormorant Garamond, links em ouro claro com seta diagonal e a seção atual sublinhada. O painel aberto vira grafite denso com borda dourada.
- Fecha ao escolher um link, ao tocar fora ou com Esc (o foco volta ao botão). A partir de 768px nada muda: pílula de vidro líquido com o GooeyNav.
- Mesmo componente da JK Software, com as cores e fontes da Léia.

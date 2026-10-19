# Léia Salão — landing page

Landing da rede Léia Salão (Lages, Florianópolis e Balneário Camboriú), pré-renderizada no build.

## Stack

| Peça | Uso |
|---|---|
| Vite 8 + React 19 + TypeScript 7 | Componentes e build |
| CSS próprio (`src/styles/landing.css`) | Todo o visual, sem Tailwind |
| Motion 14 (`motion/react`) | Animações abaixo da dobra ou ligadas à rolagem, sempre `m.*` dentro de `LazyMotion` (`strict`) e `MotionConfig reducedMotion="user"` |
| Lenis 1.3 (`lenis/react`) | Rolagem suave; desligado com movimento reduzido |
| Pré-renderização própria | `src/entry-server.tsx` + `scripts/prerender.mjs` injetam o HTML em `dist/index.html`; `src/entry-client.tsx` hidrata |

Versões fixas em `package.json`. Não troque nem acrescente biblioteca de base sem registrar a decisão aqui.

## Subir com Docker (sem instalar Node)

Precisa só do [Docker](https://www.docker.com/products/docker-desktop/) aberto.

```bash
git clone https://github.com/JoaoVictorArbegaus/leiahairsalon.git
cd leiahairsalon
docker compose up -d --build
```

Abre em http://localhost:8080. A primeira vez demora uns minutos (instala as dependências e faz o build dentro do contêiner).

- Outra porta: `PORTA=3000 docker compose up -d --build` (no PowerShell: `$env:PORTA=3000; docker compose up -d --build`).
- Atualizar depois de um `git pull`: `docker compose up -d --build`.
- Parar: `docker compose down`.

## Como rodar (desenvolvimento)

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # typecheck, build e pré-renderização em dist/
npm run preview  # serve dist/ em http://localhost:4173
```

`dist/` é o que vai para a hospedagem (HTML estático com o texto de todas as seções, CSS, JS e `img/`).

## Onde fica cada coisa

| Caminho | Conteúdo |
|---|---|
| `index.html` | Só o `<head>`: SEO, Open Graph, JSON-LD, fontes, preload da foto do topo e o marcador `<!--app-html-->` |
| `src/content/site.ts` | Todos os textos, serviços, casas, telefones e links (`whatsapp(numero, mensagem)` faz o url-encode) |
| `src/App.tsx` | Composição das seções, `LazyMotion`, `MotionConfig` e Lenis |
| `src/components/Button.tsx`, `Glass.tsx`, `Icons.tsx` | Botão (`gold`/`ink`/`glass`, `small`), superfície de vidro (`as`, `tone`, `tilt`) e ícones SVG |
| `src/components/Hero.tsx`, `Sections.tsx`, `Header.tsx`, `Footer.tsx` | Seções; `Footer.tsx` também tem o WhatsApp flutuante |
| `src/components/Chooser.tsx`, `ServiceTabs.tsx`, `CountUp.tsx` | Escolha da casa no WhatsApp, abas de serviços e contagem dos números |
| `src/components/Motion.tsx`, `Rail.tsx` | Primitivas de animação (`Reveal`, `SplitHeading`, `LiftList`/`LiftItem`) e carrossel das casas |
| `src/components/LiquidGlass.tsx`, `BorderGlow.tsx`, `SpecularLight.tsx`, `GooeyNav.tsx`, `CardNav.tsx`, `PatternWaves.tsx`, `LineWaves.tsx` | Adaptados de React Bits (MIT): vidro líquido, borda dourada, reflexo dos botões, menu líquido (desktop), menu em cards (celular, abaixo de 768px) e fundos de ondas |
| `src/hooks/useLandingEffects.ts` | Efeitos globais: vidro do cabeçalho sobre o linho, entradas ao rolar (`data-reveal`), vidro que responde ao mouse (`.tilt`) |
| `src/styles/landing.css` | CSS portado da versão em HTML puro, com a seção "v5" (componentes modernos) no fim |
| `public/img/` | Imagens otimizadas (`/img/...`) |
| `design/` | `briefing.md`, `direcao-visual.md` (contrato visual), `referencias/` e `originais/` (fotos e logo do cliente) |
| `_legado-html/` | Versão em HTML/CSS/JS puros de 14/10/2026 (equivalente à migração, antes dos componentes modernos): backup para comparar ou restaurar. Não é publicada |
| `_v3.1/` | Versão anterior (v3.1), só para consulta |

## Publicação

- Domínio usado no `<head>`: `https://www.leiasalao.com/`. As imagens de Open Graph e JSON-LD apontam para `/img/...`.
- Confirmar com o salão os direitos de imagem das pessoas nas fotos antes de publicar.

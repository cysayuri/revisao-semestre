/* =========================================================
   ICONES (SVG inline, estilo feather/outline)
========================================================= */
const ICON_PATHS = {
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  play: '<polygon points="5 3 19 12 5 21 5 3"/>',
  pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
  rotate: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 8 11 8a21.7 21.7 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>',
};
function icon(name, size = 16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[name] || ""}</svg>`;
}

/* =========================================================
   SYNTAX HIGHLIGHT (feito à mão para o conteúdo fixo da aula)
========================================================= */
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function highlightHTML(src) {
  let s = esc(src);
  // s = s.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tk-comment">$1</span>');
  // s = s.replace(/(&lt;!DOCTYPE[^&]*&gt;)/gi, '<span class="tk-comment">$1</span>');
  // s = s.replace(/(&lt;\/?[a-zA-Z0-9-]+)/g, '<span class="tk-tag">$1</span>');
  // s = s.replace(/(&gt;)/g, '<span class="tk-punct">$1</span>');
  // s = s.replace(/([a-zA-Z-]+)(=)("[^"]*")/g, '<span class="tk-attr">$1</span>$2<span class="tk-str">$3</span>');
  return s;
}
function highlightCSS(src) {
  let s = esc(src);
  // s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tk-comment">$1</span>');
  // s = s.replace(/([.#]?[a-zA-Z0-9_-]+(?:::?[a-zA-Z-]+(?:\([^)]*\))?)*)(\s*\{)/g, '<span class="tk-tag">$1</span>$2');
  // s = s.replace(/([a-zA-Z-]+)(\s*:\s*)([^;]+)(;)/g, '<span class="tk-attr">$1</span>$2<span class="tk-str">$3</span>$4');
  return s;
}
function codeBlock(code, lang = "html", label = "") {
  const html = lang === "css" ? highlightCSS(code) : highlightHTML(code);
  const lines = html.split("\n");
  const rows = lines.map((l, i) =>
    `<div class="code-line"><span class="code-ln">${i + 1}</span><span class="code-content">${l || " "}</span></div>`
  ).join("");
  const labelHtml = label ? `<div class="code-label">${label}</div>` : "";
  return `${labelHtml}<pre class="code-pre">${rows}</pre>`;
}
function commentLine(text) {
  return `<div class="prompt-comment">// ${text}</div>`;
}

/* =========================================================
   CONTEUDO ESTATICO (snippets)
========================================================= */
const introBuggy = `<html lang="pt-br">
<head>
  <title>Minha Página</title>
</head>
<body>
  <h1>Bem-vindo ao meu site</h1>
  <p>Esse é o parágrafo principal.
  <img src="foto.jpg">
</body>
</html>`;

const introFixed = `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Minha Página</title>
</head>
<body>
  <h1>Bem-vindo ao meu site</h1>
  <p>Esse é o parágrafo principal.</p>
  <img src="foto.jpg" alt="Descrição da foto">
</body>
</html>`;

const divsReveal = `<div class="card">
  <div class="card-img">
    <img src="tenis.jpg" alt="Tênis branco">
  </div>
  <div class="card-info">
    <div class="card-title">Tênis Runner</div>
    <div class="card-price">R$ 299,90</div>
    <div class="card-button">Comprar</div>
  </div>
</div>`;

const idClassBuggyHTML = `<div id="produto">Tênis</div>
<div id="produto">Camisa</div>`;
const idClassBuggyCSS = `#produto {
  color: red;
}`;
const idClassFixedHTML = `<div class="produto">Tênis</div>
<div class="produto">Camisa</div>`;
const idClassFixedCSS = `.produto {
  color: red;
}`;

const semanticBuggy = `<div class="topo">Logo e menu</div>
<div class="menu">Início | Sobre | Contato</div>
<div class="conteudo">Título do post + texto</div>
<div class="rodape">Cyntia Sayuri © FIAP 2026</div>`;

const semanticFixed = `<header class="topo">Logo e menu</header>
<nav class="menu">Início | Sobre | Contato</nav>
<main class="conteudo">Título do post + texto</main>
<footer class="rodape">Cyntia Sayuri © FIAP 2026</footer>`;

const battleSolution = `.btn {
  border-radius: 100%;
  background: #29263f;
  padding: 17px 35px;
  transition: transform .3s ease, background .3s ease;
}

.btn:hover {
  transform: scale(1.08);
  background: #ff5d8f;
}`;

const warmupQuestions = [
  { q: "O que significa a sigla HTML? E CSS?", hint: "Pegadinha, sem dica! Vai outra pergunta: São consideradas linguagens de...?" },
  { q: "O que uma &lt;div&gt; faz sozinha, sem nenhum CSS aplicado?", hint: "Nada de especial visualmente." },
  { q: "Qual a diferença entre id e class?", hint: "Elemento único VS Repetir em vários elementos." },
  { q: "Qual a diferença entre uma tag 'de bloco' e uma 'em linha'?", hint: "Exemplos: &lt;div&gt, &lt;p&gt VS &lt;span&gt, &lt;img&gt" },
  { q: "Cite e explique um pseudo-elemento ou pseudo-classe que vocês lembram do semestre passado.", hint: "Qualquer resposta vale: :hover, :first-child, :last-child, :nth-child()..." },
  { q: "Qual propriedade CSS usamos para alinhar itens lado a lado, numa linha ou coluna?", hint: "É um tipo de display." },
  { q: "Qual a diferença entre transition e animation?", hint: "Transition reage a uma mudança de estado (por exemplo :hover); animation roda sozinha, com @keyframes definindo os passos." },
  { q: "Por que usar tags semânticas em vez de só div?", hint: "Exemplo de diferença entre &lt;strong&gt e &lt;b&gt." },
  { q: "Posso usar duas classes diferentes no mesmo elemento? E dois id's?", hint: "Por exemplo: .btn .btn-destaque" },
  { q: "Qual propriedade eu uso para quebrar uma linha dentro de um container flex?", hint: "Também é um nome de um tipo de lanche." },
  { q: "Pra que serve o ::placeholder?", hint: "Está presente nos formulários." },
  { q: "Qual foi a parte mais difícil do semestre passado pra vocês?", hint: "Não vale pontos" },
];

const topics = [
  {
    ext: "html", title: "Intro a HTML & CSS", time: "4 min",
    prompt: "Esse código tem 3 probleminhas clássicos de início de curso: um lá no topo do documento, e dois dentro do body. Quais vocês conseguem achar antes de eu revelar?",
    challenge: () => codeBlock(introBuggy, "html", "index.html"),
    reveal: () => codeBlock(introFixed, "html", "index.html — corrigido"),
  },
  {
    ext: "html", title: "Divs", time: "4 min",
    prompt: "Um card de produto: imagem, nome, preço e botão de comprar, tudo dentro de um container. Sem usar semântica ainda — só com divs, como vocês organizariam isso?",
    challenge: () => `<p class="prose">Discutam com seus grupos e montem a estrutura: quantas divs seriam usadas e como elas se aninham? Depois, comparem com a estrutura abaixo.</p>`,
    reveal: () => codeBlock(divsReveal, "html", "index.html"),
  },
  {
    ext: "css", title: "id e class", time: "4 min",
    prompt: "Esse HTML repete o mesmo id em dois elementos diferentes. O que está errado, e como resolvemos isso com o que aprendemos sobre id e class?",
    challenge: () => codeBlock(idClassBuggyHTML, "html", "index.html") + codeBlock(idClassBuggyCSS, "css", "style.css"),
    reveal: () => `<p class="prose">id precisa ser único na página — repetir o mesmo id é inválido. O correto é usar class:</p>` +
      codeBlock(idClassFixedHTML, "html", "index.html — corrigido") + codeBlock(idClassFixedCSS, "css", "style.css — corrigido"),
  },
  {
    ext: "css", title: "Flexbox", time: "5 min",
    prompt: "Brinquem com os controles abaixo. Antes de clicar em cada opção, tentem prever o que vai acontecer.",
    challenge: () => flexDemoHTML(),
    reveal: null,
  },
  {
    ext: "css", title: "Pseudo-classes e Pseudo-elementos", time: "5 min",
    prompt: "Interajam com a lista abaixo — passem o mouse, cliquem no botão.",
    challenge: () => pseudoDemoHTML(),
    reveal: null,
  },
  {
    ext: "css", title: "Transições e animações", time: "5 min",
    prompt: "Ajustem a duração da transição e liguem/desliguem a animação em @keyframes. Reparem na diferença entre os dois conceitos.",
    challenge: () => transitionDemoHTML(),
    reveal: null,
  },
  {
    ext: "html", title: "Semântica", time: "4 min",
    prompt: "Esse HTML só usa div. Qual tag semântica encaixa em cada uma delas?",
    challenge: () => codeBlock(semanticBuggy, "html", "index.html"),
    reveal: () => codeBlock(semanticFixed, "html", "index.html — corrigido"),
  },
];

const TABS = [
  { id: "abertura", label: "abertura.html", ext: "html" },
  { id: "revisao", label: "revisao.css", ext: "css" },
  { id: "pratica", label: "pratica.js", ext: "js" },
  { id: "battle", label: "battle.css", ext: "css" },
];

/* =========================================================
   ESTADO
========================================================= */
const state = {
  activeTab: "abertura",
  warmup: { index: 0, revealed: false },
  revisao: { index: 0, revealed: false },
  flex: { justify: "flex-start", align: "center", direction: "row" },
  transition: { duration: 0.3, spinning: true },
  battle: { showSolution: false },
  timer: { seconds: 180, initial: 180, running: false, open: false, intervalId: null },
};

/* =========================================================
   DEMOS (retornam HTML como string, usando o state atual)
========================================================= */
function flexDemoHTML() {
  const justifyOpts = ["flex-start", "center", "flex-end", "space-between", "space-around"];
  const alignOpts = ["flex-start", "center", "flex-end"];
  const { justify, align, direction } = state.flex;
  return `
    <div class="demo-box">
      <div class="control-group">
        <span class="control-label">justify-content</span>
        <div class="control-btns">
          ${justifyOpts.map(o => `<button class="chip ${justify === o ? "chip-active" : ""}" data-action="flex-justify" data-value="${o}">${o}</button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">align-items</span>
        <div class="control-btns">
          ${alignOpts.map(o => `<button class="chip ${align === o ? "chip-active" : ""}" data-action="flex-align" data-value="${o}">${o}</button>`).join("")}
        </div>
      </div>
      <button class="chip" data-action="flex-direction-toggle">flex-direction: ${direction}</button>
      <div class="flex-stage" style="justify-content:${justify}; align-items:${align}; flex-direction:${direction}">
        <div class="flex-box fb-1">1</div>
        <div class="flex-box fb-2" style="${align === "stretch" ? "height:auto" : ""}">2</div>
        <div class="flex-box fb-3">3</div>
      </div>
    </div>`;
}

function pseudoDemoHTML() {
  const items = ["Início", "Sobre", "Serviços", "Portfólio", "Contato"];
  return `
    <div class="demo-box">
      <p class="demo-hint">Passe o mouse pelos itens da lista e clique no botão para focar (Tab também funciona).</p>
      <ul class="pseudo-list">
        ${items.map(it => `<li>${it}</li>`).join("")}
      </ul>
      <button class="pseudo-btn">Clique aqui pra ver o :focus</button>
    </div>`;
}
      // <div class="pseudo-legend">
      //   <span><i class="dot" style="background:var(--pink)"></i>:first-child</span>
      //   <span><i class="dot" style="background:var(--green)"></i>:last-child</span>
      //   <span><i class="dot" style="background:var(--purple)"></i>:nth-child(3)</span>
      //   <span><i class="dot" style="background:var(--blue)"></i>:hover / :focus</span>
      //   <span><i class="dot" style="background:var(--yellow)"></i>::first-letter</span>
      //   <span><i class="dot" style="background:var(--red)"></i>::selection</span>
      // </div>

function transitionDemoHTML() {
  const { duration, spinning } = state.transition;
  return `
    <div class="demo-box">
      <div class="control-group">
        <span class="control-label" id="transition-duration-label">transition-duration: ${duration.toFixed(1)}s</span>
        <input type="range" min="0.1" max="2" step="0.1" value="${duration}" class="range-input" data-input="transition-duration">
      </div>
      <div class="transition-stage">
        <button class="transition-btn" id="transition-target-btn" style="transition-duration:${duration}s">Passe o mouse aqui</button>
      </div>
      <div class="control-group" style="margin-top:20px">
        <button class="chip" data-action="transition-toggle-spin">${spinning ? "Pausar animação (@keyframes)" : "Rodar animação (@keyframes)"}</button>
      </div>
      <div class="keyframe-stage">
        <div class="spin-box" style="animation-play-state:${spinning ? "running" : "paused"}"></div>
      </div>
    </div>`;
}

function targetCardHTML() {
  return `
    <article class="target-card">
      <div class="target-card-avatar">🧑‍💻</div>
      <h3>Ana Beatriz</h3>
      <p class="target-card-role">Desenvolvedora Front-end</p>
      <p class="target-card-bio">Apaixonada por criar interfaces bonitas e acessíveis.</p>
      <button class="target-card-btn">Seguir</button>
    </article>`;
}

function battleTargetHTML() {
  return `<button class="battle-target-btn">Comprar agora</button>`;
}

/* =========================================================
   FASES (retornam HTML da area de conteudo)
========================================================= */
function renderAbertura() {
  const q = warmupQuestions[state.warmup.index];
  const revealed = state.warmup.revealed;
  // ${commentLine("aquecimento — não vale pontos, só pra acordar o cérebro")}
  return `
    <div class="phase">
      <div class="phase-eyebrow">fase 1</div>
      <h2 class="phase-title">Detector de memória</h2>
      <div class="warmup-card">
        <div class="warmup-index">Pergunta ${state.warmup.index + 1} de ${warmupQuestions.length}</div>
        <p class="warmup-q">${q.q}</p>
        ${revealed ? `<p class="warmup-hint">${q.hint}</p>` : ""}
        <button class="btn-ghost" data-action="warmup-toggle-hint">${icon(revealed ? "eyeOff" : "eye")} ${revealed ? "Esconder dica" : "Revelar dica"}</button>
      </div>
      <div class="stepper-nav">
        <button class="btn-outline" data-action="warmup-prev" ${state.warmup.index === 0 ? "disabled" : ""}>${icon("chevronLeft")} Anterior</button>
        <button class="btn-outline" data-action="warmup-next" ${state.warmup.index === warmupQuestions.length - 1 ? "disabled" : ""}>Próxima ${icon("chevronRight")}</button>
      </div>
    </div>`;
}

function renderRevisao() {
  const i = state.revisao.index;
  const t = topics[i];
  const revealed = state.revisao.revealed;
  return `
    <div class="phase">
      <div class="phase-eyebrow">fase 2</div>
      <h2 class="phase-title">Revisão relâmpago</h2>

      <div class="topic-stepper">
        ${topics.map((tp, idx) => `<button class="step-dot ${idx === i ? "step-dot-active" : ""} ${idx < i ? "step-dot-done" : ""}" data-action="topic-goto" data-idx="${idx}">${idx + 1}</button>`).join("")}
      </div>

      <div class="round-card">
        <div class="round-header">
          <span class="ext-badge ext-${t.ext}">tópico-${String(i + 1).padStart(2, "0")}.${t.ext}</span>
        </div>
        <h3 class="round-title">${t.title}</h3>
        <p class="round-prompt">${t.prompt}</p>
        <div class="round-challenge">${t.challenge()}</div>
        ${t.reveal ? `
          <button class="btn-ghost" data-action="topic-toggle-reveal">${icon(revealed ? "eyeOff" : "eye")} ${revealed ? "Esconder correção" : "Revelar correção"}</button>
          ${revealed ? `<div class="round-reveal">${t.reveal()}</div>` : ""}
        ` : ""}
      </div>

      <div class="stepper-nav">
        <button class="btn-outline" data-action="topic-prev" ${i === 0 ? "disabled" : ""}>${icon("chevronLeft")} Tópico anterior</button>
        <button class="btn-outline" data-action="topic-next" ${i === topics.length - 1 ? "disabled" : ""}>Próximo tópico ${icon("chevronRight")}</button>
      </div>
    </div>`;
}

function renderPratica() {
  return `
    <div class="phase">
      <div class="phase-eyebrow">fase 3</div>
      <h2 class="phase-title">Reconstrua o card</h2>
      ${commentLine("use o CodePen ou VS Code")}

      <p class="prose">Este é o resultado que vocês precisam reproduzir com código:</p>
      <div class="target-stage">${targetCardHTML()}</div>

      <p class="prose" style="margin-top:24px">O card precisa obrigatoriamente ter:</p>
      <ul class="req-list">
        <li><span class="req-tag">semântica</span> tags semânticas (não só div genérica) - por exemplo, um <code>&lt;article&gt;</code> envolvendo o card</li>
        <li><span class="req-tag">flexbox</span> o layout interno organizado com flexbox</li>
        <li><span class="req-tag">id</span> um id em algo único do card</li>
        <li><span class="req-tag">class</span> uma class reutilizável (pense em como ela serviria para vários cards)</li>
        <li><span class="req-tag">hover</span> um efeito de :hover com transition suave (pode ser diferente do modelo, sejam criativos)</li>
      </ul>
    </div>`;
}

function renderBattle() {
  const show = state.battle.showSolution;
  return `
    <div class="phase">
      <div class="phase-eyebrow">fase 4 · exercício relâmpago</div>
      <h2 class="phase-title">CSS Final Battle</h2>
      ${commentLine("quem chegar mais perto do alvo, visualmente, ganha o ponto")}

      <p class="prose">Recriem este botão: cantos arredondados, e ao passar o mouse ele aumenta e muda de cor suavemente.</p>
      ${commentLine("Cores utilizadas: fundo #29263f e hover #ff5d8f")}
      <div class="target-stage">${battleTargetHTML()}</div>

      <button class="btn-ghost" style="margin-top:20px" data-action="battle-toggle-solution">${icon(show ? "eyeOff" : "eye")} ${show ? "Esconder solução" : "Revelar solução"}</button>
      ${show ? `<div class="round-reveal">${codeBlock(battleSolution, "css", "style.css")}</div>` : ""}
    </div>`;
}

const PHASE_RENDERERS = {
  abertura: renderAbertura,
  revisao: renderRevisao,
  pratica: renderPratica,
  battle: renderBattle,
};

/* =========================================================
   WIDGET FLUTUANTE (cronômetro)
========================================================= */
function renderFloating() {
  document.getElementById("floating-container").innerHTML = timerWidgetHTML();
}
function timerWidgetHTML() {
  const { seconds, running, open } = state.timer;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const low = seconds <= 10 && seconds > 0;
  const done = seconds === 0;
  const presets = [120, 180, 300, 600];
  return `
    <div class="floating floating-left">
      ${open ? `
        <div class="float-panel timer-panel">
          <div class="timer-display ${low ? "timer-low" : ""} ${done ? "timer-done" : ""}" id="timer-digits">${mm}:${ss}</div>
          ${done ? `<div class="timer-alert">tempo esgotado</div>` : ""}
          <div class="timer-presets">
            ${presets.map(p => `<button class="chip" data-action="timer-preset" data-seconds="${p}">${p / 60}min</button>`).join("")}
          </div>
          <div class="timer-controls">
            <button class="icon-btn" data-action="timer-play-pause" ${seconds === 0 ? "disabled" : ""}>${icon(running ? "pause" : "play", 18)}</button>
            <button class="icon-btn" data-action="timer-reset">${icon("rotate", 18)}</button>
          </div>
        </div>` : ""}
      <button class="float-fab" data-action="timer-toggle-open">${icon("clock", 18)} <span id="timer-fab-digits">${mm}:${ss}</span></button>
    </div>`;
}

/* =========================================================
   RENDER PRINCIPAL
========================================================= */
function renderTabbar() {
  document.getElementById("tabbar").innerHTML = TABS.map(t => `
    <button class="tab ${state.activeTab === t.id ? "tab-active" : ""}" data-action="tab" data-tab="${t.id}">
      <span class="tab-ext tab-ext-${t.ext}"></span>${t.label}
    </button>`).join("");
}
function renderPhase() {
  document.getElementById("phase-content").innerHTML = PHASE_RENDERERS[state.activeTab]();
}
function renderAll() {
  renderTabbar();
  renderPhase();
  renderFloating();
}

/* =========================================================
   TIMER (setInterval independente do render completo)
========================================================= */
function startTimerInterval() {
  stopTimerInterval();
  state.timer.intervalId = setInterval(() => {
    if (state.timer.seconds <= 0) {
      state.timer.running = false;
      stopTimerInterval();
      renderFloating();
      return;
    }
    state.timer.seconds -= 1;
    updateTimerDigitsOnly();
    if (state.timer.seconds === 0) {
      state.timer.running = false;
      stopTimerInterval();
      renderFloating();
    }
  }, 1000);
}
function stopTimerInterval() {
  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
    state.timer.intervalId = null;
  }
}
function updateTimerDigitsOnly() {
  const { seconds } = state.timer;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const digitsEl = document.getElementById("timer-digits");
  const fabEl = document.getElementById("timer-fab-digits");
  const low = seconds <= 10 && seconds > 0;
  if (digitsEl) {
    digitsEl.textContent = `${mm}:${ss}`;
    digitsEl.classList.toggle("timer-low", low);
  }
  if (fabEl) fabEl.textContent = `${mm}:${ss}`;
}

/* =========================================================
   EVENT DELEGATION
========================================================= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;

  switch (action) {
    case "tab":
      state.activeTab = btn.dataset.tab;
      renderAll();
      break;

    case "warmup-toggle-hint":
      state.warmup.revealed = !state.warmup.revealed;
      renderPhase();
      break;
    case "warmup-prev":
      state.warmup.index -= 1;
      state.warmup.revealed = false;
      renderPhase();
      break;
    case "warmup-next":
      state.warmup.index += 1;
      state.warmup.revealed = false;
      renderPhase();
      break;

    case "topic-goto":
      state.revisao.index = parseInt(btn.dataset.idx, 10);
      state.revisao.revealed = false;
      renderPhase();
      break;
    case "topic-prev":
      state.revisao.index -= 1;
      state.revisao.revealed = false;
      renderPhase();
      break;
    case "topic-next":
      state.revisao.index += 1;
      state.revisao.revealed = false;
      renderPhase();
      break;
    case "topic-toggle-reveal":
      state.revisao.revealed = !state.revisao.revealed;
      renderPhase();
      break;

    case "flex-justify":
      state.flex.justify = btn.dataset.value;
      renderPhase();
      break;
    case "flex-align":
      state.flex.align = btn.dataset.value;
      renderPhase();
      break;
    case "flex-direction-toggle":
      state.flex.direction = state.flex.direction === "row" ? "column" : "row";
      renderPhase();
      break;

    case "transition-toggle-spin":
      state.transition.spinning = !state.transition.spinning;
      renderPhase();
      break;

    case "battle-toggle-solution":
      state.battle.showSolution = !state.battle.showSolution;
      renderPhase();
      break;

    case "timer-toggle-open":
      state.timer.open = !state.timer.open;
      renderFloating();
      break;
    case "timer-preset":
      state.timer.seconds = parseInt(btn.dataset.seconds, 10);
      state.timer.initial = state.timer.seconds;
      state.timer.running = false;
      stopTimerInterval();
      renderFloating();
      break;
    case "timer-play-pause":
      state.timer.running = !state.timer.running;
      if (state.timer.running) startTimerInterval(); else stopTimerInterval();
      renderFloating();
      break;
    case "timer-reset":
      state.timer.seconds = state.timer.initial;
      state.timer.running = false;
      stopTimerInterval();
      renderFloating();
      break;
  }
});

document.addEventListener("input", (e) => {
  const el = e.target.closest("[data-input]");
  if (!el) return;
  const type = el.dataset.input;

  if (type === "transition-duration") {
    state.transition.duration = parseFloat(el.value);
    const label = document.getElementById("transition-duration-label");
    const target = document.getElementById("transition-target-btn");
    if (label) label.textContent = `transition-duration: ${state.transition.duration.toFixed(1)}s`;
    if (target) target.style.transitionDuration = state.transition.duration + "s";
  }
});

/* =========================================================
   INICIALIZACAO
========================================================= */
renderAll();

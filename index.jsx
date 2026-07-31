import React, { useState, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw,
  Trophy, Clock, X, Plus, Minus, Sparkles, Users, Eye, EyeOff
} from "lucide-react";

/* ---------------------------------------------------------
   Syntax highlight helpers (leves, feitos à mão para o conteúdo
   fixo desta aula — não é um parser genérico)
--------------------------------------------------------- */
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function highlightHTML(src) {
  let s = esc(src);
  s = s.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tk-comment">$1</span>');
  s = s.replace(/(&lt;!DOCTYPE[^&]*&gt;)/gi, '<span class="tk-comment">$1</span>');
  s = s.replace(/(&lt;\/?[a-zA-Z0-9-]+)/g, '<span class="tk-tag">$1</span>');
  s = s.replace(/(&gt;)/g, '<span class="tk-punct">$1</span>');
  s = s.replace(/([a-zA-Z-]+)(=)("[^"]*")/g, '<span class="tk-attr">$1</span>$2<span class="tk-str">$3</span>');
  return s;
}
function highlightCSS(src) {
  let s = esc(src);
  s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tk-comment">$1</span>');
  s = s.replace(/([.#]?[a-zA-Z0-9_-]+(?:::?[a-zA-Z-]+(?:\([^)]*\))?)*)(\s*\{)/g, '<span class="tk-tag">$1</span>$2');
  s = s.replace(/([a-zA-Z-]+)(\s*:\s*)([^;]+)(;)/g, '<span class="tk-attr">$1</span>$2<span class="tk-str">$3</span>$4');
  return s;
}
function CodeBlock({ code, lang = "html" }) {
  const html = lang === "css" ? highlightCSS(code) : highlightHTML(code);
  const lines = html.split("\n");
  return (
    <pre className="code-pre">
      {lines.map((l, i) => (
        <div className="code-line" key={i}>
          <span className="code-ln">{i + 1}</span>
          <span className="code-content" dangerouslySetInnerHTML={{ __html: l || " " }} />
        </div>
      ))}
    </pre>
  );
}
function Comment({ children }) {
  return <div className="prompt-comment">// {children}</div>;
}

/* ---------------------------------------------------------
   Conteúdo estático (snippets)
--------------------------------------------------------- */
const introBuggy = `<html>
<head>
<title>Minha Página
</head>
<body>
<h1>Bem-vindo ao meu site
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
<div id="produto">Camisa</div>
<div id="produto">Boné</div>`;
const idClassBuggyCSS = `#produto {
  color: red;
  font-weight: bold;
}`;
const idClassFixedHTML = `<div class="produto">Tênis</div>
<div class="produto">Camisa</div>
<div class="produto">Boné</div>`;
const idClassFixedCSS = `.produto {
  color: red;
  font-weight: bold;
}`;

const semanticBuggy = `<div class="topo">Logo e menu</div>
<div class="menu">Início | Sobre | Contato</div>
<div class="conteudo">
  <div class="post">Título do post + texto</div>
</div>
<div class="lateral">Links úteis</div>
<div class="rodape">© 2026 Minha Escola</div>`;

const semanticFixed = `<header class="topo">Logo e menu</header>
<nav class="menu">Início | Sobre | Contato</nav>
<main class="conteudo">
  <article class="post">Título do post + texto</article>
</main>
<aside class="lateral">Links úteis</aside>
<footer class="rodape">© 2026 Minha Escola</footer>`;

const battleSolution = `.btn {
  border-radius: 999px;
  transition: transform 0.3s ease,
              background 0.3s ease;
}

.btn:hover {
  transform: scale(1.08);
  background: var(--accent);
}`;

/* ---------------------------------------------------------
   Demos ao vivo
--------------------------------------------------------- */
function FlexDemo() {
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("center");
  const [direction, setDirection] = useState("row");
  const justifyOpts = ["flex-start", "center", "flex-end", "space-between", "space-around"];
  const alignOpts = ["flex-start", "center", "flex-end", "stretch"];
  return (
    <div className="demo-box">
      <div className="control-group">
        <span className="control-label">justify-content</span>
        <div className="control-btns">
          {justifyOpts.map((o) => (
            <button key={o} className={`chip ${justify === o ? "chip-active" : ""}`} onClick={() => setJustify(o)}>{o}</button>
          ))}
        </div>
      </div>
      <div className="control-group">
        <span className="control-label">align-items</span>
        <div className="control-btns">
          {alignOpts.map((o) => (
            <button key={o} className={`chip ${align === o ? "chip-active" : ""}`} onClick={() => setAlign(o)}>{o}</button>
          ))}
        </div>
      </div>
      <button className="chip" onClick={() => setDirection((d) => (d === "row" ? "column" : "row"))}>
        flex-direction: {direction}
      </button>
      <div className="flex-stage" style={{ justifyContent: justify, alignItems: align, flexDirection: direction }}>
        <div className="flex-box fb-1">1</div>
        <div className="flex-box fb-2" style={{ height: align === "stretch" ? "auto" : undefined }}>2</div>
        <div className="flex-box fb-3">3</div>
      </div>
    </div>
  );
}

function PseudoDemo() {
  const items = ["Início", "Sobre", "Serviços", "Portfólio", "Contato"];
  return (
    <div className="demo-box">
      <p className="demo-hint">Passe o mouse pelos itens da lista e clique no botão para focar (Tab também funciona).</p>
      <ul className="pseudo-list">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
      <button className="pseudo-btn">Clique aqui pra ver o :focus</button>
      <div className="pseudo-legend">
        <span><i className="dot" style={{ background: "var(--pink)" }} /> :first-child</span>
        <span><i className="dot" style={{ background: "var(--green)" }} /> :last-child</span>
        <span><i className="dot" style={{ background: "var(--purple)" }} /> :nth-child(3)</span>
        <span><i className="dot" style={{ background: "var(--blue)" }} /> :hover / :focus</span>
      </div>
    </div>
  );
}

function TransitionDemo() {
  const [duration, setDuration] = useState(0.3);
  const [spinning, setSpinning] = useState(true);
  return (
    <div className="demo-box">
      <div className="control-group">
        <span className="control-label">transition-duration: {duration.toFixed(1)}s</span>
        <input type="range" min="0.1" max="2" step="0.1" value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value))} className="range-input" />
      </div>
      <div className="transition-stage">
        <button className="transition-btn" style={{ transitionDuration: duration + "s" }}>Passe o mouse aqui</button>
      </div>
      <div className="control-group" style={{ marginTop: 20 }}>
        <button className="chip" onClick={() => setSpinning((s) => !s)}>
          {spinning ? "Pausar animação (@keyframes)" : "Rodar animação (@keyframes)"}
        </button>
      </div>
      <div className="keyframe-stage">
        <div className="spin-box" style={{ animationPlayState: spinning ? "running" : "paused" }} />
      </div>
    </div>
  );
}

function TargetCard() {
  return (
    <article className="target-card">
      <div className="target-card-avatar">🧑‍💻</div>
      <h3>Ana Beatriz</h3>
      <p className="target-card-role">Desenvolvedora Front-end</p>
      <p className="target-card-bio">Apaixonada por criar interfaces bonitas e acessíveis.</p>
      <button className="target-card-btn">Seguir</button>
    </article>
  );
}

function BattleTarget() {
  return <button className="battle-target-btn">Comprar agora</button>;
}

/* ---------------------------------------------------------
   Fases
--------------------------------------------------------- */
function AberturaPhase() {
  const questions = [
    { q: "O que uma <div> faz sozinha, sem nenhum CSS aplicado?", hint: "Nada de especial visualmente — é só uma caixa genérica usada para agrupar conteúdo." },
    { q: "Qual a diferença entre id e class, em uma frase?", hint: "id identifica um elemento único na página; class pode se repetir em vários elementos." },
    { q: "Cite um pseudo-elemento ou pseudo-classe que vocês lembram do semestre passado.", hint: "Qualquer resposta vale: :hover, :first-child, :last-child, :nth-child()..." },
  ];
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const q = questions[i];
  return (
    <div className="phase">
      <div className="phase-eyebrow">fase 1 · 10 min</div>
      <h2 className="phase-title">Detector de memória</h2>
      <Comment>aquecimento — vale zero ponto, só pra acordar o cérebro</Comment>
      <div className="warmup-card">
        <div className="warmup-index">Pergunta {i + 1} de {questions.length}</div>
        <p className="warmup-q">{q.q}</p>
        {revealed && <p className="warmup-hint">{q.hint}</p>}
        <button className="btn-ghost" onClick={() => setRevealed((r) => !r)}>
          {revealed ? <EyeOff size={16} /> : <Eye size={16} />} {revealed ? "Esconder dica" : "Revelar dica"}
        </button>
      </div>
      <div className="stepper-nav">
        <button className="btn-outline" disabled={i === 0} onClick={() => { setI((v) => v - 1); setRevealed(false); }}>
          <ChevronLeft size={16} /> Anterior
        </button>
        <button className="btn-outline" disabled={i === questions.length - 1} onClick={() => { setI((v) => v + 1); setRevealed(false); }}>
          Próxima <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function RevisaoPhase() {
  const topics = [
    {
      ext: "html", title: "Intro a HTML & CSS", time: "4 min",
      prompt: "Esse código tem vários probleminhas clássicos de início de curso. Quais vocês conseguem achar antes de eu revelar?",
      challenge: <CodeBlock lang="html" code={introBuggy} />,
      reveal: <CodeBlock lang="html" code={introFixed} />,
    },
    {
      ext: "html", title: "Divs", time: "4 min",
      prompt: "Um card de produto: imagem, nome, preço e botão de comprar, tudo dentro de um container. Sem usar semântica ainda — só com divs, como vocês organizariam isso?",
      challenge: <p className="prose">Discutam em duplas: quantas divs seriam usadas e como elas se aninham? Depois, comparem com a estrutura abaixo.</p>,
      reveal: <CodeBlock lang="html" code={divsReveal} />,
    },
    {
      ext: "css", title: "id e class", time: "4 min",
      prompt: "O que está errado neste código?",
      challenge: (
        <>
          <CodeBlock lang="html" code={idClassBuggyHTML} />
          <CodeBlock lang="css" code={idClassBuggyCSS} />
        </>
      ),
      reveal: (
        <>
          <p className="prose">id precisa ser único na página — usar o mesmo id em vários elementos é inválido. O correto é usar class:</p>
          <CodeBlock lang="html" code={idClassFixedHTML} />
          <CodeBlock lang="css" code={idClassFixedCSS} />
        </>
      ),
    },
    {
      ext: "css", title: "Flexbox", time: "5 min",
      prompt: "Brinquem com os controles abaixo. Antes de clicar em cada opção, tentem prever o que vai acontecer.",
      challenge: <FlexDemo />,
      reveal: null,
    },
    {
      ext: "css", title: "Pseudo-classes", time: "5 min",
      prompt: "Interajam com a lista abaixo — passem o mouse, cliquem no botão. (Pseudo-elementos como ::first-letter ainda não usamos em código, então hoje é só pseudo-classe mesmo.)",
      challenge: <PseudoDemo />,
      reveal: null,
    },
    {
      ext: "css", title: "Transições e animações", time: "5 min",
      prompt: "Ajustem a duração da transição e liguem/desliguem a animação em @keyframes. Reparem na diferença entre os dois conceitos.",
      challenge: <TransitionDemo />,
      reveal: null,
    },
    {
      ext: "html", title: "Semântica", time: "4 min",
      prompt: "Esse HTML só usa div. Qual tag semântica vocês trocariam em cada uma?",
      challenge: <CodeBlock lang="html" code={semanticBuggy} />,
      reveal: <CodeBlock lang="html" code={semanticFixed} />,
    },
  ];
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const t = topics[i];
  const goTo = (idx) => { setI(idx); setRevealed(false); };
  return (
    <div className="phase">
      <div className="phase-eyebrow">fase 2 · ~30 min · revisão relâmpago</div>
      <h2 className="phase-title">Rodadas rápidas pelos 7 tópicos</h2>
      <Comment>discussão em duplas, depois revela — quem responder primeiro em voz alta, ganha pontos no placar</Comment>

      <div className="topic-stepper">
        {topics.map((tp, idx) => (
          <button key={idx} className={`step-dot ${idx === i ? "step-dot-active" : ""} ${idx < i ? "step-dot-done" : ""}`} onClick={() => goTo(idx)}>
            {idx + 1}
          </button>
        ))}
      </div>

      <div className="round-card">
        <div className="round-header">
          <span className={`ext-badge ext-${t.ext}`}>tópico-{String(i + 1).padStart(2, "0")}.{t.ext}</span>
          <span className="round-time"><Clock size={13} /> sugestão: {t.time}</span>
        </div>
        <h3 className="round-title">{t.title}</h3>
        <p className="round-prompt">{t.prompt}</p>
        <div className="round-challenge">{t.challenge}</div>
        {t.reveal && (
          <>
            <button className="btn-ghost" onClick={() => setRevealed((r) => !r)}>
              {revealed ? <EyeOff size={16} /> : <Eye size={16} />} {revealed ? "Esconder correção" : "Revelar correção"}
            </button>
            {revealed && <div className="round-reveal">{t.reveal}</div>}
          </>
        )}
      </div>

      <div className="stepper-nav">
        <button className="btn-outline" disabled={i === 0} onClick={() => goTo(i - 1)}><ChevronLeft size={16} /> Tópico anterior</button>
        <button className="btn-outline" disabled={i === topics.length - 1} onClick={() => goTo(i + 1)}>Próximo tópico <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

function PraticaPhase() {
  return (
    <div className="phase">
      <div className="phase-eyebrow">fase 3 · ~25 min · em duplas, 100% digital</div>
      <h2 className="phase-title">Reconstrua o card</h2>
      <Comment>use CodePen, repl.it ou VS Code — o alvo abaixo é o que vocês precisam recriar</Comment>

      <p className="prose">Este é o resultado que a dupla precisa reproduzir com código:</p>
      <div className="target-stage"><TargetCard /></div>

      <p className="prose" style={{ marginTop: 24 }}>O card precisa obrigatoriamente ter:</p>
      <ul className="req-list">
        <li><span className="req-tag">semântica</span> uma tag semântica (não uma div genérica) envolvendo o card, como <code>&lt;article&gt;</code></li>
        <li><span className="req-tag">flexbox</span> o layout interno organizado com flexbox</li>
        <li><span className="req-tag">id</span> um id em algo único do card (ex: o botão)</li>
        <li><span className="req-tag">class</span> uma class reutilizável (pense em como ela serviria para vários cards)</li>
        <li><span className="req-tag">hover</span> um efeito de :hover com transition suave</li>
      </ul>

      <p className="prose" style={{ marginTop: 20 }}>Nos últimos 5 minutos, 2 ou 3 duplas compartilham a tela e mostram o resultado.</p>
    </div>
  );
}

function BattlePhase() {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <div className="phase">
      <div className="phase-eyebrow">fase 4 · 6-8 min · relâmpago, todo mundo ao mesmo tempo</div>
      <h2 className="phase-title">CSS Battle final</h2>
      <Comment>primeiro time a chegar perto do alvo, visualmente, ganha os pontos</Comment>

      <p className="prose">Recriem este botão: cantos arredondados, e ao passar o mouse ele aumenta e muda de cor suavemente.</p>
      <div className="target-stage"><BattleTarget /></div>

      <button className="btn-ghost" style={{ marginTop: 20 }} onClick={() => setShowSolution((s) => !s)}>
        {showSolution ? <EyeOff size={16} /> : <Eye size={16} />} {showSolution ? "Esconder solução" : "Revelar solução (só depois da rodada!)"}
      </button>
      {showSolution && <div className="round-reveal"><CodeBlock lang="css" code={battleSolution} /></div>}
    </div>
  );
}

function PlacarPhase({ teams, setTeams }) {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const updateScore = (id, delta) => setTeams((ts) => ts.map((t) => (t.id === id ? { ...t, score: Math.max(0, t.score + delta) } : t)));
  const updateName = (id, name) => setTeams((ts) => ts.map((t) => (t.id === id ? { ...t, name } : t)));
  return (
    <div className="phase">
      <div className="phase-eyebrow">acompanhamento</div>
      <h2 className="phase-title">Placar dos times</h2>
      <Comment>edite os nomes dos times e some pontos ao longo da aula</Comment>

      <div className="scoreboard-full">
        {sorted.map((t, idx) => (
          <div className="scoreboard-row" key={t.id}>
            <span className="scoreboard-rank">{idx === 0 && t.score > 0 ? "🏆" : idx + 1}</span>
            <span className="scoreboard-dot" style={{ background: t.color }} />
            <input className="scoreboard-name" value={t.name} onChange={(e) => updateName(t.id, e.target.value)} />
            <span className="scoreboard-score">{t.score}</span>
            <div className="scoreboard-btns">
              <button className="icon-btn-sm" onClick={() => updateScore(t.id, -5)}><Minus size={14} /></button>
              <button className="icon-btn-sm" onClick={() => updateScore(t.id, 5)}><Plus size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <p className="prose" style={{ marginTop: 24 }}>Referência de pontuação sugerida:</p>
      <div className="points-ref">
        <div><span>Rodada relâmpago correta</span><b>+10</b></div>
        <div><span>Bônus de velocidade (primeiro a responder)</span><b>+5</b></div>
        <div><span>Card completo com os 5 requisitos</span><b>+20</b></div>
        <div><span>CSS Battle final</span><b>+15</b></div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Widgets flutuantes: timer e placar
--------------------------------------------------------- */
function TimerWidget() {
  const [seconds, setSeconds] = useState(180);
  const [initial, setInitial] = useState(180);
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState(false);
  const presets = [120, 180, 300, 600];

  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) { setRunning(false); return; }
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const low = seconds <= 10 && seconds > 0;
  const done = seconds === 0;

  return (
    <div className="floating floating-left">
      {open && (
        <div className="float-panel timer-panel">
          <div className={`timer-display ${low ? "timer-low" : ""} ${done ? "timer-done" : ""}`}>{mm}:{ss}</div>
          {done && <div className="timer-alert">tempo esgotado</div>}
          <div className="timer-presets">
            {presets.map((p) => (
              <button key={p} className="chip" onClick={() => { setSeconds(p); setInitial(p); setRunning(false); }}>{p / 60}min</button>
            ))}
          </div>
          <div className="timer-controls">
            <button className="icon-btn" disabled={seconds === 0} onClick={() => setRunning((r) => !r)}>
              {running ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button className="icon-btn" onClick={() => { setSeconds(initial); setRunning(false); }}><RotateCcw size={18} /></button>
          </div>
        </div>
      )}
      <button className="float-fab" onClick={() => setOpen((o) => !o)}>
        <Clock size={18} /> {mm}:{ss}
      </button>
    </div>
  );
}

function ScoreboardWidget({ teams, setTeams, hideFab }) {
  const [open, setOpen] = useState(false);
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const updateScore = (id, delta) => setTeams((ts) => ts.map((t) => (t.id === id ? { ...t, score: Math.max(0, t.score + delta) } : t)));
  if (hideFab && !open) return null;
  return (
    <div className="floating floating-right">
      {open && (
        <div className="float-panel scoreboard-panel">
          <div className="scoreboard-header">
            <span><Trophy size={14} /> placar rápido</span>
            <button className="icon-btn-ghost" onClick={() => setOpen(false)}><X size={16} /></button>
          </div>
          <div className="scoreboard-mini-list">
            {sorted.map((t) => (
              <div className="scoreboard-mini-row" key={t.id}>
                <span className="scoreboard-dot" style={{ background: t.color }} />
                <span className="scoreboard-mini-name">{t.name}</span>
                <span className="scoreboard-mini-score">{t.score}</span>
                <button className="icon-btn-sm" onClick={() => updateScore(t.id, -5)}><Minus size={12} /></button>
                <button className="icon-btn-sm" onClick={() => updateScore(t.id, 5)}><Plus size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
      {!hideFab && (
        <button className="float-fab" onClick={() => setOpen((o) => !o)}>
          <Trophy size={18} /> placar
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   App
--------------------------------------------------------- */
const TABS = [
  { id: "abertura", label: "abertura.html", ext: "html" },
  { id: "revisao", label: "revisao.css", ext: "css" },
  { id: "pratica", label: "pratica.js", ext: "js" },
  { id: "battle", label: "battle.css", ext: "css" },
  { id: "placar", label: "placar.json", ext: "json" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("abertura");
  const [teams, setTeams] = useState([
    { id: 1, name: "Time <Div>", score: 0, color: "#ff5d8f" },
    { id: 2, name: "Time <Flex>", score: 0, color: "#6ec9ff" },
    { id: 3, name: "Time <Class>", score: 0, color: "#a8e66c" },
    { id: 4, name: "Time <Hover>", score: 0, color: "#ffcb6b" },
    { id: 5, name: "Time <Section>", score: 0, color: "#b98eff" },
    { id: 6, name: "Time <Animate>", score: 0, color: "#ff6b6b" },
  ]);

  return (
    <div className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .app-root {
          --bg: #14121f;
          --bg-elevated: #1c1a2b;
          --surface: #201e33;
          --surface-2: #29263f;
          --border: #383256;
          --text: #f2eefb;
          --text-dim: #a79fc4;
          --pink: #ff5d8f;
          --blue: #6ec9ff;
          --green: #a8e66c;
          --yellow: #ffcb6b;
          --purple: #b98eff;
          --red: #ff6b6b;
          --accent: var(--pink);
          font-family: var(--font-sans, 'Inter', sans-serif);
          background: var(--bg);
          color: var(--text);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          --font-sans: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }
        .app-root * { box-sizing: border-box; }
        .app-root ::selection { background: var(--pink); color: #14121f; }

        /* titlebar */
        .titlebar {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px; background: var(--bg-elevated);
          border-bottom: 1px solid var(--border);
        }
        .tb-dot { width: 10px; height: 10px; border-radius: 50%; }
        .tb-title { margin-left: 8px; font-family: var(--font-mono); font-size: 12px; color: var(--text-dim); }

        /* tabs */
        .tabbar { display: flex; overflow-x: auto; background: var(--bg-elevated); border-bottom: 1px solid var(--border); }
        .tab {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 18px; font-family: var(--font-mono); font-size: 12.5px;
          color: var(--text-dim); background: transparent; border: none; cursor: pointer;
          border-right: 1px solid var(--border); white-space: nowrap;
          border-bottom: 2px solid transparent;
        }
        .tab:hover { color: var(--text); background: rgba(255,255,255,0.02); }
        .tab-active { color: var(--text); background: var(--bg); border-bottom: 2px solid var(--pink); }
        .tab-ext { width: 7px; height: 7px; border-radius: 50%; }
        .tab-ext-html { background: #ff8a65; }
        .tab-ext-css { background: var(--blue); }
        .tab-ext-js { background: var(--yellow); }
        .tab-ext-json { background: var(--green); }

        /* content */
        .content-pane { padding: 28px 30px 90px; min-height: 520px; position: relative; }
        .phase-eyebrow { font-family: var(--font-mono); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--pink); margin-bottom: 8px; }
        .phase-title { font-family: var(--font-mono); font-size: 24px; font-weight: 700; margin: 0 0 14px; }
        .prompt-comment { font-family: var(--font-mono); font-size: 12.5px; color: #6b7a5a; font-style: italic; margin-bottom: 20px; }
        .prose { font-size: 14.5px; line-height: 1.6; color: var(--text-dim); max-width: 640px; }

        /* warmup */
        .warmup-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; max-width: 620px; margin-bottom: 18px; }
        .warmup-index { font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); margin-bottom: 10px; }
        .warmup-q { font-size: 19px; font-weight: 600; line-height: 1.4; margin: 0 0 14px; }
        .warmup-hint { font-size: 14px; color: var(--green); background: rgba(168,230,108,0.08); border-left: 3px solid var(--green); padding: 10px 14px; border-radius: 0 8px 8px 0; margin-bottom: 14px; }

        .btn-ghost { display: inline-flex; align-items: center; gap: 6px; background: transparent; border: 1px dashed var(--border); color: var(--text-dim); font-family: var(--font-mono); font-size: 12.5px; padding: 8px 14px; border-radius: 8px; cursor: pointer; }
        .btn-ghost:hover { color: var(--text); border-color: var(--pink); }
        .btn-outline { display: inline-flex; align-items: center; gap: 6px; background: var(--surface); border: 1px solid var(--border); color: var(--text); font-family: var(--font-mono); font-size: 12.5px; padding: 9px 16px; border-radius: 8px; cursor: pointer; }
        .btn-outline:hover:not(:disabled) { border-color: var(--pink); }
        .btn-outline:disabled { opacity: 0.35; cursor: not-allowed; }
        .stepper-nav { display: flex; justify-content: space-between; margin-top: 24px; max-width: 620px; }

        /* topic stepper dots */
        .topic-stepper { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .step-dot { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); font-family: var(--font-mono); font-size: 12px; cursor: pointer; }
        .step-dot-active { background: var(--pink); color: #14121f; border-color: var(--pink); font-weight: 700; }
        .step-dot-done { border-color: var(--green); color: var(--green); }

        .round-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px; max-width: 680px; }
        .round-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .ext-badge { font-family: var(--font-mono); font-size: 11px; padding: 4px 10px; border-radius: 6px; }
        .ext-html { background: rgba(255,138,101,0.15); color: #ff8a65; }
        .ext-css { background: rgba(110,201,255,0.15); color: var(--blue); }
        .round-time { display: flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); }
        .round-title { font-size: 19px; font-weight: 700; margin: 0 0 8px; }
        .round-prompt { font-size: 14px; color: var(--text-dim); line-height: 1.6; margin-bottom: 16px; }
        .round-challenge { margin-bottom: 14px; }
        .round-reveal { margin-top: 14px; padding-top: 14px; border-top: 1px dashed var(--border); }

        /* code */
        .code-pre { font-family: var(--font-mono); font-size: 12.5px; line-height: 1.65; background: #100e1a; border: 1px solid var(--border); border-radius: 10px; padding: 14px 0; overflow-x: auto; margin: 0 0 10px; }
        .code-line { display: flex; padding: 0 16px; }
        .code-ln { color: #4a4568; width: 26px; flex-shrink: 0; user-select: none; text-align: right; margin-right: 14px; }
        .code-content { white-space: pre; color: var(--text-dim); }
        .tk-tag { color: var(--pink); }
        .tk-attr { color: var(--yellow); }
        .tk-str { color: var(--green); }
        .tk-comment { color: #5a5578; font-style: italic; }
        .tk-punct { color: var(--text-dim); }

        /* demos */
        .demo-box { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 22px; max-width: 680px; }
        .control-group { margin-bottom: 14px; }
        .control-label { display: block; font-family: var(--font-mono); font-size: 11.5px; color: var(--text-dim); margin-bottom: 8px; }
        .control-btns { display: flex; gap: 6px; flex-wrap: wrap; }
        .chip { font-family: var(--font-mono); font-size: 11.5px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-dim); padding: 6px 11px; border-radius: 999px; cursor: pointer; }
        .chip:hover { color: var(--text); }
        .chip-active { background: var(--pink); color: #14121f; border-color: var(--pink); font-weight: 700; }
        .range-input { width: 100%; accent-color: var(--pink); }

        .flex-stage { display: flex; gap: 10px; background: #100e1a; border: 1px dashed var(--border); border-radius: 10px; padding: 16px; min-height: 140px; margin-top: 10px; }
        .flex-box { width: 60px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-weight: 700; color: #14121f; flex-shrink: 0; }
        .fb-1 { background: var(--pink); }
        .fb-2 { background: var(--blue); }
        .fb-3 { background: var(--green); }

        .demo-hint { font-size: 13.5px; color: var(--text-dim); margin-bottom: 14px; }
        .pseudo-list { list-style: none; margin: 0 0 16px; padding: 0; display: flex; flex-direction: column; gap: 4px; }
        .pseudo-list li { padding: 10px 14px; background: var(--surface-2); border-radius: 6px; font-size: 14px; border-left: 4px solid transparent; transition: background 0.15s, transform 0.15s; }
        .pseudo-list li:first-child { border-left-color: var(--pink); }
        .pseudo-list li:last-child { border-left-color: var(--green); }
        .pseudo-list li:nth-child(3) { background: rgba(185,142,255,0.15); }
        .pseudo-list li:hover { background: #34304e; transform: translateX(6px); }
        .pseudo-btn { font-family: var(--font-mono); font-size: 13px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text); padding: 10px 16px; border-radius: 8px; cursor: pointer; }
        .pseudo-btn:focus { outline: 3px solid var(--blue); outline-offset: 2px; }
        .pseudo-legend { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 16px; font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); }
        .pseudo-legend .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }

        .transition-stage { background: #100e1a; border: 1px dashed var(--border); border-radius: 10px; padding: 30px; display: flex; justify-content: center; }
        .transition-btn { font-family: var(--font-mono); font-size: 14px; background: var(--surface-2); color: var(--text); border: 1px solid var(--border); padding: 14px 26px; border-radius: 8px; cursor: pointer; transition-property: background, transform; }
        .transition-btn:hover { background: var(--pink); color: #14121f; transform: scale(1.1); }
        .keyframe-stage { background: #100e1a; border: 1px dashed var(--border); border-radius: 10px; padding: 24px; display: flex; justify-content: center; margin-top: 10px; }
        .spin-box { width: 48px; height: 48px; border-radius: 10px; background: linear-gradient(135deg, var(--pink), var(--purple)); animation: spin 2s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* target stage */
        .target-stage { background: #100e1a; border: 1px dashed var(--border); border-radius: 12px; padding: 40px; display: flex; justify-content: center; }
        .target-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; width: 220px; text-align: center; transition: transform 0.25s, box-shadow 0.25s; }
        .target-card:hover { transform: translateY(-6px); box-shadow: 0 14px 28px rgba(0,0,0,0.35); }
        .target-card-avatar { font-size: 40px; margin-bottom: 10px; }
        .target-card h3 { margin: 0 0 4px; font-size: 16px; }
        .target-card-role { color: var(--pink); font-size: 12.5px; margin: 0 0 10px; }
        .target-card-bio { color: var(--text-dim); font-size: 12.5px; line-height: 1.5; margin: 0 0 16px; }
        .target-card-btn { background: var(--pink); color: #14121f; border: none; font-weight: 700; font-family: var(--font-mono); font-size: 12.5px; padding: 9px 20px; border-radius: 999px; cursor: pointer; width: 100%; }

        .battle-target-btn { font-family: var(--font-mono); font-weight: 700; font-size: 14px; background: var(--surface-2); color: var(--text); border: 1px solid var(--border); padding: 16px 32px; border-radius: 999px; cursor: pointer; transition: transform 0.3s ease, background 0.3s ease; }
        .battle-target-btn:hover { transform: scale(1.08); background: var(--pink); color: #14121f; }

        .req-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; max-width: 620px; }
        .req-list li { font-size: 14px; color: var(--text-dim); line-height: 1.5; }
        .req-list code { background: var(--surface-2); padding: 1px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 12.5px; color: var(--green); }
        .req-tag { display: inline-block; font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; background: var(--surface-2); color: var(--pink); padding: 3px 8px; border-radius: 5px; margin-right: 8px; }

        /* scoreboard full page */
        .scoreboard-full { display: flex; flex-direction: column; gap: 8px; max-width: 640px; }
        .scoreboard-row { display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; }
        .scoreboard-rank { width: 22px; text-align: center; font-family: var(--font-mono); font-size: 13px; color: var(--text-dim); }
        .scoreboard-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .scoreboard-name { flex: 1; background: transparent; border: none; color: var(--text); font-size: 14px; font-family: var(--font-sans); outline: none; }
        .scoreboard-score { font-family: var(--font-mono); font-weight: 700; font-size: 16px; min-width: 30px; text-align: right; }
        .scoreboard-btns { display: flex; gap: 4px; }
        .icon-btn-sm { width: 24px; height: 24px; border-radius: 6px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-dim); cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .icon-btn-sm:hover { color: var(--text); border-color: var(--pink); }

        .points-ref { display: flex; flex-direction: column; gap: 6px; max-width: 480px; }
        .points-ref div { display: flex; justify-content: space-between; font-size: 13.5px; padding: 8px 12px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border); }
        .points-ref span { color: var(--text-dim); }
        .points-ref b { color: var(--green); font-family: var(--font-mono); }

        /* floating widgets */
        .floating { position: absolute; bottom: 20px; z-index: 20; }
        .floating-left { left: 20px; }
        .floating-right { right: 20px; }
        .float-fab { display: flex; align-items: center; gap: 7px; background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text); font-family: var(--font-mono); font-size: 12.5px; padding: 10px 16px; border-radius: 999px; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.35); }
        .float-fab:hover { border-color: var(--pink); }
        .float-panel { position: absolute; bottom: 52px; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 14px; padding: 16px; width: 240px; box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
        .floating-left .float-panel { left: 0; }
        .floating-right .float-panel { right: 0; }

        .timer-display { font-family: var(--font-mono); font-size: 34px; font-weight: 700; text-align: center; margin-bottom: 12px; }
        .timer-low { color: var(--red); }
        .timer-done { color: var(--red); }
        .timer-alert { text-align: center; font-family: var(--font-mono); font-size: 11px; color: var(--red); margin-bottom: 10px; }
        .timer-presets { display: flex; gap: 6px; justify-content: center; margin-bottom: 12px; flex-wrap: wrap; }
        .timer-controls { display: flex; gap: 8px; justify-content: center; }
        .icon-btn { width: 36px; height: 36px; border-radius: 8px; background: var(--surface); border: 1px solid var(--border); color: var(--text); cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .icon-btn:hover:not(:disabled) { border-color: var(--pink); }
        .icon-btn:disabled { opacity: 0.4; }

        .scoreboard-header { display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 11.5px; color: var(--text-dim); margin-bottom: 10px; }
        .scoreboard-header span { display: flex; align-items: center; gap: 6px; }
        .icon-btn-ghost { background: transparent; border: none; color: var(--text-dim); cursor: pointer; }
        .scoreboard-mini-list { display: flex; flex-direction: column; gap: 6px; max-height: 260px; overflow-y: auto; }
        .scoreboard-mini-row { display: flex; align-items: center; gap: 6px; font-size: 12px; }
        .scoreboard-mini-name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .scoreboard-mini-score { font-family: var(--font-mono); font-weight: 700; min-width: 20px; text-align: right; }

        @media (max-width: 640px) {
          .content-pane { padding: 20px 16px 90px; }
          .floating { position: fixed; }
        }
        @media (prefers-reduced-motion: reduce) {
          .app-root * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="titlebar">
        <span className="tb-dot" style={{ background: "#ff5f57" }} />
        <span className="tb-dot" style={{ background: "#febc2e" }} />
        <span className="tb-dot" style={{ background: "#28c840" }} />
        <span className="tb-title">aula-revisao — volta às aulas · 1h30 · turma de 30</span>
      </div>

      <div className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${activeTab === t.id ? "tab-active" : ""}`} onClick={() => setActiveTab(t.id)}>
            <span className={`tab-ext tab-ext-${t.ext}`} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="content-pane">
        {activeTab === "abertura" && <AberturaPhase />}
        {activeTab === "revisao" && <RevisaoPhase />}
        {activeTab === "pratica" && <PraticaPhase />}
        {activeTab === "battle" && <BattlePhase />}
        {activeTab === "placar" && <PlacarPhase teams={teams} setTeams={setTeams} />}

        <TimerWidget />
        <ScoreboardWidget teams={teams} setTeams={setTeams} hideFab={activeTab === "placar"} />
      </div>
    </div>
  );
}

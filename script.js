// ==========================================================================
// EFEITOS SONOROS SINTETIZADOS (Web Audio API)
// ==========================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      // Som curto de clique
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'correct') {
      // Acorde alegre de sucesso
      osc.type = 'triangle';
      // Nota 1
      osc.frequency.setValueAtTime(330, now); // E4
      osc.frequency.setValueAtTime(440, now + 0.08); // A4
      osc.frequency.setValueAtTime(554, now + 0.16); // C#5
      osc.frequency.setValueAtTime(660, now + 0.24); // E5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'wrong') {
      // Som grave de erro
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'victory') {
      // Fanfarra curta
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const oscNode = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscNode.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscNode.type = 'sine';
        oscNode.frequency.setValueAtTime(freq, now + idx * 0.15);
        gainNode.gain.setValueAtTime(0.15, now + idx * 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.15 + 0.25);
        
        oscNode.start(now + idx * 0.15);
        oscNode.stop(now + idx * 0.15 + 0.25);
      });
    }
  } catch (e) {
    console.log("Áudio não pôde ser reproduzido: ", e);
  }
}

// ==========================================================================
// SISTEMA DE NAVEGAÇÃO DE TABS E PROGRESSO
// ==========================================================================
const tabs = document.querySelectorAll('.tab-panel');
const navItems = document.querySelectorAll('.nav-item');
const progressBar = document.getElementById('progressBar');

// Ordem das tabs para cálculo de progresso
const tabsOrder = [
  'welcome',
  'class-concept',
  'id-concept',
  'compare-table',
  'game-associate',
  'game-code',
  'sandbox',
  'practice'
];

function switchTab(tabId) {
  // Ocultar todas as tabs e desativar menu lateral
  tabs.forEach(tab => tab.classList.remove('active'));
  navItems.forEach(item => item.classList.remove('active'));

  // Ativar tab selecionada
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Ativar item correspondente na barra lateral
  const activeNavItem = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if (activeNavItem) {
    activeNavItem.classList.add('active');
  }

  // Atualizar barra de progresso
  const index = tabsOrder.indexOf(tabId);
  if (index !== -1) {
    const percent = ((index + 1) / tabsOrder.length) * 100;
    progressBar.style.width = `${percent}%`;
  }
}

// Event Listeners para botões de navegação lateral
navItems.forEach(item => {
  item.addEventListener('click', () => {
    playSound('click');
    switchTab(item.getAttribute('data-tab'));
  });
});

// Event Listeners para botões internos "Próximo" e "Voltar"
document.querySelectorAll('.next-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    playSound('click');
    switchTab(btn.getAttribute('data-next'));
  });
});

document.querySelectorAll('.prev-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    playSound('click');
    switchTab(btn.getAttribute('data-prev'));
  });
});


// ==========================================================================
// JOGO 1: ASSOCIAÇÃO (ID OU CLASS)
// ==========================================================================
const game1Questions = [
  {
    title: "O número do seu RG ou CPF",
    description: "É o seu documento nacional de identidade. Serve para provar quem você é individualmente.",
    icon: "fa-id-card",
    answer: "id",
    explanation: "Correto! Cada cidadão tem um RG/CPF diferente. Como é único, usamos o ID!"
  },
  {
    title: "Camiseta do uniforme da escola",
    description: "Todos os estudantes da mesma série usam camisetas idênticas da mesma cor para se identificar.",
    icon: "fa-shirt",
    answer: "class",
    explanation: "Perfeito! O uniforme serve para um grupo de pessoas, igual a uma CLASS no CSS."
  },
  {
    title: "O seu apelido (nickname) no Roblox ou Minecraft",
    description: "O nome que você escolhe para sua conta. O jogo não deixa outra pessoa escolher exatamente o mesmo nome.",
    icon: "fa-gamepad",
    answer: "id",
    explanation: "Isso aí! O nickname é único para cada conta de jogador. É um ID!"
  },
  {
    title: "Sua impressão digital",
    description: "A marca desenhada na ponta do seu polegar. Nenhuma outra pessoa no mundo tem igual.",
    icon: "fa-fingerprint",
    answer: "id",
    explanation: "Exatamente! Impressões digitais são totalmente exclusivas. Usamos ID!"
  },
  {
    title: "A categoria 'Gato' de um grupo de pets",
    description: "Vários bichinhos diferentes (Persa, Siamês, Vira-lata) compartilham a característica de serem gatos.",
    icon: "fa-cat",
    answer: "class",
    explanation: "Muito bem! Vários animais podem ser 'Gatos' (mesmo grupo). Usamos CLASS!"
  },
  {
    title: "Tênis da marca Nike",
    description: "Várias pessoas no mundo compram e usam o mesmo modelo de tênis de uma mesma marca.",
    icon: "fa-shoe-prints",
    answer: "class",
    explanation: "Correto! Um modelo de sapato representa uma categoria ou grupo. Usamos CLASS!"
  },
  {
    title: "A placa de um veículo",
    description: "A combinação de letras e números que fica na traseira de um carro ou moto.",
    icon: "fa-car",
    answer: "id",
    explanation: "Isso mesmo! Cada carro tem sua própria placa exclusiva para identificação. Usamos ID!"
  },
  {
    title: "Pessoas vestidas de pijama numa festa",
    description: "Diferentes convidados que se vestiram com a mesma categoria de roupa para dormir.",
    icon: "fa-bed",
    answer: "class",
    explanation: "Ótimo! O pijama é um estilo de roupa compartilhado por várias pessoas. Usamos CLASS!"
  },
  {
    title: "Alunos matriculados no 7º ano",
    description: "Todos os estudantes que frequentam a mesma série e compartilham as mesmas aulas.",
    icon: "fa-graduation-cap",
    answer: "class",
    explanation: "Correto! A série escolar representa um grupo de estudantes. Usamos CLASS!"
  },
  {
    title: "O número do seu número de celular",
    description: "O código telefônico de 9 dígitos que permite que as pessoas liguem diretamente para você.",
    icon: "fa-mobile-screen-button",
    answer: "id",
    explanation: "Exato! Cada chip de celular tem um número exclusivo. É um ID!"
  }
];

let g1CurrentIndex = 0;
let g1Score = 0;
let g1Errors = 0;
let g1WaitingForNext = false;

// Inicializa os dots de progresso do jogo 1
function initGame1Dots() {
  const dotsContainer = document.getElementById('game1-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < game1Questions.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'step-dot';
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
}

function loadQuestion() {
  g1WaitingForNext = false;
  
  // Atualizar visual do card
  const q = game1Questions[g1CurrentIndex];
  const card = document.getElementById('quiz-card');
  const iconBox = document.getElementById('quiz-card-icon');
  const title = document.getElementById('quiz-card-title');
  const desc = document.getElementById('quiz-card-description');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  
  card.className = "quiz-card-element";
  feedbackBox.classList.add('hidden');
  
  iconBox.innerHTML = `<i class="fa-solid ${q.icon}"></i>`;
  title.innerText = q.title;
  desc.innerText = q.description;

  // Atualizar Dots
  const dots = document.querySelectorAll('#game1-dots .step-dot');
  dots.forEach((dot, idx) => {
    dot.classList.remove('active');
    if (idx === g1CurrentIndex) {
      dot.classList.add('active');
    }
  });
}

function submitAnswer(userChoice) {
  if (g1WaitingForNext) return;
  g1WaitingForNext = true;

  const q = game1Questions[g1CurrentIndex];
  const isCorrect = userChoice === q.answer;
  
  const card = document.getElementById('quiz-card');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackIcon = document.getElementById('quiz-feedback-icon');
  const feedbackText = document.getElementById('quiz-feedback-text');
  const dots = document.querySelectorAll('#game1-dots .step-dot');
  
  feedbackBox.classList.remove('hidden');

  if (isCorrect) {
    g1Score++;
    document.getElementById('game1-score').innerText = g1Score;
    card.classList.add('pulse-green');
    dots[g1CurrentIndex].classList.add('correct');
    
    feedbackIcon.innerText = "🎉";
    feedbackText.innerHTML = `<strong>Acertou!</strong> ${q.explanation}`;
    playSound('correct');
  } else {
    g1Errors++;
    document.getElementById('game1-errors').innerText = g1Errors;
    card.classList.add('pulse-red');
    dots[g1CurrentIndex].classList.add('wrong');
    
    feedbackIcon.innerText = "🤔";
    feedbackText.innerHTML = `<strong>Ops!</strong> A resposta correta seria <strong>${q.answer === 'id' ? '# ID' : '. CLASS'}</strong>.`;
    playSound('wrong');
  }

  // Aguardar 2.2 segundos para ler o feedback e passar para a próxima
  setTimeout(() => {
    g1CurrentIndex++;
    if (g1CurrentIndex < game1Questions.length) {
      loadQuestion();
    } else {
      endGame1();
    }
  }, 2200);
}

function endGame1() {
  document.getElementById('game1-active-screen').classList.add('hidden');
  const endScreen = document.getElementById('game1-end-screen');
  endScreen.classList.remove('hidden');
  
  const finalMsg = document.getElementById('game1-final-message');
  const stars = document.getElementById('game1-stars');
  
  playSound('victory');
  
  if (g1Score === 10) {
    finalMsg.innerText = "Pontuação Perfeita! Você acertou todas as 10 perguntas! Você é um verdadeiro mestre dos seletores!";
    stars.innerText = "⭐⭐⭐";
  } else if (g1Score >= 7) {
    finalMsg.innerText = `Ótimo trabalho! Você acertou ${g1Score} de 10 perguntas. Está quase perfeito!`;
    stars.innerText = "⭐⭐";
  } else {
    finalMsg.innerText = `Você acertou ${g1Score} de 10 perguntas. Que tal tentar de novo para fixar melhor o conteúdo?`;
    stars.innerText = "⭐";
  }
}

function restartGame1() {
  g1CurrentIndex = 0;
  g1Score = 0;
  g1Errors = 0;
  
  document.getElementById('game1-score').innerText = '0';
  document.getElementById('game1-errors').innerText = '0';
  
  document.getElementById('game1-active-screen').classList.remove('hidden');
  document.getElementById('game1-end-screen').classList.add('hidden');
  
  initGame1Dots();
  loadQuestion();
}


// ==========================================================================
// JOGO 2: CÓDIGO SECRETO (SINTAXE)
// ==========================================================================
const game2Challenges = [
  {
    mission: "Estilizar o parágrafo de assinatura que é único no rodapé do site.",
    html: `&lt;p <span class="hl-blank" id="html-blank">___</span>="assinatura"&gt;Feito com amor&lt;/p&gt;`,
    css: `<span class="hl-blank" id="css-blank">___</span>assinatura {
  font-style: italic;
}`,
    options: [
      { text: "class e .", correct: false },
      { text: "id e #", correct: true },
      { text: "class e #", correct: false },
      { text: "id e .", correct: false }
    ],
    htmlCorrect: "id",
    cssCorrect: "#",
    explanation: "Como é um elemento de rodapé único no site inteiro, usamos ID e o seletor correspondente é #."
  },
  {
    mission: "Colorir de vermelho todas as mensagens de aviso (podem haver várias na mesma página).",
    html: `&lt;span <span class="hl-blank" id="html-blank">___</span>="aviso"&gt;Atenção!&lt;/span&gt;`,
    css: `<span class="hl-blank" id="css-blank">___</span>aviso {
  color: red;
}`,
    options: [
      { text: "id e #", correct: false },
      { text: "class e .", correct: true },
      { text: "class e #", correct: false },
      { text: "id e .", correct: false }
    ],
    htmlCorrect: "class",
    cssCorrect: ".",
    explanation: "Podem existir vários avisos na página. Logo, é uma CLASS e seu seletor é o ponto (.)."
  },
  {
    mission: "Adicionar uma borda neon ao botão de compra que só existe uma vez no topo.",
    html: `&lt;button <span class="hl-blank" id="html-blank">___</span>="btn-compra"&gt;Comprar&lt;/button&gt;`,
    css: `<span class="hl-blank" id="css-blank">___</span>btn-compra {
  border: 2px solid violet;
}`,
    options: [
      { text: "class e .", correct: false },
      { text: "class e #", correct: false },
      { text: "id e #", correct: true },
      { text: "id e .", correct: false }
    ],
    htmlCorrect: "id",
    cssCorrect: "#",
    explanation: "Botão de compra principal único! Usamos ID e marcamos no CSS com #."
  },
  {
    mission: "Diminuir o tamanho das letras de todos os parágrafos de ajuda rápida.",
    html: `&lt;p <span class="hl-blank" id="html-blank">___</span>="texto-ajuda"&gt;Ajuda aqui...&lt;/p&gt;`,
    css: `<span class="hl-blank" id="css-blank">___</span>texto-ajuda {
  font-size: 12px;
}`,
    options: [
      { text: "id e #", correct: false },
      { text: "class e .", correct: true },
      { text: "id e .", correct: false },
      { text: "class e #", correct: false }
    ],
    htmlCorrect: "class",
    cssCorrect: ".",
    explanation: "Queremos mudar todos os parágrafos de ajuda (grupo). Usamos CLASS e no CSS usamos o ponto (.)."
  },
  {
    mission: "Criar um banner com fundo preto que só aparece uma vez no topo da página.",
    html: `&lt;div <span class="hl-blank" id="html-blank">___</span>="banner-topo"&gt;Bem-vindo!&lt;/div&gt;`,
    css: `<span class="hl-blank" id="css-blank">___</span>banner-topo {
  background-color: black;
}`,
    options: [
      { text: "class e .", correct: false },
      { text: "id e #", correct: true },
      { text: "class e #", correct: false },
      { text: "id e .", correct: false }
    ],
    htmlCorrect: "id",
    cssCorrect: "#",
    explanation: "Um banner exclusivo de topo de página. Usamos ID e no CSS usamos a hashtag (#)."
  }
];

let g2CurrentIndex = 0;
let g2Waiting = false;

function loadGame2Challenge() {
  g2Waiting = false;
  const c = game2Challenges[g2CurrentIndex];
  
  // Elementos do DOM
  document.getElementById('game2-current').innerText = g2CurrentIndex + 1;
  document.getElementById('game2-mission-text').innerText = c.mission;
  document.getElementById('game2-html-snippet').innerHTML = `<code>&lt;h1 <span class="hl-blank" id="html-blank">___</span>="site"&gt; site &lt;/h1&gt;</code>`; // reset placeholder
  
  // Atualizar os snippets de código
  document.getElementById('game2-html-snippet').innerHTML = `<code>${c.html}</code>`;
  document.getElementById('game2-css-snippet').innerHTML = `<code>${c.css}</code>`;
  
  // Resetar feedback
  const feedbackBox = document.getElementById('game2-feedback-box');
  feedbackBox.classList.add('hidden');
  
  // Gerar opções de botões
  const optionsGrid = document.getElementById('game2-options');
  optionsGrid.innerHTML = '';
  
  c.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn-code-option';
    btn.innerHTML = `HTML: <strong>${opt.text.split(' e ')[0]}</strong> | CSS: <strong>${opt.text.split(' e ')[1]}</strong>`;
    btn.onclick = () => checkGame2Answer(opt.correct, btn, idx);
    optionsGrid.appendChild(btn);
  });
}

function checkGame2Answer(isCorrect, btnNode, optionIdx) {
  if (g2Waiting) return;
  g2Waiting = true;
  
  const c = game2Challenges[g2CurrentIndex];
  const htmlBlank = document.getElementById('html-blank');
  const cssBlank = document.getElementById('css-blank');
  const feedbackBox = document.getElementById('game2-feedback-box');
  const feedbackIcon = document.getElementById('game2-feedback-icon');
  const feedbackText = document.getElementById('game2-feedback-text');
  
  feedbackBox.classList.remove('hidden');
  
  if (isCorrect) {
    playSound('correct');
    btnNode.classList.add('correct-btn');
    
    // Revelar respostas corretas nos blanks do código
    htmlBlank.innerText = c.htmlCorrect;
    htmlBlank.classList.add('correct-blank');
    cssBlank.innerText = c.cssCorrect;
    cssBlank.classList.add('correct-blank');
    
    feedbackIcon.innerText = "🎉";
    feedbackText.innerHTML = `<strong>Incrível!</strong> ${c.explanation}`;
  } else {
    playSound('wrong');
    btnNode.classList.add('wrong-btn');
    
    // Revelar mesmo que tenha errado
    htmlBlank.innerText = c.htmlCorrect;
    htmlBlank.classList.add('wrong-blank');
    cssBlank.innerText = c.cssCorrect;
    cssBlank.classList.add('wrong-blank');
    
    feedbackIcon.innerText = "🤔";
    feedbackText.innerHTML = `<strong>Ops! O correto era:</strong> HTML: <code>${c.htmlCorrect}</code> e CSS: <code>${c.cssCorrect}</code>.`;
  }
  
  // Próxima pergunta
  setTimeout(() => {
    g2CurrentIndex++;
    if (g2CurrentIndex < game2Challenges.length) {
      loadGame2Challenge();
    } else {
      endGame2();
    }
  }, 3000);
}

function endGame2() {
  document.getElementById('game2-active-screen').classList.add('hidden');
  document.getElementById('game2-end-screen').classList.remove('hidden');
  playSound('victory');
}

function restartGame2() {
  g2CurrentIndex = 0;
  document.getElementById('game2-active-screen').classList.remove('hidden');
  document.getElementById('game2-end-screen').classList.add('hidden');
  loadGame2Challenge();
}


// ==========================================================================
// LABORATÓRIO DOS ALIENS (SANDBOX VISUAL)
// ==========================================================================
const btnControls = document.querySelectorAll('.btn-control');
const alienBobBody = document.querySelector('#alien-bob .alien-body');
const alienMelBody = document.querySelector('#alien-mel .alien-body');
const alienKingBody = document.querySelector('#alien-king .alien-body');
const alienKingCrown = document.querySelector('#alien-king .alien-crown');

const alienBobCard = document.getElementById('alien-bob');
const alienMelCard = document.getElementById('alien-mel');
const alienKingCard = document.getElementById('alien-king');

// Event listener para os botões do sandbox
btnControls.forEach(btn => {
  btn.addEventListener('click', () => {
    playSound('click');
    
    const target = btn.getAttribute('data-target');
    const style = btn.getAttribute('data-style');
    
    if (target === 'class') {
      applyClassStyle(style, btn);
    } else if (target === 'id') {
      applyIdStyle(style, btn);
    }
  });
});

function applyClassStyle(style, btnNode) {
  // Remove ativo de outros botões do mesmo tipo de estilo (ex: cores)
  if (style.startsWith('color-')) {
    document.querySelectorAll('[data-target="class"][data-style^="color-"]').forEach(b => b.classList.remove('active'));
    
    // Limpa cores atuais
    alienBobBody.classList.remove('green-color', 'orange-color');
    alienMelBody.classList.remove('green-color', 'orange-color');
    
    if (style === 'color-green') {
      alienBobBody.classList.add('green-color');
      alienMelBody.classList.add('green-color');
      btnNode.classList.add('active');
    } else if (style === 'color-orange') {
      alienBobBody.classList.add('orange-color');
      alienMelBody.classList.add('orange-color');
      btnNode.classList.add('active');
    }
  } 
  else if (style === 'jump-anim') {
    alienBobCard.classList.toggle('jump');
    alienMelCard.classList.toggle('jump');
    btnNode.classList.toggle('active');
  } 
  else if (style === 'clear') {
    // Reseta todos os botões de controle de classe
    document.querySelectorAll('[data-target="class"]').forEach(b => b.classList.remove('active'));
    
    alienBobBody.classList.remove('green-color', 'orange-color');
    alienMelBody.classList.remove('green-color', 'orange-color');
    alienBobCard.classList.remove('jump');
    alienMelCard.classList.remove('jump');
  }
}

function applyIdStyle(style, btnNode) {
  if (style === 'crown-wear') {
    if (alienKingCrown.classList.contains('hidden-crown')) {
      alienKingCrown.classList.remove('hidden-crown');
      alienKingCrown.classList.add('show-crown');
      btnNode.classList.add('active');
    } else {
      alienKingCrown.classList.remove('show-crown');
      alienKingCrown.classList.add('hidden-crown');
      btnNode.classList.remove('active');
    }
  } 
  else if (style === 'size-big') {
    alienKingBody.classList.toggle('big-size');
    btnNode.classList.toggle('active');
  } 
  else if (style === 'spin-anim') {
    alienKingCard.classList.toggle('spin');
    btnNode.classList.toggle('active');
  } 
  else if (style === 'clear') {
    document.querySelectorAll('[data-target="id"]').forEach(b => b.classList.remove('active'));
    
    alienKingCrown.classList.remove('show-crown');
    alienKingCrown.classList.add('hidden-crown');
    alienKingBody.classList.remove('big-size');
    alienKingCard.classList.remove('spin');
  }
}

// Reset Sandbox Geral
document.getElementById('btn-reset-sandbox').addEventListener('click', () => {
  playSound('click');
  
  // Limpar botões de status ativo
  btnControls.forEach(b => b.classList.remove('active'));
  
  // Resetar Bob e Mel
  alienBobBody.className = 'alien-body body-classic';
  alienMelBody.className = 'alien-body body-classic';
  alienBobCard.className = 'alien-card';
  alienMelCard.className = 'alien-card';
  
  // Resetar Rei
  alienKingBody.className = 'alien-body body-king';
  alienKingCard.className = 'alien-card';
  alienKingCrown.className = 'alien-crown hidden-crown';
});


// ==========================================================================
// JANELA POP-UP DE PARABÉNS (CONGRATS MODAL)
// ==========================================================================
const congratsModal = document.getElementById('congrats-modal');

document.getElementById('btn-congratulations').addEventListener('click', () => {
  playSound('victory');
  document.getElementById('modal-score').innerText = `${g1Score}/10`;
  congratsModal.classList.remove('hidden');
});

function closeModal() {
  playSound('click');
  congratsModal.classList.add('hidden');
}


// ==========================================================================
// INICIALIZAÇÃO DO JOGO AO CARREGAR A PÁGINA
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  initGame1Dots();
  loadQuestion();
  loadGame2Challenge();
});

/* =========================================================
   ESTADO
========================================================= */
const TEAM_COLORS = ["#ff5d8f", "#6ec9ff", "#a8e66c", "#ffcb6b", "#b98eff", "#ff6b6b", "#4dd0e1", "#ffa07a"];
let nextId = 7;
let teams = [
  { id: 1, name: "Time <Div>", score: 0, color: TEAM_COLORS[0] }
  // { id: 2, name: "Time <Flex>", score: 0, color: TEAM_COLORS[1] },
  // { id: 3, name: "Time <Class>", score: 0, color: TEAM_COLORS[2] },
  // { id: 4, name: "Time <Hover>", score: 0, color: TEAM_COLORS[3] },
  // { id: 5, name: "Time <Section>", score: 0, color: TEAM_COLORS[4] },
  // { id: 6, name: "Time <Animate>", score: 0, color: TEAM_COLORS[5] },
];

/* =========================================================
   RENDER
========================================================= */
function render() {
  const container = document.getElementById("scoreboard-list");
  if (teams.length === 0) {
    container.innerHTML = `<p class="empty-state">Nenhum time ainda — adicione o primeiro acima.</p>`;
    return;
  }
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  container.innerHTML = sorted.map((t, idx) => `
    <div class="scoreboard-row">
      <span class="scoreboard-rank">${idx === 0 && t.score > 0 ? "🏆" : idx + 1}</span>
      <span class="scoreboard-dot" style="background:${t.color}"></span>
      <input class="scoreboard-name" value="${escapeHtml(t.name)}" data-id="${t.id}" data-role="name">
      <span class="scoreboard-score">${t.score}</span>
      <div class="scoreboard-btns">
        <button class="icon-btn-sm" data-id="${t.id}" data-role="dec">−5</button>
        <button class="icon-btn-sm" data-id="${t.id}" data-role="inc">+5</button>
      </div>
      <button class="remove-team-btn" data-id="${t.id}" data-role="remove" title="Remover time">✕</button>
    </div>
  `).join("");
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* =========================================================
   EVENTOS
========================================================= */
document.getElementById("scoreboard-list").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-role]");
  if (!btn) return;
  const id = parseInt(btn.dataset.id, 10);
  const team = teams.find(t => t.id === id);
  if (!team) return;

  if (btn.dataset.role === "inc") team.score += 5;
  if (btn.dataset.role === "dec") team.score -= 5;
  if (btn.dataset.role === "remove") teams = teams.filter(t => t.id !== id);

  render();
});

document.getElementById("scoreboard-list").addEventListener("input", (e) => {
  const el = e.target.closest('[data-role="name"]');
  if (!el) return;
  const id = parseInt(el.dataset.id, 10);
  const team = teams.find(t => t.id === id);
  if (team) team.name = el.value;
});

function addTeam() {
  const input = document.getElementById("new-team-input");
  const name = input.value.trim();
  if (!name) return;
  const color = TEAM_COLORS[teams.length % TEAM_COLORS.length];
  teams.push({ id: nextId++, name, score: 0, color });
  input.value = "";
  render();
  input.focus();
}
document.getElementById("add-team-btn").addEventListener("click", addTeam);
document.getElementById("new-team-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTeam();
});

document.getElementById("reset-scores-btn").addEventListener("click", () => {
  teams.forEach(t => (t.score = 0));
  render();
});

/* =========================================================
   INICIALIZACAO
========================================================= */
render();

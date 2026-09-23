/**
 * PlayMatch — Aplicación Web Preliminar
 * VoxTi Labs · Sistema Pulso · Septiembre 2026
 */

// ============================================================================
// 1. Base de Datos Mock (Jugadores, Torneos y Brackets)
// ============================================================================

const MOCK_PLAYERS = [
  {
    id: 1,
    name: "Ignacio 'Nacho' Silva",
    gamertag: "NachoViper#LAS",
    game: "valorant",
    rank: "Ascendente 2",
    role: "Iniciador / Sova",
    schedule: "noches", // tardes, noches, findes
    scheduleText: "Noches (21:00 - 01:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 4.95,
    honors: ["Cero Tilt", "Shotcaller", "Puntual"],
    bio: "Main Sova y Fade en LAS. Busco dúo para subir a Inmortal sin rage ni toxicidad. Muy comunicativo por Discord.",
    avatarText: "IS",
    winRate: "62%",
    matchesCount: 142
  },
  {
    id: 2,
    name: "Camila 'Mila' Rojas",
    gamertag: "MilaStar#LAS",
    game: "lol",
    rank: "Esmeralda 1",
    role: "Support / Enchanter",
    schedule: "tardes",
    scheduleText: "Tardes (18:00 - 22:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 5.0,
    honors: ["Compañera de Oro", "Buena Vibra", "Paciencia 100%"],
    bio: "Main Nami, Lulu y Taliyah. Jugadora de Santiago. Busco ADC serio para escalar a Diamante y torneos amateur de fin de semana.",
    avatarText: "CR",
    winRate: "58%",
    matchesCount: 210
  },
  {
    id: 3,
    name: "Matías 'Darko' Morales",
    gamertag: "DarkoCS#CL",
    game: "cs2",
    rank: "15,800 CS Rating",
    role: "Entry Fragger / Rifler",
    schedule: "noches",
    scheduleText: "Noches (22:00 - 02:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 4.88,
    honors: ["Coms Claras", "Líder Táctico"],
    bio: "Ex-competidor de torneos locales. Busco trío o squad para Premier en servidores de Chile/Brasil. Micrófono nítido obligatorio.",
    avatarText: "MM",
    winRate: "55%",
    matchesCount: 320
  },
  {
    id: 4,
    name: "Valentina 'Valu' Vega",
    gamertag: "ValuAerial#CL",
    game: "rocket_league",
    rank: "Campeón 2",
    role: "Rotation / Passer",
    schedule: "findes",
    scheduleText: "Fines de semana y tardes",
    mode: "casual",
    mic: "opcional",
    karma: 4.92,
    honors: ["Pases Limpios", "Cero Toxicidad"],
    bio: "Juego 2v2 y 3v3 por diversión y para mejorar pases aéreos. Cero tilteo si cometemos errores. Buena onda ante todo.",
    avatarText: "VV",
    winRate: "59%",
    matchesCount: 95
  },
  {
    id: 5,
    name: "Sebastián 'Basti' Henríquez",
    gamertag: "BastiJg#LAS",
    game: "lol",
    rank: "Platino 2",
    role: "Jungla / Sejuani & Viego",
    schedule: "noches",
    scheduleText: "Noches (20:30 - 00:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 4.85,
    honors: ["Objetivos Claros", "No Tiltea"],
    bio: "Priorizo dragones y ganks temprano. Busco Mid o Toplaner coordinado para dúo en LAS. Duoc UC San Joaquín.",
    avatarText: "SH",
    winRate: "54%",
    matchesCount: 88
  },
  {
    id: 6,
    name: "Fernanda 'Fer' Lagos",
    gamertag: "FerDuelist#99",
    game: "valorant",
    rank: "Diamante 3",
    role: "Duelista / Reyna & Jett",
    schedule: "tardes",
    scheduleText: "Tardes (17:00 - 21:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 4.9,
    honors: ["Entry Preciso", "Gran Aim", "Respetuosa"],
    bio: "Enfocada en subir a Ascendente. Juego limpio, reporto toxicidad inmediatamente y priorizo la buena vibra del equipo.",
    avatarText: "FL",
    winRate: "61%",
    matchesCount: 167
  }
];

const MOCK_TOURNAMENTS = [
  {
    id: "tourney-1",
    title: "Copa Santiago VALORANT 5v5 — Edición Primavera 2026",
    game: "VALORANT",
    gameCode: "valorant",
    status: "Inscripciones Abiertas",
    statusClass: "badge-open",
    prize: "$250.000 CLP + Riot Points",
    date: "Sábado 28 de Septiembre · 16:00 CLT",
    teamsCount: "12 / 16 Equipos",
    mode: "Eliminación Directa (Bo1 / Bo3 Final)",
    server: "Santiago (Chile / LAS)",
    description: "Torneo abierto para escuadras amateur y universitarias. Transmisión comunitaria y anti-cheat estricto."
  },
  {
    id: "tourney-2",
    title: "Torneo Relámpago LoL Grieta del Invocador",
    game: "League of Legends",
    gameCode: "lol",
    status: "Fase de Cuartos en Vivo",
    statusClass: "badge-live",
    prize: "$150.000 CLP",
    date: "En progreso",
    teamsCount: "8 Equipos",
    mode: "Llave de 8 (Bo3)",
    server: "Servidor LAS",
    description: "Competencia de fin de semana para jugadores oro a retador sin equipos profesionales."
  },
  {
    id: "tourney-3",
    title: "CS2 Premier League Chile — Temporada 1",
    game: "Counter-Strike 2",
    gameCode: "cs2",
    status: "Inscripciones Abiertas",
    statusClass: "badge-open",
    prize: "$100.000 CLP + Skins",
    date: "Viernes 04 de Octubre · 20:00 CLT",
    teamsCount: "6 / 8 Equipos",
    mode: "Formato Suizo",
    server: "Servidores 128 Tick Chile",
    description: "Enfocado en medir el nivel táctico de escuadras locales con sistema de veto de mapas MR12."
  }
];

const MOCK_BRACKET = {
  quarterFinals: [
    { teamA: "Los Cóndores Gaming", scoreA: 13, teamB: "Valparaíso Vipers", scoreB: 9, winner: "A" },
    { teamA: "Duoc San Joaquín eSports", scoreA: 13, teamB: "Araucanía Tactics", scoreB: 11, winner: "A" },
    { teamA: "Biobío Blasters", scoreA: 8, teamB: "Antofagasta Aces", scoreB: 13, winner: "B" },
    { teamA: "Santiago Sentinels", scoreA: 13, teamB: "Punta Arenas Frost", scoreB: 4, winner: "A" }
  ],
  semiFinals: [
    { teamA: "Los Cóndores Gaming", scoreA: 2, teamB: "Duoc San Joaquín eSports", scoreB: 1, winner: "A" },
    { teamA: "Antofagasta Aces", scoreA: 0, teamB: "Santiago Sentinels", scoreB: 2, winner: "B" }
  ],
  grandFinal: {
    teamA: "Los Cóndores Gaming",
    scoreA: 1,
    teamB: "Santiago Sentinels",
    scoreB: 2,
    winner: "B",
    champion: "Santiago Sentinels (Campeón 🏆)"
  }
};

// ============================================================================
// 2. Estado de la Aplicación (Local Reactive State)
// ============================================================================

const state = {
  activeTab: "players",
  selectedGame: "all",
  filterRank: "all",
  filterSchedule: "all",
  filterMic: "all",
  filterMode: "all",
  currentUser: {
    name: "Gamer VoxTi",
    gamertag: "VoxTiPlayer#CL",
    karma: 4.96,
    preferredGame: "valorant",
    rank: "Ascendente 1",
    discord: "voxti_player#1337"
  },
  activeLobby: null,
  chatMessages: []
};

// ============================================================================
// 3. Inicialización y Gestión de Modo Día / Noche (Tokens Pulso)
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  renderPlayers();
  renderTournaments();
  renderBracket();
  updateOnlineCounter();
});

function initTheme() {
  const savedMode = localStorage.getItem("pm_theme_mode") || "noche";
  applyTheme(savedMode);

  const toggleBtn = document.getElementById("themeToggleBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-mode") || "noche";
      const next = current === "noche" ? "dia" : "noche";
      applyTheme(next);
    });
  }
}

function applyTheme(mode) {
  document.documentElement.setAttribute("data-mode", mode);
  localStorage.setItem("pm_theme_mode", mode);
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.textContent = mode === "noche" ? "🌙" : "☀️";
  }
}

function updateOnlineCounter() {
  const onlineCount = document.getElementById("onlinePlayersCount");
  if (onlineCount) {
    // Variación realista de jugadores chilenos conectados
    const base = 428;
    const variation = Math.floor(Math.random() * 15);
    onlineCount.textContent = `${base + variation} jugadores online`;
  }
}

// ============================================================================
// 4. Algoritmo de Compatibilidad & Renderizado de Jugadores
// ============================================================================

function calculateCompatibility(player) {
  let score = 75; // base

  // Si coincide en juego preferido
  if (state.selectedGame !== "all" && player.game === state.selectedGame) {
    score += 12;
  } else if (player.game === state.currentUser.preferredGame) {
    score += 10;
  }

  // Compatibilidad por horario
  if (player.schedule === "noches") score += 6;

  // Compatibilidad por micrófono
  if (player.mic === "si") score += 5;

  // Bonus de karma
  if (player.karma >= 4.9) score += 4;

  // Tope en 99%
  return Math.min(score, 99);
}

function renderPlayers() {
  const grid = document.getElementById("playersGrid");
  if (!grid) return;

  const filtered = MOCK_PLAYERS.filter(p => {
    if (state.selectedGame !== "all" && p.game !== state.selectedGame) return false;
    if (state.filterSchedule !== "all" && p.schedule !== state.filterSchedule) return false;
    if (state.filterMic !== "all" && p.mic !== state.filterMic) return false;
    if (state.filterMode !== "all" && p.mode !== state.filterMode) return false;
    return true;
  });

  const countBadge = document.getElementById("resultsCount");
  if (countBadge) {
    countBadge.textContent = `${filtered.length} compañeros disponibles`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-raised); border-radius: 22px; border: 1px dashed var(--border-strong);">
        <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">🎮</p>
        <h3 style="margin-bottom: 0.5rem;">No encontramos jugadores con estos filtros exactos</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Intenta ampliar el rango de horario o elegir cualquier modo de juego.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Restablecer filtros</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(player => {
    const affinity = calculateCompatibility(player);
    return `
      <article class="player-card" data-id="${player.id}">
        <div class="player-card-header">
          <div class="player-meta">
            <div class="player-avatar">
              ${player.avatarText}
              <div class="player-status-badge" title="En línea para jugar"></div>
            </div>
            <div class="player-names">
              <h3>${player.name}</h3>
              <div class="player-game-tag">${player.gamertag}</div>
            </div>
          </div>
          <div class="match-score-badge">
            <div class="match-score-pill">
              <span>⚡</span> ${affinity}%
            </div>
            <span class="match-score-label">Afinidad</span>
          </div>
        </div>

        <div class="player-details-row">
          <span class="tag-pill rank">${player.rank}</span>
          <span class="tag-pill">${player.role}</span>
          <span class="tag-pill karma">★ ${player.karma.toFixed(2)} Karma</span>
          <span class="tag-pill">🎙️ Mic: ${player.mic.toUpperCase()}</span>
        </div>

        <p class="player-bio">"${player.bio}"</p>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
          <span>🕒 ${player.scheduleText}</span>
          <span class="font-mono">Winrate: ${player.winRate}</span>
        </div>

        <div class="player-card-actions">
          <button class="btn btn-primary" style="flex: 1;" onclick="startInstantInvite(${player.id})">
            <span>⚡</span> Invitar a Dúo
          </button>
          <button class="btn btn-secondary btn-sm" onclick="showPlayerProfile(${player.id})">
            Perfil
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// ============================================================================
// 5. Gestión de Filtros
// ============================================================================

function setupEventListeners() {
  // Chips de juego
  document.querySelectorAll(".game-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".game-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.selectedGame = chip.getAttribute("data-game");
      renderPlayers();
    });
  });

  // Selects de filtros
  const scheduleSelect = document.getElementById("filterSchedule");
  if (scheduleSelect) {
    scheduleSelect.addEventListener("change", (e) => {
      state.filterSchedule = e.target.value;
      renderPlayers();
    });
  }

  const micSelect = document.getElementById("filterMic");
  if (micSelect) {
    micSelect.addEventListener("change", (e) => {
      state.filterMic = e.target.value;
      renderPlayers();
    });
  }

  const modeSelect = document.getElementById("filterMode");
  if (modeSelect) {
    modeSelect.addEventListener("change", (e) => {
      state.filterMode = e.target.value;
      renderPlayers();
    });
  }

  // Pestañas principales de navegación
  const navPlayers = document.getElementById("navBtnPlayers");
  const navTourneys = document.getElementById("navBtnTourneys");
  const sectionPlayers = document.getElementById("playersSection");
  const sectionTourneys = document.getElementById("tourneysSection");

  if (navPlayers && navTourneys) {
    navPlayers.addEventListener("click", () => {
      navPlayers.classList.add("active");
      navTourneys.classList.remove("active");
      sectionPlayers.style.display = "block";
      sectionTourneys.style.display = "none";
    });

    navTourneys.addEventListener("click", () => {
      navTourneys.classList.add("active");
      navPlayers.classList.remove("active");
      sectionPlayers.style.display = "none";
      sectionTourneys.style.display = "block";
    });
  }

  // Botón radar de búsqueda rápida
  const quickMatchBtn = document.getElementById("quickMatchBtn");
  if (quickMatchBtn) {
    quickMatchBtn.addEventListener("click", triggerRadarSearch);
  }
}

function resetFilters() {
  state.selectedGame = "all";
  state.filterSchedule = "all";
  state.filterMic = "all";
  state.filterMode = "all";

  document.querySelectorAll(".game-chip").forEach(c => c.classList.remove("active"));
  document.querySelector('.game-chip[data-game="all"]').classList.add("active");

  const s = document.getElementById("filterSchedule");
  const m = document.getElementById("filterMic");
  const mo = document.getElementById("filterMode");
  if (s) s.value = "all";
  if (m) m.value = "all";
  if (mo) mo.value = "all";

  renderPlayers();
}

// ============================================================================
// 6. Simulación de Matchmaking Rápido (Radar)
// ============================================================================

function triggerRadarSearch() {
  const modal = document.getElementById("radarModal");
  const statusTxt = document.getElementById("radarStatusText");
  if (!modal) return;

  modal.classList.add("open");
  statusTxt.textContent = "Buscando compañeros con horarios y rangos afines en Chile...";

  setTimeout(() => {
    statusTxt.textContent = "¡Candidato con 96% de compatibilidad detectado! Negociando sala...";
  }, 1800);

  setTimeout(() => {
    modal.classList.remove("open");
    // Emparejar con Nacho o Camila
    const matchPartner = MOCK_PLAYERS[0];
    startInstantInvite(matchPartner.id);
  }, 3200);
}

function closeRadarModal() {
  const modal = document.getElementById("radarModal");
  if (modal) modal.classList.remove("open");
}

// ============================================================================
// 7. Sala de Lobby & Chat de Coordinación en Vivo
// ============================================================================

function startInstantInvite(playerId) {
  const partner = MOCK_PLAYERS.find(p => p.id === playerId);
  if (!partner) return;

  state.activeLobby = partner;
  state.chatMessages = [
    { sender: "system", text: `Sala PlayMatch creada. Reglas: Cero toxicidad. Conéctate y comparte sala.` },
    { sender: partner.name, text: `¡Hola! Me alegro que hagamos match. Estoy listo para jugar ${partner.game.toUpperCase()}. ¿Me agregas o pasas tu Discord?` }
  ];

  const lobbyModal = document.getElementById("lobbyModal");
  const partnerName = document.getElementById("lobbyPartnerName");
  const partnerTag = document.getElementById("lobbyPartnerTag");
  const partnerGame = document.getElementById("lobbyPartnerGame");
  const partnerAvatar = document.getElementById("lobbyPartnerAvatar");

  if (partnerName) partnerName.textContent = partner.name;
  if (partnerTag) partnerTag.textContent = partner.gamertag;
  if (partnerGame) partnerGame.textContent = `${partner.rank} · ${partner.role}`;
  if (partnerAvatar) partnerAvatar.textContent = partner.avatarText;

  renderChatMessages();
  if (lobbyModal) lobbyModal.classList.add("open");
}

function renderChatMessages() {
  const container = document.getElementById("chatMessagesContainer");
  if (!container) return;

  container.innerHTML = state.chatMessages.map(msg => {
    if (msg.sender === "system") {
      return `<div class="chat-message system">🔔 ${msg.text}</div>`;
    }
    const isMe = msg.sender === "Tú";
    return `
      <div class="chat-message ${isMe ? 'outgoing' : 'incoming'}">
        <span class="chat-sender-name">${msg.sender}</span>
        <span>${msg.text}</span>
      </div>
    `;
  }).join("");

  container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  state.chatMessages.push({ sender: "Tú", text });
  input.value = "";
  renderChatMessages();

  // Simulación de respuesta reactiva del compañero
  setTimeout(() => {
    if (state.activeLobby) {
      const responses = [
        "¡Excelente! Te acabo de enviar solicitud de amistad en el juego.",
        "Dale, ya me metí a la sala de Discord. Te espero ahí.",
        "Listo, dale 'Ready' y buscamos partida."
      ];
      const randomResp = responses[Math.floor(Math.random() * responses.length)];
      state.chatMessages.push({ sender: state.activeLobby.name, text: randomResp });
      renderChatMessages();
    }
  }, 1200);
}

function copyGamerTag() {
  if (!state.activeLobby) return;
  navigator.clipboard.writeText(state.activeLobby.gamertag);
  showToast(`¡Gamertag "${state.activeLobby.gamertag}" copiado al portapapeles!`);
}

function copyDiscordTag() {
  const discordTag = `${state.activeLobby.name.toLowerCase().replace(/[^a-z]/g, "")}_cl#2026`;
  navigator.clipboard.writeText(discordTag);
  showToast(`¡Discord Tag "${discordTag}" copiado!`);
}

function closeLobbyModal() {
  const modal = document.getElementById("lobbyModal");
  if (modal) modal.classList.remove("open");
}

function finishMatchAndRate() {
  closeLobbyModal();
  openKarmaModal(state.activeLobby);
}

// ============================================================================
// 8. Sistema de Reputación & Karma Anti-Toxicidad
// ============================================================================

let currentRatingPlayer = null;

function openKarmaModal(player) {
  currentRatingPlayer = player;
  const modal = document.getElementById("karmaModal");
  const nameEl = document.getElementById("karmaPlayerName");
  if (nameEl && player) nameEl.textContent = player.name;
  if (modal) modal.classList.add("open");
}

function closeKarmaModal() {
  const modal = document.getElementById("karmaModal");
  if (modal) modal.classList.remove("open");
}

function submitKarmaFeedback() {
  if (currentRatingPlayer) {
    currentRatingPlayer.karma = Math.min(5.0, currentRatingPlayer.karma + 0.02);
    renderPlayers();
    showToast(`¡Honor registrado para ${currentRatingPlayer.name}! Gracias por promover un gaming sin toxicidad.`);
  }
  closeKarmaModal();
}

// ============================================================================
// 9. Módulo de Torneos & Renderizado de Brackets
// ============================================================================

function renderTournaments() {
  const container = document.getElementById("tournamentsList");
  if (!container) return;

  container.innerHTML = MOCK_TOURNAMENTS.map(t => `
    <article class="tournament-card">
      <div>
        <div class="tournament-status-bar">
          <span class="tournament-game-badge ${t.statusClass}">${t.game}</span>
          <span class="tag-pill" style="font-size: 0.75rem;">${t.status}</span>
        </div>
        <h3 style="margin: 0.75rem 0 0.5rem; font-size: 1.25rem;">${t.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">${t.description}</p>
        
        <ul class="tournament-meta-list">
          <li>🏆 Premio: <strong>${t.prize}</strong></li>
          <li>📅 Fecha: <strong>${t.date}</strong></li>
          <li>👥 Cupos: <strong>${t.teamsCount}</strong></li>
          <li>⚔️ Formato: <strong>${t.mode}</strong></li>
        </ul>
      </div>

      <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
        <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="openRegisterTournamentModal('${t.id}')">
          Inscribirme
        </button>
        <button class="btn btn-secondary btn-sm" onclick="scrollToBracket()">
          Ver Llave
        </button>
      </div>
    </article>
  `).join("");
}

function renderBracket() {
  const qfContainer = document.getElementById("bracketQuarterFinals");
  const sfContainer = document.getElementById("bracketSemiFinals");
  const gfContainer = document.getElementById("bracketGrandFinal");

  if (!qfContainer || !sfContainer || !gfContainer) return;

  // Cuartos
  qfContainer.innerHTML = MOCK_BRACKET.quarterFinals.map(m => `
    <div class="match-box">
      <div class="match-team ${m.winner === 'A' ? 'winner' : ''}">
        <span>${m.teamA}</span>
        <span class="match-score">${m.scoreA}</span>
      </div>
      <div class="match-team ${m.winner === 'B' ? 'winner' : ''}">
        <span>${m.teamB}</span>
        <span class="match-score">${m.scoreB}</span>
      </div>
    </div>
  `).join("");

  // Semifinales
  sfContainer.innerHTML = MOCK_BRACKET.semiFinals.map(m => `
    <div class="match-box">
      <div class="match-team ${m.winner === 'A' ? 'winner' : ''}">
        <span>${m.teamA}</span>
        <span class="match-score">${m.scoreA}</span>
      </div>
      <div class="match-team ${m.winner === 'B' ? 'winner' : ''}">
        <span>${m.teamB}</span>
        <span class="match-score">${m.scoreB}</span>
      </div>
    </div>
  `).join("");

  // Gran Final
  const gf = MOCK_BRACKET.grandFinal;
  gfContainer.innerHTML = `
    <div class="match-box" style="border: 2px solid var(--accent-cyan); box-shadow: var(--glow-cyan);">
      <div class="match-team ${gf.winner === 'A' ? 'winner' : ''}">
        <span>${gf.teamA}</span>
        <span class="match-score">${gf.scoreA}</span>
      </div>
      <div class="match-team ${gf.winner === 'B' ? 'winner' : ''}">
        <span>${gf.teamB}</span>
        <span class="match-score">${gf.scoreB}</span>
      </div>
    </div>
    <div style="margin-top: 1rem; text-align: center; font-family: 'Outfit', sans-serif; font-weight: 700; color: var(--accent-cyan); font-size: 0.95rem;">
      ${gf.champion}
    </div>
  `;
}

function scrollToBracket() {
  const el = document.getElementById("bracketSection");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function openRegisterTournamentModal(tournamentId) {
  const t = MOCK_TOURNAMENTS.find(item => item.id === tournamentId);
  const modal = document.getElementById("registerTournamentModal");
  const nameEl = document.getElementById("registerTournamentTitle");
  if (nameEl && t) nameEl.textContent = t.title;
  if (modal) modal.classList.add("open");
}

function closeRegisterTournamentModal() {
  const modal = document.getElementById("registerTournamentModal");
  if (modal) modal.classList.remove("open");
}

function confirmTournamentRegistration() {
  const teamInput = document.getElementById("teamNameInput");
  const teamName = teamInput && teamInput.value.trim() ? teamInput.value.trim() : "Escuadra VoxTi";
  showToast(`¡Inscripción confirmada para "${teamName}"! Se enviaron las instrucciones a tu correo.`);
  closeRegisterTournamentModal();
}

// ============================================================================
// 10. Perfil del Usuario
// ============================================================================

function showPlayerProfile(playerId) {
  const player = MOCK_PLAYERS.find(p => p.id === playerId);
  if (!player) return;

  const modal = document.getElementById("profileModal");
  const body = document.getElementById("profileModalBody");
  if (!body || !modal) return;

  body.innerHTML = `
    <div style="display: flex; align-items: center; gap: 1.25rem;">
      <div class="player-avatar" style="width: 72px; height: 72px; font-size: 2rem;">
        ${player.avatarText}
      </div>
      <div>
        <h3 style="font-size: 1.5rem;">${player.name}</h3>
        <p class="font-mono" style="color: var(--text-muted);">${player.gamertag}</p>
        <span class="tag-pill karma" style="margin-top: 0.25rem;">★ ${player.karma.toFixed(2)} Índice de Convivencia</span>
      </div>
    </div>

    <div style="background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem;">
      <h4 style="margin-bottom: 0.5rem;">Insignias Comunitarias Otorgadas</h4>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${player.honors.map(h => `<span class="tag-pill" style="background: var(--good-soft); color: var(--good-text); border: 1px solid var(--good-soft-br);">🛡️ ${h}</span>`).join("")}
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
      <div style="background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: 1rem;">
        <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Winrate</span>
        <div class="stat-value" style="font-size: 1.4rem; font-weight: 700; color: var(--action);">${player.winRate}</div>
      </div>
      <div style="background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: 1rem;">
        <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Matches</span>
        <div class="stat-value" style="font-size: 1.4rem; font-weight: 700; color: var(--text);">${player.matchesCount}</div>
      </div>
      <div style="background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: 1rem;">
        <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Toxicidad</span>
        <div class="stat-value" style="font-size: 1.4rem; font-weight: 700; color: var(--good-text);">0.0%</div>
      </div>
    </div>

    <div>
      <h4 style="margin-bottom: 0.5rem;">Acerca del jugador</h4>
      <p style="color: var(--text-body); background: var(--bg); padding: 1rem; border-radius: 14px; border: 1px solid var(--border);">${player.bio}</p>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
      <button class="btn btn-secondary btn-sm" onclick="closeProfileModal()">Cerrar</button>
      <button class="btn btn-primary btn-sm" onclick="closeProfileModal(); startInstantInvite(${player.id})">Invitar a Jugar</button>
    </div>
  `;

  modal.classList.add("open");
}

function closeProfileModal() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.classList.remove("open");
}

// ============================================================================
// 11. Notificaciones Toast
// ============================================================================

function showToast(message) {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--text);
    color: var(--bg);
    padding: 0.85rem 1.4rem;
    border-radius: 14px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 9999;
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

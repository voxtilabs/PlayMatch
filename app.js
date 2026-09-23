/**
 * PlayMatch — Lógica de Aplicación
 * VoxTi Labs · Versión 2.0 · Neumorfismo Elegante & SVGs Limpios (Cero Emojis)
 */

// ============================================================================
// 1. Catálogo de Iconos SVG Vectoriales (Sin Emojis)
// ============================================================================

const ICONS = {
  lightning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 21 12 17 16 21"></polyline><line x1="12" y1="17" x2="12" y2="21"></line><path d="M7 4H4a2 2 0 0 0-2 2v2a5 5 0 0 0 5 5h1"></path><path d="M17 4h3a2 2 0 0 1 2 2v2a5 5 0 0 1-5 5h-1"></path><rect x="7" y="2" width="10" height="11" rx="2"></rect></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="4"></rect></svg>`,
  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
};

// ============================================================================
// 2. Base de Datos Mock
// ============================================================================

const MOCK_PLAYERS = [
  {
    id: 1,
    name: "Ignacio Silva",
    gamertag: "NachoViper#LAS",
    game: "valorant",
    rank: "Ascendente 2",
    role: "Iniciador / Sova",
    schedule: "noches",
    scheduleText: "Noches (21:00 - 01:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 4.95,
    honors: ["Conducta Impecable", "Liderazgo Tactico", "Puntualidad"],
    bio: "Especialista en iniciación y reconocimiento en servidores de Santiago. Busco dúo con comunicación sólida para escalar a Inmortal.",
    avatarText: "IS",
    winRate: "62%",
    matchesCount: 142
  },
  {
    id: 2,
    name: "Camila Rojas",
    gamertag: "MilaStar#LAS",
    game: "lol",
    rank: "Esmeralda 1",
    role: "Soporte / Utilidad",
    schedule: "tardes",
    scheduleText: "Tardes (18:00 - 22:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 5.0,
    honors: ["Espiritu de Equipo", "Paciencia Plena", "Buena Coordinacion"],
    bio: "Main Nami, Lulu y Taliyah en LAS. Busco ADC coordinado para escalar a Diamante y competir en torneos comunitarios.",
    avatarText: "CR",
    winRate: "58%",
    matchesCount: 210
  },
  {
    id: 3,
    name: "Matias Morales",
    gamertag: "DarkoCS#CL",
    game: "cs2",
    rank: "15,800 CS Rating",
    role: "Entry Fragger / Rifler",
    schedule: "noches",
    scheduleText: "Noches (22:00 - 02:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 4.88,
    honors: ["Coms Claras", "Juego Colectivo"],
    bio: "Ex-competidor de ligas locales. Busco trío o escuadra para Premier con servidores de baja latencia en Chile.",
    avatarText: "MM",
    winRate: "55%",
    matchesCount: 320
  },
  {
    id: 4,
    name: "Valentina Vega",
    gamertag: "ValuAerial#CL",
    game: "rocket_league",
    rank: "Campeon 2",
    role: "Rotacion y Asistencias",
    schedule: "findes",
    scheduleText: "Fines de semana y tardes",
    mode: "casual",
    mic: "opcional",
    karma: 4.92,
    honors: ["Juego Limpio", "Solidaridad en Partida"],
    bio: "Partidas 2v2 y 3v3 orientadas a mejorar mecanicas de rotacion y juego aereo. Ambiente sereno y libre de frustracion.",
    avatarText: "VV",
    winRate: "59%",
    matchesCount: 95
  },
  {
    id: 5,
    name: "Sebastian Henriquez",
    gamertag: "BastiJg#LAS",
    game: "lol",
    rank: "Platino 2",
    role: "Jungla / Sejuani & Viego",
    schedule: "noches",
    scheduleText: "Noches (20:30 - 00:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 4.85,
    honors: ["Control de Objetivos", "Mentalidad Firme"],
    bio: "Prioridad en vision de mapa y aseguramiento de objetivos tempranos. Busco linea central solida para emparejamiento constante.",
    avatarText: "SH",
    winRate: "54%",
    matchesCount: 88
  },
  {
    id: 6,
    name: "Fernanda Lagos",
    gamertag: "FerDuelist#99",
    game: "valorant",
    rank: "Diamante 3",
    role: "Duelista / Reyna & Jett",
    schedule: "tardes",
    scheduleText: "Tardes (17:00 - 21:00 CLT)",
    mode: "ranked",
    mic: "si",
    karma: 4.9,
    honors: ["Apertura de Sitio", "Excelente Comunicacion"],
    bio: "Enfocada en transicionar a Ascendente. Juego responsable, respeto mutuo y alta disciplina en rondas de compra economica.",
    avatarText: "FL",
    winRate: "61%",
    matchesCount: 167
  }
];

const MOCK_TOURNAMENTS = [
  {
    id: "tourney-1",
    title: "Copa Santiago VALORANT 5v5 — Apertura 2026",
    game: "VALORANT",
    gameCode: "valorant",
    status: "Inscripciones Abiertas",
    prize: "$250.000 CLP + Riot Points",
    date: "Sabado 28 de Septiembre · 16:00 CLT",
    teamsCount: "12 / 16 Escuadras",
    mode: "Eliminacion Directa (Bo1 / Bo3 Final)",
    server: "Santiago (Chile / LAS)",
    description: "Competencia oficial para escuadras amateur y universitarias. Validacion de plantillas y transmision comunitaria."
  },
  {
    id: "tourney-2",
    title: "Torneo Grieta del Invocador — Primavera",
    game: "League of Legends",
    gameCode: "lol",
    status: "Fase de Cuartos en Curso",
    prize: "$150.000 CLP",
    date: "En desarrollo",
    teamsCount: "8 Escuadras",
    mode: "Llave de 8 (Bo3)",
    server: "Servidor LAS",
    description: "Enfocado en escuadras locales sin participacion profesional previa. Reglas de torneo de alta disciplina."
  },
  {
    id: "tourney-3",
    title: "CS2 Premier League Chile — Temporada 1",
    game: "Counter-Strike 2",
    gameCode: "cs2",
    status: "Inscripciones Abiertas",
    prize: "$100.000 CLP + Trofeos",
    date: "Viernes 04 de Octubre · 20:00 CLT",
    teamsCount: "6 / 8 Escuadras",
    mode: "Formato Suizo",
    server: "Servidores Oficiales Chile",
    description: "Certamen tactico estructurado con sistema de veto de mapas MR12 y grabacion obligatoria de demostraciones."
  }
];

const MOCK_BRACKET = {
  quarterFinals: [
    { teamA: "Los Condores Gaming", scoreA: 13, teamB: "Valparaiso Vipers", scoreB: 9, winner: "A" },
    { teamA: "Duoc San Joaquin eSports", scoreA: 13, teamB: "Araucania Tactics", scoreB: 11, winner: "A" },
    { teamA: "Biobio Blasters", scoreA: 8, teamB: "Antofagasta Aces", scoreB: 13, winner: "B" },
    { teamA: "Santiago Sentinels", scoreA: 13, teamB: "Punta Arenas Frost", scoreB: 4, winner: "A" }
  ],
  semiFinals: [
    { teamA: "Los Condores Gaming", scoreA: 2, teamB: "Duoc San Joaquin eSports", scoreB: 1, winner: "A" },
    { teamA: "Antofagasta Aces", scoreA: 0, teamB: "Santiago Sentinels", scoreB: 2, winner: "B" }
  ],
  grandFinal: {
    teamA: "Los Condores Gaming",
    scoreA: 1,
    teamB: "Santiago Sentinels",
    scoreB: 2,
    winner: "B",
    champion: "Santiago Sentinels (Campeon Oficial)"
  }
};

// ============================================================================
// 3. Estado de la Aplicación
// ============================================================================

const state = {
  activeTab: "players",
  selectedGame: "all",
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
// 4. Inicialización
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
  const container = document.getElementById("themeIconContainer");
  if (container) {
    container.innerHTML = mode === "noche" ? ICONS.moon : ICONS.sun;
  }
}

function updateOnlineCounter() {
  const onlineCount = document.getElementById("onlinePlayersCount");
  if (onlineCount) {
    const base = 428;
    const variation = Math.floor(Math.random() * 15);
    onlineCount.textContent = `${base + variation} jugadores online`;
  }
}

// ============================================================================
// 5. Motor de Afinidad y Renderizado de Jugadores
// ============================================================================

function calculateCompatibility(player) {
  let score = 75;
  if (state.selectedGame !== "all" && player.game === state.selectedGame) score += 12;
  else if (player.game === state.currentUser.preferredGame) score += 10;
  if (player.schedule === "noches") score += 6;
  if (player.mic === "si") score += 5;
  if (player.karma >= 4.9) score += 4;
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
    countBadge.textContent = `${filtered.length} companeros disponibles`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: 24px; box-shadow: var(--neu-flat); border: 1px solid var(--border-subtle);">
        <div style="width: 48px; height: 48px; margin: 0 auto 1rem; color: var(--text-muted);">${ICONS.users}</div>
        <h3 style="margin-bottom: 0.5rem;">Sin coincidencias exactas</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.92rem;">Amplia los parametros de horario o selecciona otro estilo de juego.</p>
        <button class="neu-btn neu-btn-sm" onclick="resetFilters()">Restablecer filtros</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(player => {
    const affinity = calculateCompatibility(player);
    return `
      <article class="neu-card" data-id="${player.id}">
        <div class="card-top">
          <div class="player-info-cluster">
            <div class="avatar-emboss">
              ${player.avatarText}
              <div class="online-dot-subtle" title="En linea"></div>
            </div>
            <div class="player-headings">
              <h3>${player.name}</h3>
              <div class="gamertag-sub">${player.gamertag}</div>
            </div>
          </div>
          <div class="affinity-badge">
            <div class="affinity-pill">
              ${ICONS.lightning} ${affinity}%
            </div>
            <span class="affinity-label">Afinidad</span>
          </div>
        </div>

        <div class="badges-row">
          <span class="neu-pill-tag rank-accent">${player.rank}</span>
          <span class="neu-pill-tag">${player.role}</span>
          <span class="neu-pill-tag karma-accent">${ICONS.star} ${player.karma.toFixed(2)} Karma</span>
          <span class="neu-pill-tag">${ICONS.mic} Mic: ${player.mic.toUpperCase()}</span>
        </div>

        <p class="card-bio-plate">"${player.bio}"</p>

        <div class="card-foot-meta">
          <span>${ICONS.clock} ${player.scheduleText}</span>
          <span class="font-mono">Victoria: ${player.winRate}</span>
        </div>

        <div style="display: flex; gap: 0.85rem; margin-top: 0.35rem;">
          <button class="neu-btn neu-btn-primary" style="flex: 1;" onclick="startInstantInvite(${player.id})">
            ${ICONS.lightning} Invitar a Duo
          </button>
          <button class="neu-btn neu-btn-sm" onclick="showPlayerProfile(${player.id})">
            Ficha
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// ============================================================================
// 6. Gestion de Eventos y Filtros
// ============================================================================

function setupEventListeners() {
  document.querySelectorAll(".neu-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".neu-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.selectedGame = chip.getAttribute("data-game");
      renderPlayers();
    });
  });

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

  document.querySelectorAll(".neu-chip").forEach(c => c.classList.remove("active"));
  document.querySelector('.neu-chip[data-game="all"]').classList.add("active");

  const s = document.getElementById("filterSchedule");
  const m = document.getElementById("filterMic");
  const mo = document.getElementById("filterMode");
  if (s) s.value = "all";
  if (m) m.value = "all";
  if (mo) mo.value = "all";

  renderPlayers();
}

// ============================================================================
// 7. Busqueda Rapida
// ============================================================================

function triggerRadarSearch() {
  const modal = document.getElementById("radarModal");
  const statusTxt = document.getElementById("radarStatusText");
  if (!modal) return;

  modal.classList.add("open");
  statusTxt.textContent = "Evaluando perfiles con rangos y horarios afines en servidores locales...";

  setTimeout(() => {
    statusTxt.textContent = "Candidato con 96% de compatibilidad verificado. Creando sala de coordinacion...";
  }, 1600);

  setTimeout(() => {
    modal.classList.remove("open");
    const matchPartner = MOCK_PLAYERS[0];
    startInstantInvite(matchPartner.id);
  }, 2900);
}

function closeRadarModal() {
  const modal = document.getElementById("radarModal");
  if (modal) modal.classList.remove("open");
}

// ============================================================================
// 8. Sala de Coordinacion y Mensajeria Instantanea
// ============================================================================

function startInstantInvite(playerId) {
  const partner = MOCK_PLAYERS.find(p => p.id === playerId);
  if (!partner) return;

  state.activeLobby = partner;
  state.chatMessages = [
    { sender: "system", text: `Canal privado establecido. Cero toxicidad. Coordina IDs y servidor.` },
    { sender: partner.name, text: `Hola. Confirmo disponibilidad para jugar ${partner.game.toUpperCase()}. Pasame tu Discord o ID de juego para invitar.` }
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
      return `<div class="chat-bubble system-alert">${msg.text}</div>`;
    }
    const isMe = msg.sender === "Tu";
    return `
      <div class="chat-bubble ${isMe ? 'outbound' : 'inbound'}">
        <span class="chat-author">${msg.sender}</span>
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
  state.chatMessages.push({ sender: "Tu", text });
  input.value = "";
  renderChatMessages();

  setTimeout(() => {
    if (state.activeLobby) {
      const responses = [
        "Solicitud enviada en el cliente de juego. Revisa tus notificaciones.",
        "Conectado a la sala de voz de Discord. Te espero para iniciar.",
        "Listo, marca tu estado para iniciar busqueda de partida."
      ];
      const randomResp = responses[Math.floor(Math.random() * responses.length)];
      state.chatMessages.push({ sender: state.activeLobby.name, text: randomResp });
      renderChatMessages();
    }
  }, 1100);
}

function copyGamerTag() {
  if (!state.activeLobby) return;
  navigator.clipboard.writeText(state.activeLobby.gamertag);
  showToast(`Gamertag copiado: ${state.activeLobby.gamertag}`);
}

function copyDiscordTag() {
  const discordTag = `${state.activeLobby.name.toLowerCase().replace(/[^a-z]/g, "")}_cl#2026`;
  navigator.clipboard.writeText(discordTag);
  showToast(`Discord ID copiado: ${discordTag}`);
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
// 9. Sistema de Reconocimiento y Karma (Anti-Toxicidad)
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
    showToast(`Valoracion registrada para ${currentRatingPlayer.name}. Reconocimiento añadido.`);
  }
  closeKarmaModal();
}

// ============================================================================
// 10. Torneos y Visualizador de Brackets
// ============================================================================

function renderTournaments() {
  const container = document.getElementById("tournamentsList");
  if (!container) return;

  container.innerHTML = MOCK_TOURNAMENTS.map(t => `
    <article class="tourney-item-card">
      <div>
        <div class="tourney-top-status">
          <span class="neu-pill-tag rank-accent">${t.game}</span>
          <span class="neu-pill-tag" style="font-size: 0.72rem;">${t.status}</span>
        </div>
        <h3 style="margin: 0.9rem 0 0.5rem; font-size: 1.25rem;">${t.title}</h3>
        <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 1.25rem;">${t.description}</p>
        
        <ul class="meta-spec-list">
          <li>${ICONS.trophy} <span>Premio: <strong>${t.prize}</strong></span></li>
          <li>${ICONS.clock} <span>Fecha: <strong>${t.date}</strong></span></li>
          <li>${ICONS.users} <span>Cupos: <strong>${t.teamsCount}</strong></span></li>
          <li>${ICONS.shield} <span>Formato: <strong>${t.mode}</strong></span></li>
        </ul>
      </div>

      <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
        <button class="neu-btn neu-btn-primary neu-btn-sm" style="flex: 1;" onclick="openRegisterTournamentModal('${t.id}')">
          Inscripcion
        </button>
        <button class="neu-btn neu-btn-sm" onclick="scrollToBracket()">
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
    <div class="match-tile-plate">
      <div class="match-team-row ${m.winner === 'A' ? 'winner-row' : ''}">
        <span>${m.teamA}</span>
        <span class="score-badge-neu">${m.scoreA}</span>
      </div>
      <div class="match-team-row ${m.winner === 'B' ? 'winner-row' : ''}">
        <span>${m.teamB}</span>
        <span class="score-badge-neu">${m.scoreB}</span>
      </div>
    </div>
  `).join("");

  // Semifinales
  sfContainer.innerHTML = MOCK_BRACKET.semiFinals.map(m => `
    <div class="match-tile-plate">
      <div class="match-team-row ${m.winner === 'A' ? 'winner-row' : ''}">
        <span>${m.teamA}</span>
        <span class="score-badge-neu">${m.scoreA}</span>
      </div>
      <div class="match-team-row ${m.winner === 'B' ? 'winner-row' : ''}">
        <span>${m.teamB}</span>
        <span class="score-badge-neu">${m.scoreB}</span>
      </div>
    </div>
  `).join("");

  // Gran Final
  const gf = MOCK_BRACKET.grandFinal;
  gfContainer.innerHTML = `
    <div class="match-tile-plate" style="border: 1px solid var(--accent-mint); box-shadow: var(--neu-flat);">
      <div class="match-team-row ${gf.winner === 'A' ? 'winner-row' : ''}">
        <span>${gf.teamA}</span>
        <span class="score-badge-neu">${gf.scoreA}</span>
      </div>
      <div class="match-team-row ${gf.winner === 'B' ? 'winner-row' : ''}">
        <span>${gf.teamB}</span>
        <span class="score-badge-neu">${gf.scoreB}</span>
      </div>
    </div>
    <div style="margin-top: 1.15rem; text-align: center; font-family: 'Outfit', sans-serif; font-weight: 700; color: var(--accent-mint); font-size: 0.95rem;">
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
  showToast(`Inscripcion oficial procesada para: ${teamName}`);
  closeRegisterTournamentModal();
}

// ============================================================================
// 11. Perfil del Usuario
// ============================================================================

function showPlayerProfile(playerId) {
  const player = MOCK_PLAYERS.find(p => p.id === playerId);
  if (!player) return;

  const modal = document.getElementById("profileModal");
  const body = document.getElementById("profileModalBody");
  if (!body || !modal) return;

  body.innerHTML = `
    <div style="display: flex; align-items: center; gap: 1.25rem;">
      <div class="avatar-emboss" style="width: 72px; height: 72px; font-size: 1.8rem;">
        ${player.avatarText}
      </div>
      <div>
        <h3 style="font-size: 1.45rem;">${player.name}</h3>
        <p class="font-mono" style="color: var(--text-muted); font-size: 0.85rem;">${player.gamertag}</p>
        <span class="neu-pill-tag karma-accent" style="margin-top: 0.4rem;">
          ${ICONS.star} ${player.karma.toFixed(2)} Indice de Convivencia
        </span>
      </div>
    </div>

    <div style="background: var(--bg-sunken); box-shadow: var(--neu-pressed-sm); border-radius: 18px; padding: 1.25rem;">
      <h4 style="margin-bottom: 0.65rem; font-size: 0.92rem;">Insignias de Reconocimiento</h4>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${player.honors.map(h => `
          <span class="neu-pill-tag" style="color: var(--accent-mint);">
            ${ICONS.shield} ${h}
          </span>
        `).join("")}
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
      <div style="background: var(--bg-card); box-shadow: var(--neu-flat-xs); border-radius: 14px; padding: 1rem; border: 1px solid var(--border-subtle);">
        <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Winrate</span>
        <div class="stat-value" style="font-size: 1.35rem; font-weight: 700; color: var(--primary);">${player.winRate}</div>
      </div>
      <div style="background: var(--bg-card); box-shadow: var(--neu-flat-xs); border-radius: 14px; padding: 1rem; border: 1px solid var(--border-subtle);">
        <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Partidas</span>
        <div class="stat-value" style="font-size: 1.35rem; font-weight: 700; color: var(--text);">${player.matchesCount}</div>
      </div>
      <div style="background: var(--bg-card); box-shadow: var(--neu-flat-xs); border-radius: 14px; padding: 1rem; border: 1px solid var(--border-subtle);">
        <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Toxicidad</span>
        <div class="stat-value" style="font-size: 1.35rem; font-weight: 700; color: var(--accent-mint);">0.0%</div>
      </div>
    </div>

    <div>
      <h4 style="margin-bottom: 0.45rem; font-size: 0.92rem;">Descripcion del Jugador</h4>
      <p style="color: var(--text-body); background: var(--bg-sunken); box-shadow: var(--neu-pressed-sm); padding: 1rem; border-radius: 14px; font-size: 0.88rem;">${player.bio}</p>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
      <button class="neu-btn neu-btn-sm" onclick="closeProfileModal()">Cerrar</button>
      <button class="neu-btn neu-btn-primary neu-btn-sm" onclick="closeProfileModal(); startInstantInvite(${player.id})">
        ${ICONS.lightning} Invitar
      </button>
    </div>
  `;

  modal.classList.add("open");
}

function closeProfileModal() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.classList.remove("open");
}

// ============================================================================
// 12. Notificaciones Toast Neumórficas
// ============================================================================

function showToast(message) {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--bg-card);
    color: var(--text);
    padding: 0.9rem 1.45rem;
    border-radius: 16px;
    font-size: 0.88rem;
    font-weight: 600;
    box-shadow: var(--neu-floating);
    border: 1px solid var(--border-subtle);
    z-index: 9999;
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0;
    transform: translateY(16px);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(16px)";
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

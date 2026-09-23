import React, { useState, useEffect } from 'react';
import PreferencesIsland from './PreferencesIsland';

interface Player {
  id: number;
  name: string;
  gamertag: string;
  game: string;
  rank: string;
  role: string;
  schedule: string;
  scheduleText: string;
  mode: string;
  mic: string;
  karma: number;
  honors: string[];
  bio: string;
  avatarText: string;
  winRate: string;
  matchesCount: number;
}

const PLAYERS_DATA: Player[] = [
  {
    id: 1,
    name: 'Ignacio Silva',
    gamertag: 'NachoViper#LAS',
    game: 'valorant',
    rank: 'Ascendente 2',
    role: 'Iniciador / Sova',
    schedule: 'noches',
    scheduleText: 'Noches (21:00 - 01:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.95,
    honors: ['Conducta Impecable', 'Liderazgo Táctico', 'Puntualidad'],
    bio: 'Especialista en iniciación y reconocimiento en servidores de Santiago. Busco dúo con comunicación sólida para escalar a Inmortal.',
    avatarText: 'IS',
    winRate: '62%',
    matchesCount: 142
  },
  {
    id: 2,
    name: 'Camila Rojas',
    gamertag: 'MilaStar#LAS',
    game: 'lol',
    rank: 'Esmeralda 1',
    role: 'Soporte / Utilidad',
    schedule: 'tardes',
    scheduleText: 'Tardes (18:00 - 22:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 5.0,
    honors: ['Espíritu de Equipo', 'Paciencia Plena', 'Buena Coordinación'],
    bio: 'Main Nami, Lulu y Taliyah en LAS. Busco ADC coordinado para escalar a Diamante y competir en torneos comunitarios.',
    avatarText: 'CR',
    winRate: '58%',
    matchesCount: 210
  },
  {
    id: 3,
    name: 'Matías Morales',
    gamertag: 'DarkoCS#CL',
    game: 'cs2',
    rank: '15,800 CS Rating',
    role: 'Entry Fragger / Rifler',
    schedule: 'noches',
    scheduleText: 'Noches (22:00 - 02:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.88,
    honors: ['Coms Claras', 'Juego Colectivo'],
    bio: 'Ex-competidor de ligas locales. Busco trío o escuadra para Premier con servidores de baja latencia en Chile.',
    avatarText: 'MM',
    winRate: '55%',
    matchesCount: 320
  },
  {
    id: 4,
    name: 'Valentina Vega',
    gamertag: 'ValuAerial#CL',
    game: 'rocket_league',
    rank: 'Campeón 2',
    role: 'Rotación y Asistencias',
    schedule: 'findes',
    scheduleText: 'Fines de semana y tardes',
    mode: 'casual',
    mic: 'opcional',
    karma: 4.92,
    honors: ['Juego Limpio', 'Solidaridad en Partida'],
    bio: 'Partidas 2v2 y 3v3 orientadas a mejorar mecánicas de rotación y juego aéreo. Ambiente sereno y libre de frustración.',
    avatarText: 'VV',
    winRate: '59%',
    matchesCount: 95
  },
  {
    id: 5,
    name: 'Sebastián Henríquez',
    gamertag: 'BastiJg#LAS',
    game: 'lol',
    rank: 'Platino 2',
    role: 'Jungla / Sejuani & Viego',
    schedule: 'noches',
    scheduleText: 'Noches (20:30 - 00:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.85,
    honors: ['Control de Objetivos', 'Mentalidad Firme'],
    bio: 'Prioridad en visión de mapa y aseguramiento de objetivos tempranos. Busco línea central sólida para emparejamiento constante.',
    avatarText: 'SH',
    winRate: '54%',
    matchesCount: 88
  },
  {
    id: 6,
    name: 'Fernanda Lagos',
    gamertag: 'FerDuelist#99',
    game: 'valorant',
    rank: 'Diamante 3',
    role: 'Duelista / Reyna & Jett',
    schedule: 'tardes',
    scheduleText: 'Tardes (17:00 - 21:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.9,
    honors: ['Apertura de Sitio', 'Excelente Comunicación'],
    bio: 'Enfocada en transicionar a Ascendente. Juego responsable, respeto mutuo y alta disciplina en rondas de compra económica.',
    avatarText: 'FL',
    winRate: '61%',
    matchesCount: 167
  }
];

export default function MatchmakingFeed() {
  const [selectedGame, setSelectedGame] = useState('all');
  const [filterSchedule, setFilterSchedule] = useState('all');
  const [filterMic, setFilterMic] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const [userPreferences, setUserPreferences] = useState<string[]>(['valorant', 'lol']);

  useEffect(() => {
    const handlePrefUpdate = (e: any) => {
      if (e.detail?.preferences) {
        setUserPreferences(e.detail.preferences);
      }
    };
    window.addEventListener('preferences-updated', handlePrefUpdate);
    return () => window.removeEventListener('preferences-updated', handlePrefUpdate);
  }, []);

  const calculateCompatibility = (player: Player) => {
    let score = 70;
    if (userPreferences.includes(player.game)) score += 16;
    if (selectedGame !== 'all' && player.game === selectedGame) score += 8;
    if (player.schedule === 'noches') score += 5;
    if (player.mic === 'si') score += 4;
    if (player.karma >= 4.9) score += 4;
    return Math.min(score, 99);
  };

  const filteredPlayers = PLAYERS_DATA.filter(p => {
    if (selectedGame !== 'all' && p.game !== selectedGame) return false;
    if (filterSchedule !== 'all' && p.schedule !== filterSchedule) return false;
    if (filterMic !== 'all' && p.mic !== filterMic) return false;
    if (filterMode !== 'all' && p.mode !== filterMode) return false;
    return true;
  }).sort((a, b) => calculateCompatibility(b) - calculateCompatibility(a));

  const resetFilters = () => {
    setSelectedGame('all');
    setFilterSchedule('all');
    setFilterMic('all');
    setFilterMode('all');
  };

  const openRadar = () => {
    window.dispatchEvent(new CustomEvent('open-radar-modal'));
  };

  const openLobby = (player: Player) => {
    window.dispatchEvent(new CustomEvent('open-lobby-modal', { detail: { player } }));
  };

  const openProfile = (playerId: number) => {
    window.dispatchEvent(new CustomEvent('open-player-profile', { detail: { id: playerId } }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
      
      {/* Columna Izquierda: Mis Juegos de Preferencia + Filtros Tácticos */}
      <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
        
        {/* Panel de Juegos de Preferencia */}
        <PreferencesIsland />

        <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat)] rounded-3xl border border-[var(--border-subtle)] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filtros de Búsqueda
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] px-2 py-1 rounded-lg bg-[var(--bg-sunken)] border border-[var(--border-subtle)]"
            >
              Limpiar
            </button>
          </div>

          {/* Horario */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Disponibilidad Horaria
            </label>
            <div className="custom-select-wrapper">
              <select
                value={filterSchedule}
                onChange={e => setFilterSchedule(e.target.value)}
                className="neu-select"
              >
                <option value="all">Cualquier franja horaria</option>
                <option value="tardes">Tardes (18:00 - 22:00 CLT)</option>
                <option value="noches">Noches (21:00 - 02:00 CLT)</option>
                <option value="findes">Fines de semana</option>
              </select>
            </div>
          </div>

          {/* Canal de Voz */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Canal de Voz (Mic)
            </label>
            <div className="custom-select-wrapper">
              <select
                value={filterMic}
                onChange={e => setFilterMic(e.target.value)}
                className="neu-select"
              >
                <option value="all">Indiferente</option>
                <option value="si">Micrófono Requerido</option>
                <option value="opcional">Sin micrófono obligatorio</option>
              </select>
            </div>
          </div>

          {/* Modalidad */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Modalidad de Partida
            </label>
            <div className="custom-select-wrapper">
              <select
                value={filterMode}
                onChange={e => setFilterMode(e.target.value)}
                className="neu-select"
              >
                <option value="all">Todas las modalidades</option>
                <option value="ranked">Competitivo / Clasificatoria</option>
                <option value="casual">Casual / Entrenamiento</option>
              </select>
            </div>
          </div>

          <button onClick={openRadar} className="neu-btn neu-btn-primary w-full mt-2" title="Iniciar escaneo de afinidad">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Búsqueda Rápida Radar
          </button>
        </div>

      </aside>

      {/* Columna Derecha: Feed Principal */}
      <div className="flex flex-col gap-6">
        
        {/* Barra Superior con Chips de Títulos */}
        <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat-sm)] rounded-2xl border border-[var(--border-subtle)] p-3 sm:p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'Todos los títulos' },
              { id: 'valorant', label: 'VALORANT' },
              { id: 'lol', label: 'League of Legends' },
              { id: 'cs2', label: 'Counter-Strike 2' },
              { id: 'rocket_league', label: 'Rocket League' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedGame(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  selectedGame === tab.id
                    ? 'bg-[var(--bg-sunken)] text-[var(--primary)] shadow-[var(--neu-pressed-sm)] border-[var(--border-glow)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] shadow-[var(--neu-flat-xs)] border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="telemetry-indicator text-xs">
            <span className="indicator-pulse-dot"></span>
            <span>{filteredPlayers.length} compañeros</span>
          </span>
        </div>

        {/* Tarjetas de Jugadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPlayers.map(player => {
            const affinity = calculateCompatibility(player);
            const isPreferred = userPreferences.includes(player.game);

            return (
              <article
                key={player.id}
                className="bg-[var(--bg-card)] shadow-[var(--neu-flat)] rounded-3xl border border-[var(--border-subtle)] p-5 flex flex-col justify-between gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--neu-floating)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card)] shadow-[var(--neu-flat-sm)] border border-[var(--border-subtle)] flex items-center justify-center font-['Outfit'] font-black text-lg text-[var(--accent-violet)] relative">
                      {player.avatarText}
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[var(--accent-mint)] border-2 border-[var(--bg-card)]"></span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-main)]">{player.name}</h4>
                      <div className="font-mono text-xs text-[var(--text-muted)]">{player.gamertag}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold flex items-center gap-1.5 shadow-[var(--neu-pressed-sm)] bg-[var(--bg-sunken)] ${
                      isPreferred ? 'text-[var(--accent-mint)] border border-[var(--accent-mint)]/30' : 'text-[var(--primary)]'
                    }`}>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                      {affinity}%
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {isPreferred ? 'Match Prioritario' : 'Afinidad'}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="neu-pill-tag rank-accent">{player.rank}</span>
                  <span className="neu-pill-tag">{player.role}</span>
                  <span className="neu-pill-tag karma-accent flex items-center gap-1">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    {player.karma.toFixed(2)} Karma
                  </span>
                  <span className="neu-pill-tag">Mic: {player.mic.toUpperCase()}</span>
                </div>

                {/* Bio */}
                <p className="bg-[var(--bg-sunken)] shadow-[var(--neu-pressed-sm)] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-[var(--text-body)] leading-relaxed italic">
                  "{player.bio}"
                </p>

                {/* Foot meta */}
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                  <span>{player.scheduleText}</span>
                  <span>Vic: {player.winRate}</span>
                </div>

                {/* Botones de Acción */}
                <div className="flex gap-2.5 pt-1">
                  <button onClick={() => openLobby(player)} className="neu-btn neu-btn-primary flex-1 py-2 text-xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    Invitar a Dúo
                  </button>
                  <button onClick={() => openProfile(player.id)} className="neu-btn neu-btn-sm text-xs px-3">
                    Ficha
                  </button>
                </div>

              </article>
            );
          })}
        </div>

      </div>

    </div>
  );
}

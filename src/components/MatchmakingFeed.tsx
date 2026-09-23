import React, { useState, useEffect, useMemo, useCallback, useTransition } from 'react';
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

const GAME_TABS = [
  { id: 'all', label: 'Todos los títulos' },
  { id: 'valorant', label: 'VALORANT' },
  { id: 'lol', label: 'League of Legends' },
  { id: 'cs2', label: 'Counter-Strike 2' },
  { id: 'rocket_league', label: 'Rocket League' }
];

// Componente Memoizado de Tarjeta de Jugador para Cero Re-renders Innecesarios
const PlayerCard = React.memo(function PlayerCard({
  player,
  affinity,
  isPreferred,
  onInvite,
  onProfile
}: {
  player: Player;
  affinity: number;
  isPreferred: boolean;
  onInvite: (p: Player) => void;
  onProfile: (id: number) => void;
}) {
  return (
    <article className="hud-card hud-corners flex flex-col justify-between gap-4 w-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card)] shadow-[var(--neu-flat-sm)] border border-[var(--border-subtle)] flex items-center justify-center font-['Outfit'] font-black text-lg text-[var(--accent-violet)] relative flex-shrink-0">
            {player.avatarText}
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[var(--accent-mint)] border-2 border-[var(--bg-card)]"></span>
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm text-[var(--text-main)] truncate">{player.name}</h4>
            <div className="font-mono text-xs text-[var(--text-muted)] truncate">{player.gamertag}</div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <div className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold flex items-center gap-1.5 shadow-[var(--neu-pressed-sm)] bg-[var(--bg-sunken)] ${
            isPreferred ? 'text-[var(--accent-mint)] border border-[var(--accent-mint)]/30' : 'text-[var(--primary)]'
          }`}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            {affinity}%
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {isPreferred ? 'Prioritario' : 'Afinidad'}
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
        <span className="truncate mr-2">{player.scheduleText}</span>
        <span className="flex-shrink-0">Vic: {player.winRate}</span>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-2.5 pt-1">
        <button onClick={() => onInvite(player)} className="neu-btn neu-btn-primary flex-1 py-2 text-xs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          Invitar a Dúo
        </button>
        <button onClick={() => onProfile(player.id)} className="neu-btn neu-btn-sm text-xs px-3">
          Ficha
        </button>
      </div>
    </article>
  );
});

export default function MatchmakingFeed() {
  const [selectedGame, setSelectedGame] = useState('all');
  const [filterSchedule, setFilterSchedule] = useState('all');
  const [filterMic, setFilterMic] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const [userPreferences, setUserPreferences] = useState<string[]>(['valorant', 'lol']);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handlePrefUpdate = (e: any) => {
      if (e.detail?.preferences) {
        startTransition(() => {
          setUserPreferences(e.detail.preferences);
        });
      }
    };
    window.addEventListener('preferences-updated', handlePrefUpdate);
    return () => window.removeEventListener('preferences-updated', handlePrefUpdate);
  }, []);

  // Pre-cálculo O(N) lineal y memoizado de compatibilidad para evitar recalcular en cada sort
  const playerAffinities = useMemo(() => {
    const map = new Map<number, number>();
    for (const p of PLAYERS_DATA) {
      let score = 70;
      if (userPreferences.includes(p.game)) score += 16;
      if (selectedGame !== 'all' && p.game === selectedGame) score += 8;
      if (p.schedule === 'noches') score += 5;
      if (p.mic === 'si') score += 4;
      if (p.karma >= 4.9) score += 4;
      map.set(p.id, Math.min(score, 99));
    }
    return map;
  }, [userPreferences, selectedGame]);

  const filteredPlayers = useMemo(() => {
    return PLAYERS_DATA.filter(p => {
      if (selectedGame !== 'all' && p.game !== selectedGame) return false;
      if (filterSchedule !== 'all' && p.schedule !== filterSchedule) return false;
      if (filterMic !== 'all' && p.mic !== filterMic) return false;
      if (filterMode !== 'all' && p.mode !== filterMode) return false;
      return true;
    }).sort((a, b) => (playerAffinities.get(b.id) ?? 0) - (playerAffinities.get(a.id) ?? 0));
  }, [selectedGame, filterSchedule, filterMic, filterMode, playerAffinities]);

  // Transición no bloqueante con respuesta táctil instantánea (<16ms INP)
  const handleSelectGame = useCallback((gameId: string) => {
    startTransition(() => {
      setSelectedGame(gameId);
    });
  }, []);

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setSelectedGame('all');
      setFilterSchedule('all');
      setFilterMic('all');
      setFilterMode('all');
    });
  }, []);

  const openRadar = useCallback(() => {
    window.dispatchEvent(new CustomEvent('open-radar-modal'));
  }, []);

  const openLobby = useCallback((player: Player) => {
    window.dispatchEvent(new CustomEvent('open-lobby-modal', { detail: { player } }));
  }, []);

  const openProfile = useCallback((playerId: number) => {
    window.dispatchEvent(new CustomEvent('open-player-profile', { detail: { id: playerId } }));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start w-full">
      
      {/* Columna Izquierda: Mis Juegos de Preferencia + Filtros Tácticos */}
      <aside className="flex flex-col gap-6 lg:sticky lg:top-24 w-full">
        
        {/* Panel de Juegos de Preferencia */}
        <PreferencesIsland />

        {/* Panel de Filtros Secundarios */}
        <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat)] rounded-3xl border border-[var(--border-subtle)] p-5 sm:p-6 flex flex-col gap-4 hud-corners w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--primary)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filtros de Búsqueda
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] px-2.5 py-1 rounded-lg bg-[var(--bg-sunken)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
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
                onChange={e => {
                  const val = e.target.value;
                  startTransition(() => setFilterSchedule(val));
                }}
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
                onChange={e => {
                  const val = e.target.value;
                  startTransition(() => setFilterMic(val));
                }}
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
                onChange={e => {
                  const val = e.target.value;
                  startTransition(() => setFilterMode(val));
                }}
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
      <div className="flex flex-col gap-6 w-full min-w-0">
        
        {/* Barra Superior con Chips Tácticos de Alta Velocidad */}
        <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat-sm)] rounded-2xl border border-[var(--border-subtle)] p-3 sm:p-4 flex items-center justify-between flex-wrap gap-3 w-full">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 touch-scroll-bracket">
            {GAME_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleSelectGame(tab.id)}
                className={`hud-chip ${selectedGame === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="telemetry-indicator text-xs ml-auto">
            <span className="indicator-pulse-dot"></span>
            <span>{filteredPlayers.length} disponibles</span>
          </span>
        </div>

        {/* Tarjetas de Jugadores Memoizadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {filteredPlayers.map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              affinity={playerAffinities.get(player.id) ?? 75}
              isPreferred={userPreferences.includes(player.game)}
              onInvite={openLobby}
              onProfile={openProfile}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

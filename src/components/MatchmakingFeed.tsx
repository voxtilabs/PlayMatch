import React, { useState, useEffect, useMemo, useCallback, useTransition } from 'react';
import PreferencesIsland from './PreferencesIsland';

export interface PlayerClip {
  id: number;
  title: string;
  game: string;
  duration: string;
  views: string;
  ggs: string;
  tag: string;
}

export interface PlayerSpecs {
  mouse: string;
  keyboard: string;
  monitor: string;
  audio: string;
}

export interface Player {
  id: number;
  name: string;
  gamertag: string;
  clanTag?: string;
  game: string;
  gameTitle: string;
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
  bannerTheme: 'magma' | 'cyber' | 'hextech' | 'toxic' | 'void';
  avatarFrame: 'gold' | 'cyber' | 'toxic' | 'void' | 'solar';
  statusMood?: string;
  socials?: { twitch?: string; discord?: string; kick?: string; steam?: string };
  clips?: PlayerClip[];
  specs?: PlayerSpecs;
}

const PLAYERS_DATA: Player[] = [
  {
    id: 1,
    name: 'Ignacio Silva',
    gamertag: 'NachoViper#LAS',
    clanTag: 'VOX',
    game: 'valorant',
    gameTitle: 'VALORANT',
    rank: 'Ascendente 2',
    role: 'Iniciador / Sova & Fade',
    schedule: 'noches',
    scheduleText: 'Noches (21:00 - 01:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.95,
    honors: ['Conducta Impecable', 'Liderazgo Táctico', 'Lineups Precisos'],
    bio: 'Especialista en iniciación y reconocimiento en servidores de Santiago. Busco dúo con comunicación sólida para escalar a Inmortal.',
    avatarText: 'IS',
    winRate: '62%',
    matchesCount: 142,
    bannerTheme: 'magma',
    avatarFrame: 'solar',
    statusMood: 'Grindeando Ranked · Busco Dúo IGL',
    socials: { twitch: 'nachoviper_cl', discord: 'NachoViper#1024', steam: 'nacho_fps' },
    clips: [
      { id: 101, title: '1v4 Clutch con Odin en B Site Haven', game: 'VALORANT', duration: '0:34', views: '1.8k', ggs: '482', tag: 'CLUTCH' },
      { id: 102, title: 'Recon Dart Reveal + Shock Dart Doble Kill', game: 'VALORANT', duration: '0:22', views: '950', ggs: '310', tag: 'LINEUP' },
      { id: 103, title: 'Ace Eco Round con Sheriff en Ascent', game: 'VALORANT', duration: '0:28', views: '2.4k', ggs: '715', tag: 'ACE' }
    ],
    specs: { mouse: 'Razer DeathAdder V3 Pro (800 DPI, 0.31 sens)', keyboard: 'Wooting 60HE (Rapid Trigger 0.15mm)', monitor: 'Zowie XL2546K 240Hz DyAc+', audio: 'IEMs Moondrop Chu II + Shure MV7' }
  },
  {
    id: 2,
    name: 'Camila Rojas',
    gamertag: 'MilaStar#LAS',
    clanTag: 'STAR',
    game: 'lol',
    gameTitle: 'League of Legends',
    rank: 'Esmeralda 1',
    role: 'Soporte / Utilidad & Peel',
    schedule: 'tardes',
    scheduleText: 'Tardes (18:00 - 22:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 5.0,
    honors: ['Espíritu de Equipo', 'Paciencia Plena', 'Visión Superior'],
    bio: 'Main Nami, Lulu y Milio en LAS. Busco ADC coordinado para escalar a Diamante y competir en torneos comunitarios.',
    avatarText: 'CR',
    winRate: '58%',
    matchesCount: 210,
    bannerTheme: 'cyber',
    avatarFrame: 'cyber',
    statusMood: 'En Directo en Twitch · Ranked Dúo',
    socials: { twitch: 'milastartv', discord: 'Mila#0001' },
    clips: [
      { id: 201, title: 'Burbuja Milimétrica que Salva el Baron en Min 32', game: 'League of Legends', duration: '0:26', views: '1.2k', ggs: '390', tag: 'HIGHLIGHT' },
      { id: 202, title: 'Iniciación con Oleada Perfecta en Dragon Pit', game: 'League of Legends', duration: '0:19', views: '840', ggs: '280', tag: 'TEAMFIGHT' }
    ],
    specs: { mouse: 'Logitech G Pro X Superlight (1000 DPI)', keyboard: 'Custom TKL Gateron Oil Kings', monitor: 'LG UltraGear 27" 180Hz IPS', audio: 'Beyerdynamic DT 990 Pro' }
  },
  {
    id: 3,
    name: 'Matías Morales',
    gamertag: 'DarkoCS#CL',
    clanTag: 'TITAN',
    game: 'cs2',
    gameTitle: 'Counter-Strike 2',
    rank: '16,200 CS Rating',
    role: 'Entry Fragger / Rifler',
    schedule: 'noches',
    scheduleText: 'Noches (22:00 - 02:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.88,
    honors: ['Coms Claras', 'Juego Colectivo', 'First Bullet Accuracy'],
    bio: 'Ex-competidor de ligas locales de CS. Busco trío o escuadra para Premier con servidores de baja latencia en Chile.',
    avatarText: 'MM',
    winRate: '56%',
    matchesCount: 320,
    bannerTheme: 'magma',
    avatarFrame: 'gold',
    statusMood: 'Premier 16k+ · Servidores Santiago Only',
    socials: { steam: 'darko_csgo', discord: 'Darko#1337' },
    clips: [
      { id: 301, title: '4 One-Taps con AK en Banana Inferno', game: 'Counter-Strike 2', duration: '0:18', views: '3.1k', ggs: '890', tag: 'ONE-TAP' },
      { id: 302, title: 'Deagle Retake 1v3 en Mirage B Site', game: 'Counter-Strike 2', duration: '0:25', views: '1.7k', ggs: '540', tag: 'CLUTCH' }
    ],
    specs: { mouse: 'Vaxee XE Wireless (400 DPI, 1.8 sens)', keyboard: 'SteelSeries Apex Pro TKL', monitor: 'BenQ Zowie XL2566K 360Hz', audio: 'HyperX Cloud II + Mic Røde PodMic' }
  },
  {
    id: 4,
    name: 'Lucas Varas',
    gamertag: 'VortexPulse#VALVE',
    clanTag: 'APEX',
    game: 'deadlock',
    gameTitle: 'Deadlock',
    rank: 'Tier Ascendant',
    role: 'Infernus & Pocket / Solo Laner',
    schedule: 'noches',
    scheduleText: 'Noches (20:00 - 01:30 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.96,
    honors: ['Macro Impecable', 'Líder Táctico', 'Alta Resistencia'],
    bio: 'Dedicado al nuevo shooter MOBA de Valve. Enfoque en control de carriles, farmeo de almas y peleas grupales coordinadas.',
    avatarText: 'LV',
    winRate: '65%',
    matchesCount: 115,
    bannerTheme: 'toxic',
    avatarFrame: 'toxic',
    statusMood: 'Probando Nuevas Builds de Almas',
    socials: { steam: 'vortexpulse', discord: 'Vortex#7777' },
    clips: [
      { id: 401, title: '6k Wipe con Ultimate de Infernus en Mid Tier 3', game: 'Deadlock', duration: '0:42', views: '4.2k', ggs: '1.1k', tag: 'WIPE' },
      { id: 402, title: 'Escape Imposible con Movilidad de Pocket', game: 'Deadlock', duration: '0:31', views: '2.1k', ggs: '630', tag: 'OUTPLAY' }
    ],
    specs: { mouse: 'Finalmouse UltralightX (800 DPI)', keyboard: 'DrunkDeer A75 Rapid Trigger', monitor: 'ASUS ROG Swift 360Hz OLED', audio: 'Sennheiser HD 560S' }
  },
  {
    id: 5,
    name: 'Daniela Soto',
    gamertag: 'DaniWraith#APEX',
    clanTag: 'VOID',
    game: 'apex',
    gameTitle: 'Apex Legends',
    rank: 'Master 12,400 RP',
    role: 'Entry Frag / Wingman & Shotgun',
    schedule: 'tardes',
    scheduleText: 'Tardes (18:30 - 23:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.91,
    honors: ['Rotaciones Rápidas', 'Aim God', 'Mentalidad Competitiva'],
    bio: 'Main Wraith & Horizon en lobbies Pred/Master. Busco trío con buen callout y rotaciones limpias por anillo.',
    avatarText: 'DS',
    winRate: '24% (BR)',
    matchesCount: 410,
    bannerTheme: 'void',
    avatarFrame: 'void',
    statusMood: 'Buscando 3ro para Grindeo a Predator',
    socials: { twitch: 'daniwraith', discord: 'Dani#4040' },
    clips: [
      { id: 501, title: 'Squad Wipe en 8 segundos con Wingman', game: 'Apex Legends', duration: '0:19', views: '2.8k', ggs: '760', tag: 'HIGHLIGHT' },
      { id: 502, title: 'Portal Táctico Clutch en Último Círculo', game: 'Apex Legends', duration: '0:35', views: '1.9k', ggs: '520', tag: 'VICTORY' }
    ],
    specs: { mouse: 'Logitech G Pro X Superlight 2 (800 DPI, 1.4 sens)', keyboard: 'Wooting 60HE+', monitor: 'Alienware 280Hz Fast IPS', audio: 'Audio-Technica ATH-M50x' }
  },
  {
    id: 6,
    name: 'Tomás Alarcón',
    gamertag: 'TommyClutch#FN',
    clanTag: 'NVR',
    game: 'fortnite',
    gameTitle: 'Fortnite',
    rank: 'Unreal Top 800',
    role: 'Zero Build / IGL & Sniper',
    schedule: 'tardes',
    scheduleText: 'Tardes y Noches (17:00 - 22:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.89,
    honors: ['Disparos de Precisión', 'Buen Posicionamiento'],
    bio: 'Especialista en Zero Build competitivo. Busco compañero con buena movilidad para torneos Cash Cup y Ranked Unreal.',
    avatarText: 'TA',
    winRate: '31% (ZB)',
    matchesCount: 280,
    bannerTheme: 'cyber',
    avatarFrame: 'gold',
    statusMood: 'Top 800 Unreal · Lobbies Sudamérica',
    socials: { twitch: 'tommyclutch', discord: 'Tommy#9999' },
    clips: [
      { id: 601, title: 'Doble Headshot con Sniper desde 250m en Vuelo', game: 'Fortnite', duration: '0:22', views: '3.6k', ggs: '980', tag: 'SNIPER' }
    ],
    specs: { mouse: 'Razer Viper V3 Pro (1600 DPI, 3.2% sens)', keyboard: 'Apex Pro Mini', monitor: 'Samsung Odyssey G6 240Hz', audio: 'SteelSeries Arctis Nova Pro' }
  },
  {
    id: 7,
    name: 'Catalina Peña',
    gamertag: 'CataNano#OW',
    clanTag: 'HEAL',
    game: 'overwatch2',
    gameTitle: 'Overwatch 2',
    rank: 'Gran Maestro 4',
    role: 'Flex Support / Ana & Kiriko',
    schedule: 'noches',
    scheduleText: 'Noches (21:30 - 01:30 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.98,
    honors: ['Anti-Heal Perfecto', 'Suiko Salvavidas', 'Cero Tilt'],
    bio: 'Soporte enfocado en habilitar tanques agresivos y cancelar ultimates con Sleep Dart. Busco Tanque o DPS para GM Dúo.',
    avatarText: 'CP',
    winRate: '60%',
    matchesCount: 195,
    bannerTheme: 'hextech',
    avatarFrame: 'gold',
    statusMood: 'Grindeando Top 500 Soporte',
    socials: { twitch: 'catananotv', discord: 'Cata#2024' },
    clips: [
      { id: 701, title: 'Sleep Dart a Pharah en el aire sobre el precipicio', game: 'Overwatch 2', duration: '0:15', views: '2.3k', ggs: '610', tag: 'SLEEP' }
    ],
    specs: { mouse: 'Pulsar X2V2 Mini (800 DPI)', keyboard: 'Keychron Q1 Pro', monitor: 'ViewSonic Omni 240Hz', audio: 'Sennheiser Game One' }
  },
  {
    id: 8,
    name: 'Rodrigo Castro',
    gamertag: 'GhostChile#WAR',
    clanTag: 'CLAN',
    game: 'warzone',
    gameTitle: 'CoD: Warzone',
    rank: 'Top 250 Resurgence',
    role: 'Sniper & Rotation IGL',
    schedule: 'noches',
    scheduleText: 'Noches (22:00 - 02:30 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.93,
    honors: ['Comunicación Militar', 'Rotaciones de Círculo', 'Clutch 1v3'],
    bio: 'Resurgence Ranked y Battle Royale clásico. Juego táctico, sin ego y enfocado en la victoria del pelotón.',
    avatarText: 'RC',
    winRate: '28% (BR)',
    matchesCount: 520,
    bannerTheme: 'magma',
    avatarFrame: 'solar',
    statusMood: 'Pelotón de 4 para Resurgence Ranked',
    socials: { kick: 'ghostchile', discord: 'Ghost#3333' },
    clips: [
      { id: 801, title: 'Wipe de Pelotón Completo con Kar98k en Rebirth', game: 'CoD: Warzone', duration: '0:29', views: '5.1k', ggs: '1.4k', tag: 'WIPE' }
    ],
    specs: { mouse: 'Logitech G502 X Plus (800 DPI)', keyboard: 'Corsair K70 RGB TKL', monitor: 'MSI Optix 170Hz 1440p', audio: 'Astro A50 Gen 4' }
  },
  {
    id: 9,
    name: 'Valentina Vega',
    gamertag: 'ValuAerial#CL',
    clanTag: 'FLY',
    game: 'rocket_league',
    gameTitle: 'Rocket League',
    rank: 'Campeón 2 Div 3',
    role: 'Rotación y Mecánicas Aéreas',
    schedule: 'findes',
    scheduleText: 'Fines de semana y tardes',
    mode: 'casual',
    mic: 'opcional',
    karma: 4.92,
    honors: ['Juego Limpio', 'Solidaridad en Partida', 'Pases Impecables'],
    bio: 'Partidas 2v2 y 3v3 orientadas a mejorar mecánicas de rotación y juego aéreo. Ambiente sereno y libre de frustración.',
    avatarText: 'VV',
    winRate: '59%',
    matchesCount: 95,
    bannerTheme: 'void',
    avatarFrame: 'void',
    statusMood: 'Chill 2v2 · Freestyle & Passing',
    socials: { twitch: 'valuaerial', discord: 'Valu#5555' },
    clips: [
      { id: 901, title: 'Double Tap Aéreo en Overtime 2v2', game: 'Rocket League', duration: '0:18', views: '2.7k', ggs: '720', tag: 'AERIAL' }
    ],
    specs: { mouse: 'DualSense Edge Controller', keyboard: 'Keychron K2', monitor: 'AOC Gaming 240Hz', audio: 'Sony WH-1000XM4' }
  },
  {
    id: 10,
    name: 'Andrés Guzmán',
    gamertag: 'SiegeVanguard#R6',
    clanTag: 'TACT',
    game: 'r6',
    gameTitle: 'Rainbow Six Siege',
    rank: 'Diamante 2',
    role: 'Anchor / Smoke & Mira',
    schedule: 'noches',
    scheduleText: 'Noches (21:00 - 01:00 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.9,
    honors: ['Plant Denials', 'Estructuración de Sitio', 'Droning Activo'],
    bio: 'Especialista en setups defensivos y control vertical. Busco escuadra disciplinada para Ranked en servidores de Brasil/Chile.',
    avatarText: 'AG',
    winRate: '57%',
    matchesCount: 230,
    bannerTheme: 'toxic',
    avatarFrame: 'toxic',
    statusMood: 'Defensa Táctica · Comunicaciones Claras',
    socials: { discord: 'Guzman#9090', steam: 'siegevanguard' },
    clips: [
      { id: 1001, title: 'Plant Denial con C4 a través de piso destructible', game: 'Rainbow Six Siege', duration: '0:24', views: '1.5k', ggs: '430', tag: 'TACTICAL' }
    ],
    specs: { mouse: 'Zowie EC2-CW (800 DPI)', keyboard: 'Ducky One 3 TKL', monitor: 'BenQ Zowie XL2540K 240Hz', audio: 'Beyerdynamic MMX 300' }
  },
  {
    id: 11,
    name: 'Gabriel Pinto',
    gamertag: 'GaboCarry#DOTA',
    clanTag: 'DOTA',
    game: 'dota2',
    gameTitle: 'Dota 2',
    rank: 'Inmortal 6,250 MMR',
    role: 'Posición 1 / Hard Carry',
    schedule: 'tardes',
    scheduleText: 'Tardes (17:30 - 22:30 CLT)',
    mode: 'ranked',
    mic: 'si',
    karma: 4.87,
    honors: ['Timing de Farmeo', 'Liderazgo en Late Game'],
    bio: 'Especialista en Anti-Mage, Faceless Void y Slark. Busco Pos 5 dedicado con buena administración de línea y visión.',
    avatarText: 'GP',
    winRate: '55%',
    matchesCount: 640,
    bannerTheme: 'hextech',
    avatarFrame: 'gold',
    statusMood: 'Ranked Inmortal Sudamérica',
    socials: { steam: 'gabocarry', discord: 'Gabo#6200' },
    clips: [
      { id: 1101, title: 'Chronosphere de 5 Héroes para Remontar Mega Creeps', game: 'Dota 2', duration: '0:45', views: '3.4k', ggs: '980', tag: 'RAMPAGE' }
    ],
    specs: { mouse: 'Razer DeathAdder Essential', keyboard: 'Logitech G513 Carbon', monitor: 'LG UltraGear 24" 144Hz', audio: 'HyperX Cloud Stinger' }
  },
  {
    id: 12,
    name: 'Martín Rivas',
    gamertag: 'CadeteRivas#HELL',
    clanTag: 'DEMO',
    game: 'helldivers2',
    gameTitle: 'Helldivers 2',
    rank: 'Mariscal Nivel 95',
    role: 'Demolición Pesada & Estratagemas',
    schedule: 'findes',
    scheduleText: 'Noches y fines de semana',
    mode: 'casual',
    mic: 'si',
    karma: 5.0,
    honors: ['Fuego Amigo Cero', 'Rescate en Extracción', 'Democracia Pura'],
    bio: 'Operaciones en Dificultad 9 Helldive contra Autómatas y Termínidos. Prioridad absoluta en evacuar las muestras raras.',
    avatarText: 'MR',
    winRate: '94% (Extr)',
    matchesCount: 180,
    bannerTheme: 'magma',
    avatarFrame: 'solar',
    statusMood: 'Por la Supertierra · Dificultad 9 Only',
    socials: { discord: 'CadeteRivas#7676', steam: 'cadeterivas' },
    clips: [
      { id: 1201, title: 'Bomba 500KG que Salva la Extracción a 0 Segundos', game: 'Helldivers 2', duration: '0:30', views: '6.2k', ggs: '1.9k', tag: 'DEMOCRACY' }
    ],
    specs: { mouse: 'Logitech G502 HERO (1200 DPI)', keyboard: 'Razer Huntsman Mini', monitor: 'Samsung Odyssey G7 240Hz', audio: 'SteelSeries Arctis 7P' }
  }
];

const GAME_TABS = [
  { id: 'all', label: 'Todos los títulos' },
  { id: 'valorant', label: 'VALORANT' },
  { id: 'lol', label: 'League of Legends' },
  { id: 'cs2', label: 'Counter-Strike 2' },
  { id: 'deadlock', label: 'Deadlock' },
  { id: 'apex', label: 'Apex Legends' },
  { id: 'fortnite', label: 'Fortnite' },
  { id: 'warzone', label: 'CoD: Warzone' },
  { id: 'overwatch2', label: 'Overwatch 2' },
  { id: 'rocket_league', label: 'Rocket League' },
  { id: 'r6', label: 'R6 Siege' },
  { id: 'dota2', label: 'Dota 2' },
  { id: 'helldivers2', label: 'Helldivers 2' }
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
  onProfile: (player: Player) => void;
}) {
  return (
    <article className="hud-card hud-corners flex flex-col justify-between gap-4 w-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`avatar-frame avatar-frame-${player.avatarFrame || 'solar'} flex-shrink-0`}>
            <div className="w-12 h-12 rounded-[21px] bg-[var(--bg-card)] flex items-center justify-center font-['Outfit'] font-black text-lg text-[var(--accent-gold)] relative">
              {player.avatarText}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--accent-mint)] border-2 border-[var(--bg-card)]"></span>
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              {player.clanTag && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[var(--bg-sunken)] border border-[var(--border-subtle)] text-[var(--accent-gold)]">
                  [{player.clanTag}]
                </span>
              )}
              <h4 className="font-bold text-sm text-[var(--text-main)] truncate">{player.name}</h4>
            </div>
            <div className="font-mono text-xs text-[var(--text-muted)] truncate">{player.gamertag} · {player.gameTitle}</div>
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
        <button onClick={() => onProfile(player)} className="neu-btn neu-btn-sm text-xs px-3.5 flex items-center gap-1.5" title="Ver perfil estilo Instagram Gamer">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Perfil
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

  const openProfile = useCallback((player: Player) => {
    window.dispatchEvent(new CustomEvent('open-player-profile', { detail: { player } }));
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

import React, { useState, useEffect, useCallback } from 'react';

interface PlayerClip {
  id: number;
  title: string;
  game: string;
  duration: string;
  views: string;
  ggs: string;
  tag: string;
}

interface PlayerSpecs {
  mouse: string;
  keyboard: string;
  monitor: string;
  audio: string;
}

interface GamerProfile {
  id: number;
  name: string;
  gamertag: string;
  clanTag?: string;
  game: string;
  gameTitle: string;
  rank: string;
  role: string;
  karma: number;
  winRate: string;
  matchesCount: number;
  bio: string;
  avatarText: string;
  bannerTheme: 'magma' | 'cyber' | 'hextech' | 'toxic' | 'void';
  avatarFrame: 'gold' | 'cyber' | 'toxic' | 'void' | 'solar';
  statusMood?: string;
  socials?: { twitch?: string; discord?: string; kick?: string; steam?: string };
  clips?: PlayerClip[];
  specs?: PlayerSpecs;
  honors: string[];
}

const DEFAULT_MY_PROFILE: GamerProfile = {
  id: 0,
  name: 'Ignacio Silva',
  gamertag: 'NachoViper#LAS',
  clanTag: 'VOX',
  game: 'valorant',
  gameTitle: 'VALORANT',
  rank: 'Ascendente 2',
  role: 'Iniciador / Sova & Fade',
  karma: 4.95,
  winRate: '62%',
  matchesCount: 142,
  bio: 'Especialista en reconocimiento y lineups en Santiago LAS. Busco dúo con comunicación militar para ascender a Inmortal.',
  avatarText: 'IS',
  bannerTheme: 'magma',
  avatarFrame: 'solar',
  statusMood: 'Grindeando Ranked · Busco Dúo IGL',
  socials: { twitch: 'nachoviper_cl', discord: 'NachoViper#1024', steam: 'nacho_fps' },
  clips: [
    { id: 101, title: '1v4 Clutch con Odin en B Site Haven', game: 'VALORANT', duration: '0:34', views: '1.8k', ggs: '482', tag: 'CLUTCH' },
    { id: 102, title: 'Recon Dart Reveal + Shock Dart Doble Kill', game: 'VALORANT', duration: '0:22', views: '950', ggs: '310', tag: 'LINEUP' },
    { id: 103, title: 'Ace Eco Round con Sheriff en Ascent', game: 'VALORANT', duration: '0:28', views: '2.4k', ggs: '715', tag: 'ACE' }
  ],
  specs: {
    mouse: 'Razer DeathAdder V3 Pro (800 DPI, 0.31 sens)',
    keyboard: 'Wooting 60HE (Rapid Trigger 0.15mm)',
    monitor: 'Zowie XL2546K 240Hz DyAc+',
    audio: 'IEMs Moondrop Chu II + Shure MV7'
  },
  honors: ['Conducta Impecable', 'Liderazgo Táctico', 'Lineups Precisos']
};

const BANNER_THEMES = [
  { id: 'magma', name: 'Solar Magma', color: 'from-[#FF5E3A] to-[#8B250C]' },
  { id: 'cyber', name: 'Cyber Neon', color: 'from-[#EC4899] to-[#6B1778]' },
  { id: 'hextech', name: 'Hextech Gold', color: 'from-[#F59E0B] to-[#7A5313]' },
  { id: 'toxic', name: 'Toxic Emerald', color: 'from-[#00F59B] to-[#10633E]' },
  { id: 'void', name: 'Astral Void', color: 'from-[#8B5CF6] to-[#2F3987]' }
];

const AVATAR_FRAMES = [
  { id: 'solar', name: 'Solar Flare', border: 'border-[#FF5E3A]' },
  { id: 'gold', name: 'Radiant Gold', border: 'border-[#F59E0B]' },
  { id: 'cyber', name: 'Neon Cyber', border: 'border-[#EC4899]' },
  { id: 'toxic', name: 'Acid Toxic', border: 'border-[#00F59B]' },
  { id: 'void', name: 'Deep Void', border: 'border-[#8B5CF6]' }
];

export default function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'clips' | 'specs' | 'stats'>('clips');
  const [profile, setProfile] = useState<GamerProfile>(DEFAULT_MY_PROFILE);
  const [followersCount, setFollowersCount] = useState(1420);
  const [isFollowing, setIsFollowing] = useState(false);
  const [playingClipId, setPlayingClipId] = useState<number | null>(null);

  // Form states for profile customization
  const [editGamertag, setEditGamertag] = useState('');
  const [editClanTag, setEditClanTag] = useState('');
  const [editStatusMood, setEditStatusMood] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editBannerTheme, setEditBannerTheme] = useState<'magma' | 'cyber' | 'hextech' | 'toxic' | 'void'>('magma');
  const [editAvatarFrame, setEditAvatarFrame] = useState<'gold' | 'cyber' | 'toxic' | 'void' | 'solar'>('solar');
  const [editMouse, setEditMouse] = useState('');
  const [editKeyboard, setEditKeyboard] = useState('');
  const [editMonitor, setEditMonitor] = useState('');
  const [editAudio, setEditAudio] = useState('');

  // Carga inicial del perfil propio desde localStorage
  const loadMyProfile = useCallback(() => {
    try {
      const saved = localStorage.getItem('pm_my_gamer_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return DEFAULT_MY_PROFILE;
  }, []);

  useEffect(() => {
    const handleOpen = (e: any) => {
      const playerDetail = e.detail?.player;
      const isMine = !playerDetail || e.detail?.isMyProfile || playerDetail.id === 0 || playerDetail.id === 1;

      if (isMine) {
        const myData = loadMyProfile();
        setProfile(myData);
        setIsMyProfile(true);
        setEditGamertag(myData.gamertag);
        setEditClanTag(myData.clanTag || '');
        setEditStatusMood(myData.statusMood || '');
        setEditBio(myData.bio);
        setEditBannerTheme(myData.bannerTheme || 'magma');
        setEditAvatarFrame(myData.avatarFrame || 'solar');
        setEditMouse(myData.specs?.mouse || '');
        setEditKeyboard(myData.specs?.keyboard || '');
        setEditMonitor(myData.specs?.monitor || '');
        setEditAudio(myData.specs?.audio || '');
      } else {
        setProfile({
          ...DEFAULT_MY_PROFILE,
          ...playerDetail,
          bannerTheme: playerDetail.bannerTheme || 'magma',
          avatarFrame: playerDetail.avatarFrame || 'solar',
          clips: playerDetail.clips || DEFAULT_MY_PROFILE.clips,
          specs: playerDetail.specs || DEFAULT_MY_PROFILE.specs
        });
        setIsMyProfile(false);
      }

      setIsEditing(false);
      setActiveTab('clips');
      setIsOpen(true);
    };

    window.addEventListener('open-player-profile', handleOpen);
    return () => window.removeEventListener('open-player-profile', handleOpen);
  }, [loadMyProfile]);

  const showToast = (msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: msg } }));
  };

  const handleSaveCustomization = () => {
    const updated: GamerProfile = {
      ...profile,
      gamertag: editGamertag || profile.gamertag,
      clanTag: editClanTag || profile.clanTag,
      statusMood: editStatusMood || profile.statusMood,
      bio: editBio || profile.bio,
      bannerTheme: editBannerTheme,
      avatarFrame: editAvatarFrame,
      specs: {
        mouse: editMouse || profile.specs?.mouse || '',
        keyboard: editKeyboard || profile.specs?.keyboard || '',
        monitor: editMonitor || profile.specs?.monitor || '',
        audio: editAudio || profile.specs?.audio || ''
      }
    };

    setProfile(updated);
    localStorage.setItem('pm_my_gamer_profile', JSON.stringify(updated));
    setIsEditing(false);
    showToast('Perfil gamer actualizado y sincronizado.');
  };

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount(c => c - 1);
      showToast(`Dejaste de seguir a ${profile.gamertag}`);
    } else {
      setIsFollowing(true);
      setFollowersCount(c => c + 1);
      showToast(`¡Ahora sigues a ${profile.gamertag}!`);
    }
  };

  const handlePlayClip = (clip: PlayerClip) => {
    setPlayingClipId(clip.id);
    showToast(`Reproduciendo "${clip.title}" en 1080p 60fps`);
    setTimeout(() => {
      setPlayingClipId(null);
    }, 4500);
  };

  if (!isOpen) return null;

  return (
    <div className="neu-modal-backdrop open">
      <div className="neu-modal-card gamer-profile-modal max-w-2xl p-0 overflow-hidden relative">
        
        {/* Banner Temático Dinámico Estilo IG */}
        <div className={`gamer-banner banner-${profile.bannerTheme || 'magma'} p-4 flex items-start justify-between relative`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-modal)] via-transparent to-black/20 pointer-events-none"></div>

          {/* Badge del Banner */}
          <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-white shadow-lg">
            <svg className="w-3.5 h-3.5 text-[var(--accent-mint)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>{profile.gameTitle || 'PLAYMATCH PRO'}</span>
          </div>

          {/* Botón de Cerrar */}
          <button
            onClick={() => setIsOpen(false)}
            className="relative z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            aria-label="Cerrar perfil"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cuerpo del Perfil */}
        <div className="p-5 sm:p-6 -mt-14 sm:-mt-16 relative z-10 flex flex-col gap-5">
          
          {/* Cabecera: Avatar con Marco + Gamertag + Botones de Acción */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            
            <div className="flex items-end gap-3.5">
              {/* Marco de Avatar Cinematográfico */}
              <div className={`avatar-frame avatar-frame-${profile.avatarFrame || 'solar'} flex-shrink-0 shadow-2xl`}>
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-[22px] bg-[var(--bg-card)] flex items-center justify-center font-['Outfit'] font-black text-2xl text-[var(--accent-gold)] relative">
                  {profile.avatarText}
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[var(--accent-mint)] border-2 border-[var(--bg-card)]" title="En línea"></span>
                </div>
              </div>

              {/* Nombres y Clan */}
              <div className="min-w-0 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {profile.clanTag && (
                    <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md bg-[var(--bg-sunken)] border border-[var(--border-subtle)] text-[var(--accent-gold)]">
                      [{profile.clanTag}]
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)] truncate tracking-tight">
                    {profile.gamertag}
                  </h3>
                </div>
                <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-2 mt-0.5">
                  <span>{profile.name}</span>
                  <span>·</span>
                  <span className="text-[var(--accent-mint)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-mint)] inline-block"></span>
                    Santiago LAS · 8ms
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de Cabecera (Personalizar o Invitar) */}
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
              {isMyProfile ? (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`neu-btn neu-btn-sm text-xs flex items-center gap-2 ${
                    isEditing ? 'neu-btn-primary' : ''
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  <span>{isEditing ? 'Ver Perfil' : 'Personalizar Perfil'}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleToggleFollow}
                    className={`neu-btn neu-btn-sm text-xs flex items-center gap-1.5 ${
                      isFollowing ? 'neu-btn-mint' : ''
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={isFollowing ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{isFollowing ? 'Siguiendo' : 'Seguir'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.dispatchEvent(new CustomEvent('open-lobby-modal', { detail: { player: profile } }));
                    }}
                    className="neu-btn neu-btn-primary neu-btn-sm text-xs flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span>Invitar a Dúo</span>
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Modo Edición en Vivo (Personalizador de Perfil Gamer) */}
          {isEditing ? (
            <div className="bg-[var(--bg-sunken)] p-4 sm:p-5 rounded-2xl border border-[var(--border-glow)] flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <h4 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  Personalizador de Identidad Gamer
                </h4>
                <span className="text-[10px] font-mono text-[var(--accent-mint)]">GUARDADO LOCAL AUTOMÁTICO</span>
              </div>

              {/* Selector de Banner */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Estilo de Portada / Banner
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {BANNER_THEMES.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setEditBannerTheme(b.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold text-left transition-all border ${
                        editBannerTheme === b.id
                          ? 'border-[var(--primary)] bg-[var(--bg-card)] shadow-[var(--neu-flat-xs)] text-[var(--primary)]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-white'
                      }`}
                    >
                      <div className={`w-full h-3 rounded-md bg-gradient-to-r ${b.color} mb-1.5`}></div>
                      <span className="truncate block text-[11px]">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Marco de Avatar */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Efecto de Marco de Avatar
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {AVATAR_FRAMES.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setEditAvatarFrame(f.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                        editAvatarFrame === f.id
                          ? 'border-[var(--primary)] bg-[var(--bg-card)] text-[var(--primary)]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-white'
                      }`}
                    >
                      <span className="truncate block text-[11px]">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gamertag y Clan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Clan Tag</label>
                  <input
                    type="text"
                    maxLength={5}
                    value={editClanTag}
                    onChange={e => setEditClanTag(e.target.value.toUpperCase())}
                    placeholder="VOX"
                    className="neu-input text-xs font-mono"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Gamertag Social</label>
                  <input
                    type="text"
                    value={editGamertag}
                    onChange={e => setEditGamertag(e.target.value)}
                    placeholder="MiTag#LAS"
                    className="neu-input text-xs font-mono"
                  />
                </div>
              </div>

              {/* Estado Mood */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Estado / Mood Gamer</label>
                <input
                  type="text"
                  value={editStatusMood}
                  onChange={e => setEditStatusMood(e.target.value)}
                  placeholder="Grindeando Ranked · Busco Dúo IGL"
                  className="neu-input text-xs"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Biografía Gamer</label>
                <textarea
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  rows={2}
                  className="neu-input text-xs py-2 h-auto"
                  placeholder="Tu estilo de juego, roles principales y horarios..."
                />
              </div>

              {/* Periféricos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Mouse & DPI</label>
                  <input
                    type="text"
                    value={editMouse}
                    onChange={e => setEditMouse(e.target.value)}
                    placeholder="Razer DeathAdder V3 (800 DPI)"
                    className="neu-input text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Teclado</label>
                  <input
                    type="text"
                    value={editKeyboard}
                    onChange={e => setEditKeyboard(e.target.value)}
                    placeholder="Wooting 60HE (Rapid Trigger)"
                    className="neu-input text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Monitor (Hz)</label>
                  <input
                    type="text"
                    value={editMonitor}
                    onChange={e => setEditMonitor(e.target.value)}
                    placeholder="Zowie 240Hz OLED"
                    className="neu-input text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Audio & Mic</label>
                  <input
                    type="text"
                    value={editAudio}
                    onChange={e => setEditAudio(e.target.value)}
                    placeholder="IEMs + Shure MV7"
                    className="neu-input text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <button onClick={() => setIsEditing(false)} className="neu-btn neu-btn-sm text-xs">
                  Cancelar
                </button>
                <button onClick={handleSaveCustomization} className="neu-btn neu-btn-primary neu-btn-sm text-xs flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Guardar Perfil
                </button>
              </div>
            </div>
          ) : null}

          {/* Barra de Estadísticas Sociales Tipo Instagram */}
          <div className="grid grid-cols-4 gap-2 text-center bg-[var(--bg-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)]">
            <div className="flex flex-col">
              <span className="font-mono text-sm sm:text-base font-bold text-[var(--text-main)]">
                {followersCount.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Seguidores</span>
            </div>
            <div className="flex flex-col border-l border-[var(--border-subtle)]">
              <span className="font-mono text-sm sm:text-base font-bold text-[var(--text-main)]">184</span>
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Siguiendo</span>
            </div>
            <div className="flex flex-col border-l border-[var(--border-subtle)]">
              <span className="font-mono text-sm sm:text-base font-bold text-[var(--primary)]">{profile.winRate}</span>
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Win Rate</span>
            </div>
            <div className="flex flex-col border-l border-[var(--border-subtle)]">
              <span className="font-mono text-sm sm:text-base font-bold text-[var(--accent-gold)] flex items-center justify-center gap-1">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                {profile.karma.toFixed(2)}
              </span>
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Karma</span>
            </div>
          </div>

          {/* Estado de Actividad Gamer & Biografía */}
          <div className="flex flex-col gap-2">
            {profile.statusMood && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glow)] text-xs font-bold text-[var(--text-main)] shadow-[var(--neu-flat-xs)]">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping"></span>
                <span>{profile.statusMood}</span>
              </div>
            )}
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed bg-[var(--bg-sunken)] p-3 rounded-xl border border-[var(--border-subtle)] italic">
              "{profile.bio}"
            </p>
          </div>

          {/* Pestañas de Contenido Tipo Instagram Gamer */}
          <div className="flex items-center border-b border-[var(--border-subtle)] gap-2">
            <button
              onClick={() => setActiveTab('clips')}
              className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 transition-colors border-b-2 -mb-px ${
                activeTab === 'clips'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span>Clips &amp; Jugadas ({profile.clips?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 transition-colors border-b-2 -mb-px ${
                activeTab === 'specs'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
              </svg>
              <span>Setup &amp; Hardware</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 transition-colors border-b-2 -mb-px ${
                activeTab === 'stats'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
              <span>Insignias ({profile.honors?.length || 0})</span>
            </button>
          </div>

          {/* Contenido de la Pestaña Activa */}
          {activeTab === 'clips' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
              {(profile.clips || []).map(clip => (
                <div
                  key={clip.id}
                  onClick={() => handlePlayClip(clip)}
                  className="ig-clip-card p-3 flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--bg-sunken)] text-[var(--accent-mint)] border border-[var(--border-subtle)]">
                      {clip.tag}
                    </span>
                    <span className="ig-clip-badge">{clip.duration}</span>
                  </div>

                  {/* Thumbnail Simulado con Overlay de Reproductor */}
                  <div className="h-24 rounded-xl bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-sunken)] border border-[var(--border-subtle)] flex items-center justify-center relative overflow-hidden group-hover:border-[var(--primary)] transition-colors">
                    {playingClipId === clip.id ? (
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-6 bg-[var(--accent-mint)] animate-pulse"></span>
                        <span className="w-1.5 h-10 bg-[var(--primary)] animate-pulse"></span>
                        <span className="w-1.5 h-4 bg-[var(--accent-gold)] animate-pulse"></span>
                        <span className="w-1.5 h-8 bg-[var(--accent-violet)] animate-pulse"></span>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-glow)] flex items-center justify-center text-[var(--primary)] shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[var(--text-main)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                      {clip.title}
                    </h5>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mt-1">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {clip.views}
                      </span>
                      <span className="flex items-center gap-1 text-[var(--accent-gold)]">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                        </svg>
                        {clip.ggs} GGs
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
              <div className="spec-capsule">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="7"></rect>
                    <line x1="12" y1="6" x2="12" y2="10"></line>
                  </svg>
                  Mouse &amp; Sensibilidad
                </span>
                <span className="text-xs font-bold text-[var(--text-main)]">
                  {profile.specs?.mouse || 'Sensor Óptico 800 DPI'}
                </span>
              </div>

              <div className="spec-capsule">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[var(--accent-mint)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <line x1="6" y1="8" x2="6" y2="8"></line>
                    <line x1="10" y1="8" x2="10" y2="8"></line>
                    <line x1="14" y1="8" x2="14" y2="8"></line>
                    <line x1="18" y1="8" x2="18" y2="8"></line>
                  </svg>
                  Teclado Competitivo
                </span>
                <span className="text-xs font-bold text-[var(--text-main)]">
                  {profile.specs?.keyboard || 'Interruptores Rápidos TKL'}
                </span>
              </div>

              <div className="spec-capsule">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[var(--accent-gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  Monitor de Tasa Alta
                </span>
                <span className="text-xs font-bold text-[var(--text-main)]">
                  {profile.specs?.monitor || '240Hz Fast IPS 1ms'}
                </span>
              </div>

              <div className="spec-capsule">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[var(--accent-violet)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                  Audio &amp; Micrófono
                </span>
                <span className="text-xs font-bold text-[var(--text-main)]">
                  {profile.specs?.audio || 'IEMs Hi-Res + Micrófono Cardioide'}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="bg-[var(--bg-sunken)] p-3.5 rounded-2xl border border-[var(--border-subtle)]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                  Insignias Otorgadas por la Comunidad
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(profile.honors || []).map((h, i) => (
                    <span key={i} className="neu-pill-tag text-[var(--accent-mint)] text-xs">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-[var(--bg-sunken)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Partidas Registradas</span>
                  <div className="font-mono text-base font-bold text-[var(--text-main)] mt-0.5">{profile.matchesCount}</div>
                </div>
                <div className="bg-[var(--bg-sunken)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Rango Competitivo</span>
                  <div className="font-mono text-base font-bold text-[var(--primary)] mt-0.5">{profile.rank}</div>
                </div>
                <div className="bg-[var(--bg-sunken)] p-3 rounded-xl border border-[var(--border-subtle)] col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Reportes de Toxicidad</span>
                  <div className="font-mono text-base font-bold text-[var(--accent-mint)] mt-0.5">0 (Impecable)</div>
                </div>
              </div>
            </div>
          )}

          {/* Pie del Modal */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              ID Gamer: <strong className="text-[var(--text-main)]">#PM-{profile.id || 1024}</strong>
            </span>
            <button onClick={() => setIsOpen(false)} className="neu-btn neu-btn-sm text-xs">
              Cerrar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

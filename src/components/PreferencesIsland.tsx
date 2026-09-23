import React, { useState, useEffect, useTransition, useCallback } from 'react';

interface GameItem {
  id: string;
  name: string;
  category: string;
  role: string;
  rank: string;
}

const AVAILABLE_GAMES: GameItem[] = [
  { id: 'valorant', name: 'VALORANT', category: 'Tactical FPS', role: 'Iniciador / Sova', rank: 'Ascendente 2' },
  { id: 'lol', name: 'League of Legends', category: 'MOBA', role: 'Soporte / Utilidad', rank: 'Esmeralda 1' },
  { id: 'cs2', name: 'Counter-Strike 2', category: 'Tactical FPS', role: 'Entry Fragger / Rifler', rank: '15,800 CS' },
  { id: 'deadlock', name: 'Deadlock', category: 'Hero MOBA', role: 'Infernus / Solo Lane', rank: 'Tier Ascendant' },
  { id: 'apex', name: 'Apex Legends', category: 'Battle Royale', role: 'Recon / Bloodhound', rank: 'Master' },
  { id: 'fortnite', name: 'Fortnite', category: 'Battle Royale', role: 'Zero Build / IGL', rank: 'Unreal' },
  { id: 'overwatch2', name: 'Overwatch 2', category: 'Hero Shooter', role: 'Tank / Sigma & D.Va', rank: 'Diamante 1' },
  { id: 'warzone', name: 'CoD: Warzone', category: 'Battle Royale', role: 'Sniper & Rotation', rank: 'Top 250' },
  { id: 'rocket_league', name: 'Rocket League', category: 'Vehicular', role: 'Rotación 2v2 / Aéreo', rank: 'Campeón 2' },
  { id: 'r6', name: 'Rainbow Six Siege', category: 'Tactical CQC', role: 'Anchor / Smoke', rank: 'Platino 1' },
  { id: 'dota2', name: 'Dota 2', category: 'MOBA', role: 'Pos 1 Hard Carry', rank: 'Divine 3' },
  { id: 'helldivers2', name: 'Helldivers 2', category: 'Co-op PvE', role: 'Heavy Support Gunner', rank: 'Dificultad 9' }
];

function PreferencesIslandComponent() {
  const [preferences, setPreferences] = useState<string[]>(['valorant', 'lol', 'deadlock']);
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pm_user_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPreferences(parsed);
          window.dispatchEvent(new CustomEvent('preferences-updated', { detail: { preferences: parsed } }));
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: msg } }));
  }, []);

  const toggleGame = useCallback((gameId: string) => {
    const game = AVAILABLE_GAMES.find(g => g.id === gameId);

    setPreferences(prev => {
      let next: string[];
      if (prev.includes(gameId)) {
        if (prev.length === 1) {
          showToast('Debes mantener al menos una disciplina de preferencia activa.');
          return prev;
        }
        next = prev.filter(id => id !== gameId);
        showToast(`${game ? game.name : gameId} removido de tus prioridades.`);
      } else {
        next = [...prev, gameId];
        showToast(`${game ? game.name : gameId} añadido como juego prioritario.`);
      }

      localStorage.setItem('pm_user_preferences', JSON.stringify(next));
      
      startTransition(() => {
        window.dispatchEvent(new CustomEvent('preferences-updated', { detail: { preferences: next } }));
      });
      
      return next;
    });
  }, [showToast]);

  return (
    <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat)] rounded-3xl border border-[var(--border-subtle)] p-5 sm:p-6 flex flex-col gap-4 hud-corners w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--primary)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="12" x2="10" y2="12"></line>
            <line x1="8" y1="10" x2="8" y2="14"></line>
            <line x1="15" y1="13" x2="15.01" y2="13"></line>
            <line x1="18" y1="11" x2="18.01" y2="11"></line>
            <rect x="2" y="6" width="20" height="12" rx="4"></rect>
          </svg>
          Mis Juegos de Preferencia
        </h3>
        <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--bg-sunken)] border border-[var(--border-subtle)] text-[var(--accent-mint)]">
          {preferences.length} Activos
        </span>
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
        Configura tus títulos activos para calibrar el motor de compatibilidad (+16% de afinidad en tiempo real).
      </p>

      <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1 touch-scroll-bracket">
        {AVAILABLE_GAMES.map(game => {
          const isSelected = preferences.includes(game.id);
          return (
            <div
              key={game.id}
              onClick={() => toggleGame(game.id)}
              className={`p-2.5 sm:p-3 rounded-2xl cursor-pointer select-none transition-transform duration-100 active:scale-[0.98] flex items-center justify-between gap-2 border ${
                isSelected
                  ? 'bg-[var(--bg-card)] shadow-[var(--neu-flat-xs)] border-[var(--border-glow)]'
                  : 'bg-[var(--bg-sunken)] shadow-[var(--neu-pressed-sm)] border-transparent hover:border-[var(--border-subtle)]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[var(--primary)] text-white shadow-[0_0_10px_rgba(255,94,58,0.5)]'
                      : 'bg-[var(--bg-sunken)] border border-[var(--border-field)] text-transparent'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-xs font-bold text-[var(--text-main)] truncate">{game.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--bg-sunken)] text-[var(--text-faint)] border border-[var(--border-subtle)]">
                      {game.category}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)] truncate">
                    {game.role} · {game.rank}
                  </div>
                </div>
              </div>

              <span
                className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                  isSelected ? 'text-[var(--accent-mint)] bg-[var(--accent-mint-soft)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {isSelected ? 'Prioridad' : 'Inactivo'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const PreferencesIsland = React.memo(PreferencesIslandComponent);
export default PreferencesIsland;

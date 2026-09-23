import React, { useState, useEffect } from 'react';

interface GameItem {
  id: string;
  name: string;
  role: string;
  rank: string;
}

const AVAILABLE_GAMES: GameItem[] = [
  { id: 'valorant', name: 'VALORANT', role: 'Iniciador / Sova', rank: 'Ascendente 2' },
  { id: 'lol', name: 'League of Legends', role: 'Soporte / Utilidad', rank: 'Esmeralda 1' },
  { id: 'cs2', name: 'Counter-Strike 2', role: 'Entry Fragger / Rifler', rank: '15,800 CS' },
  { id: 'rocket_league', name: 'Rocket League', role: 'Rotación 2v2 / Aéreo', rank: 'Campeón 2' }
];

export default function PreferencesIsland() {
  const [preferences, setPreferences] = useState<string[]>(['valorant', 'lol']);

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

  const toggleGame = (gameId: string) => {
    let next: string[];
    const game = AVAILABLE_GAMES.find(g => g.id === gameId);

    if (preferences.includes(gameId)) {
      if (preferences.length === 1) {
        showToast('Debes mantener al menos una disciplina de preferencia activa.');
        return;
      }
      next = preferences.filter(id => id !== gameId);
      showToast(`${game ? game.name : gameId} removido de tus prioridades.`);
    } else {
      next = [...preferences, gameId];
      showToast(`${game ? game.name : gameId} añadido como juego prioritario.`);
    }

    setPreferences(next);
    localStorage.setItem('pm_user_preferences', JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('preferences-updated', { detail: { preferences: next } }));
  };

  const showToast = (msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: msg } }));
  };

  return (
    <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat)] rounded-3xl border border-[var(--border-subtle)] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="6" y1="12" x2="10" y2="12"></line>
            <line x1="8" y1="10" x2="8" y2="14"></line>
            <line x1="15" y1="13" x2="15.01" y2="13"></line>
            <line x1="18" y1="11" x2="18.01" y2="11"></line>
            <rect x="2" y="6" width="20" height="12" rx="4"></rect>
          </svg>
          Mis Juegos
        </h3>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--bg-sunken)] border border-[var(--border-subtle)] text-[var(--accent-mint)]">
          {preferences.length} Activos
        </span>
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
        Configura tus disciplinas activas para calibrar el algoritmo de compatibilidad (+16% de afinidad en tiempo real).
      </p>

      <div className="flex flex-col gap-2.5">
        {AVAILABLE_GAMES.map(game => {
          const isSelected = preferences.includes(game.id);
          return (
            <div
              key={game.id}
              onClick={() => toggleGame(game.id)}
              className={`p-3 rounded-2xl cursor-pointer select-none transition-all flex items-center justify-between border ${
                isSelected
                  ? 'bg-[var(--bg-card)] shadow-[var(--neu-flat-xs)] border-[var(--border-glow)]'
                  : 'bg-[var(--bg-sunken)] shadow-[var(--neu-pressed-sm)] border-transparent hover:border-[var(--border-subtle)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[var(--primary)] text-white shadow-[0_0_10px_rgba(61,90,254,0.6)]'
                      : 'bg-[var(--bg-sunken)] border border-[var(--border-field)] text-transparent'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                <div>
                  <div className="text-xs font-bold text-[var(--text-main)]">{game.name}</div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">
                    {game.role} · {game.rank}
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
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

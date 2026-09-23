import React, { useState, useEffect } from 'react';

interface RatedPlayer {
  id: number;
  name: string;
}

export default function KarmaModal() {
  const [player, setPlayer] = useState<RatedPlayer | null>(null);
  const [stars, setStars] = useState(5);
  const [selectedBadges, setSelectedBadges] = useState<string[]>(['Conducta Impecable']);

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.player) {
        setPlayer(e.detail.player);
        setStars(5);
        setSelectedBadges(['Conducta Impecable']);
      }
    };

    window.addEventListener('open-karma-modal', handleOpen);
    return () => window.removeEventListener('open-karma-modal', handleOpen);
  }, []);

  const toggleBadge = (badge: string) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter(b => b !== badge));
    } else {
      setSelectedBadges([...selectedBadges, badge]);
    }
  };

  const submitFeedback = () => {
    if (player) {
      window.dispatchEvent(
        new CustomEvent('show-toast', {
          detail: { message: `Valoración de convivencia registrada para ${player.name}. Karma aumentado.` }
        })
      );
    }
    setPlayer(null);
  };

  if (!player) return null;

  return (
    <div className="neu-modal-backdrop open">
      <div className="neu-modal-card max-w-md flex flex-col gap-4 text-center">
        
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] text-left">
          <h3 className="text-base font-bold text-[var(--text-main)]">
            Evaluación de Convivencia: {player.name}
          </h3>
          <button onClick={() => setPlayer(null)} className="neu-icon-btn neu-btn-sm" aria-label="Cerrar modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          El índice de Karma premia la deportividad y mantiene la plataforma libre de conductas tóxicas.
        </p>

        {/* 5-Star Selector SVG */}
        <div className="flex justify-center gap-2 my-2">
          {[1, 2, 3, 4, 5].map(starIndex => (
            <button
              key={starIndex}
              onClick={() => setStars(starIndex)}
              className="p-1 cursor-pointer transition-transform hover:scale-110"
            >
              <svg
                className={`w-7 h-7 ${
                  starIndex <= stars ? 'text-[var(--accent-amber)] fill-current' : 'text-[var(--border-field)]'
                }`}
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          ))}
        </div>

        {/* Reconocimientos Otorgados */}
        <div className="flex flex-col gap-2 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Reconocimientos Otorgados
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'Conducta Impecable', icon: 'shield' },
              { id: 'Comunicación Clara', icon: 'mic' },
              { id: 'Puntualidad', icon: 'clock' }
            ].map(b => {
              const isSelected = selectedBadges.includes(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => toggleBadge(b.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-[0_2px_8px_rgba(61,90,254,0.4)]'
                      : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {b.id}
                </button>
              );
            })}
          </div>
        </div>

        <button onClick={submitFeedback} className="neu-btn neu-btn-primary w-full mt-2">
          Confirmar Evaluación
        </button>

      </div>
    </div>
  );
}

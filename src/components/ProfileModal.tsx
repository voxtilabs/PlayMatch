import React, { useState, useEffect } from 'react';

export default function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const handleOpen = (e: any) => {
      const p = {
        name: 'Ignacio Silva',
        gamertag: 'NachoViper#LAS',
        rank: 'Ascendente 2',
        role: 'Iniciador / Sova',
        karma: 4.95,
        winRate: '62%',
        matchesCount: 142,
        bio: 'Especialista en iniciación y reconocimiento en servidores de Santiago. Busco dúo con comunicación sólida para escalar a Inmortal.',
        honors: ['Conducta Impecable', 'Liderazgo Táctico', 'Puntualidad']
      };
      setPlayer(p);
      setIsOpen(true);
    };

    window.addEventListener('open-player-profile', handleOpen);
    return () => window.removeEventListener('open-player-profile', handleOpen);
  }, []);

  if (!isOpen || !player) return null;

  return (
    <div className="neu-modal-backdrop open">
      <div className="neu-modal-card max-w-lg flex flex-col gap-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <h3 className="text-base font-bold text-[var(--text-main)]">Ficha Técnica del Jugador</h3>
          <button onClick={() => setIsOpen(false)} className="neu-icon-btn neu-btn-sm" aria-label="Cerrar modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-card)] shadow-[var(--neu-flat-sm)] border border-[var(--border-subtle)] flex items-center justify-center font-['Outfit'] font-black text-2xl text-[var(--accent-violet)]">
            IS
          </div>
          <div>
            <h4 className="text-lg font-bold text-[var(--text-main)]">{player.name}</h4>
            <p className="font-mono text-xs text-[var(--text-muted)]">{player.gamertag}</p>
            <span className="neu-pill-tag karma-accent text-xs mt-1 inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {player.karma} Índice de Convivencia
            </span>
          </div>
        </div>

        {/* Insignias de Reconocimiento */}
        <div className="bg-[var(--bg-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)]">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            Insignias de Reconocimiento
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {player.honors.map((h: string, i: number) => (
              <span key={i} className="neu-pill-tag text-[var(--accent-mint)] text-xs">
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Estadísticas de Rendimiento */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat-xs)] rounded-2xl p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Winrate</span>
            <div className="font-mono text-lg font-bold text-[var(--primary)] mt-0.5">{player.winRate}</div>
          </div>
          <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat-xs)] rounded-2xl p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Partidas</span>
            <div className="font-mono text-lg font-bold text-[var(--text-main)] mt-0.5">{player.matchesCount}</div>
          </div>
          <div className="bg-[var(--bg-card)] shadow-[var(--neu-flat-xs)] rounded-2xl p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Toxicidad</span>
            <div className="font-mono text-lg font-bold text-[var(--accent-mint)] mt-0.5">0.0%</div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Descripción del Jugador
          </h5>
          <p className="bg-[var(--bg-sunken)] shadow-[var(--neu-pressed-sm)] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-[var(--text-body)] leading-relaxed italic">
            "{player.bio}"
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
          <button onClick={() => setIsOpen(false)} className="neu-btn neu-btn-sm text-xs">
            Cerrar
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(new CustomEvent('open-lobby-modal', { detail: { player } }));
            }}
            className="neu-btn neu-btn-primary neu-btn-sm text-xs"
          >
            Invitar a Dúo
          </button>
        </div>

      </div>
    </div>
  );
}

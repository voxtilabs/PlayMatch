import React from 'react';

const MOCK_BRACKET = {
  quarterFinals: [
    { id: 'qf1', teamA: 'Santiago Sentinels', teamB: 'Valparaíso Vipers', scoreA: 13, scoreB: 9, winner: 'A' },
    { id: 'qf2', teamA: 'Andes Esports', teamB: 'Concepción Cyber', scoreA: 11, scoreB: 13, winner: 'B' },
    { id: 'qf3', teamA: 'Metropolitan Gaming', teamB: 'Patagonia Pulse', scoreA: 13, scoreB: 6, winner: 'A' },
    { id: 'qf4', teamA: 'Duoc UC Gaming', teamB: 'Antofagasta Apex', scoreA: 14, scoreB: 12, winner: 'A' }
  ],
  semiFinals: [
    { id: 'sf1', teamA: 'Santiago Sentinels', teamB: 'Concepción Cyber', scoreA: 13, scoreB: 8, winner: 'A' },
    { id: 'sf2', teamA: 'Metropolitan Gaming', teamB: 'Duoc UC Gaming', scoreA: 10, scoreB: 13, winner: 'B' }
  ],
  grandFinal: {
    id: 'gf',
    teamA: 'Duoc UC Gaming',
    teamB: 'Santiago Sentinels',
    scoreA: 1,
    scoreB: 2,
    winner: 'B',
    champion: 'Santiago Sentinels (Campeón Oficial)'
  }
};

export default function TournamentBracket() {
  return (
    <div id="bracketTree" className="bg-[var(--bg-card)] shadow-[var(--neu-flat)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-8">
      
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-main)]">
            Llave Oficial: Copa Santiago VALORANT (Cuadro Principal)
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Eliminación directa · Servidor Santiago de Chile
          </p>
        </div>

        <span className="telemetry-indicator text-xs">
          <span className="indicator-pulse-dot"></span>
          <span>Fase Final Concluida</span>
        </span>
      </div>

      {/* Árbol de Brackets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center overflow-x-auto pb-4">
        
        {/* Columna Cuartos */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] flex items-center gap-1.5 pb-2 border-b border-[var(--border-subtle)]">
            <svg className="w-3.5 h-3.5 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Cuartos de Final
          </div>
          {MOCK_BRACKET.quarterFinals.map(m => (
            <div key={m.id} className="bg-[var(--bg-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)] shadow-[var(--neu-pressed-sm)] flex flex-col gap-1.5 text-xs">
              <div className={`flex items-center justify-between p-1.5 rounded-lg ${m.winner === 'A' ? 'bg-[var(--bg-card)] text-[var(--accent-mint)] font-bold shadow-[var(--neu-flat-xs)]' : 'text-[var(--text-muted)]'}`}>
                <span>{m.teamA}</span>
                <span className="font-mono">{m.scoreA}</span>
              </div>
              <div className={`flex items-center justify-between p-1.5 rounded-lg ${m.winner === 'B' ? 'bg-[var(--bg-card)] text-[var(--accent-mint)] font-bold shadow-[var(--neu-flat-xs)]' : 'text-[var(--text-muted)]'}`}>
                <span>{m.teamB}</span>
                <span className="font-mono">{m.scoreB}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Columna Semifinales */}
        <div className="flex flex-col gap-8">
          <div className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] flex items-center gap-1.5 pb-2 border-b border-[var(--border-subtle)]">
            <svg className="w-3.5 h-3.5 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Semifinales
          </div>
          {MOCK_BRACKET.semiFinals.map(m => (
            <div key={m.id} className="bg-[var(--bg-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)] shadow-[var(--neu-pressed-sm)] flex flex-col gap-1.5 text-xs">
              <div className={`flex items-center justify-between p-1.5 rounded-lg ${m.winner === 'A' ? 'bg-[var(--bg-card)] text-[var(--accent-mint)] font-bold shadow-[var(--neu-flat-xs)]' : 'text-[var(--text-muted)]'}`}>
                <span>{m.teamA}</span>
                <span className="font-mono">{m.scoreA}</span>
              </div>
              <div className={`flex items-center justify-between p-1.5 rounded-lg ${m.winner === 'B' ? 'bg-[var(--bg-card)] text-[var(--accent-mint)] font-bold shadow-[var(--neu-flat-xs)]' : 'text-[var(--text-muted)]'}`}>
                <span>{m.teamB}</span>
                <span className="font-mono">{m.scoreB}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Columna Gran Final */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-mono font-bold uppercase text-[var(--accent-amber)] flex items-center gap-1.5 pb-2 border-b border-[var(--border-subtle)]">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="8 21 12 17 16 21"></polyline>
              <line x1="12" y1="17" x2="12" y2="21"></line>
              <path d="M7 4H4a2 2 0 0 0-2 2v2a5 5 0 0 0 5 5h1"></path>
              <path d="M17 4h3a2 2 0 0 1 2 2v2a5 5 0 0 1-5 5h-1"></path>
              <rect x="7" y="2" width="10" height="11" rx="2"></rect>
            </svg>
            Gran Final
          </div>
          <div className="bg-[var(--bg-sunken)] p-4 rounded-2xl border border-[var(--accent-mint)]/40 shadow-[var(--neu-floating)] flex flex-col gap-2 text-xs">
            <div className={`flex items-center justify-between p-2 rounded-lg ${MOCK_BRACKET.grandFinal.winner === 'A' ? 'bg-[var(--bg-card)] text-[var(--accent-mint)] font-bold' : 'text-[var(--text-muted)]'}`}>
              <span>{MOCK_BRACKET.grandFinal.teamA}</span>
              <span className="font-mono text-sm">{MOCK_BRACKET.grandFinal.scoreA}</span>
            </div>
            <div className={`flex items-center justify-between p-2 rounded-lg ${MOCK_BRACKET.grandFinal.winner === 'B' ? 'bg-[var(--bg-card)] text-[var(--accent-mint)] font-bold' : 'text-[var(--text-muted)]'}`}>
              <span>{MOCK_BRACKET.grandFinal.teamB}</span>
              <span className="font-mono text-sm">{MOCK_BRACKET.grandFinal.scoreB}</span>
            </div>
          </div>
          <div className="text-center font-bold text-xs text-[var(--accent-mint)] mt-2 font-mono">
            {MOCK_BRACKET.grandFinal.champion}
          </div>
        </div>

      </div>

    </div>
  );
}

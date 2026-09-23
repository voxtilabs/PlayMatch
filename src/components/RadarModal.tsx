import React, { useState, useEffect } from 'react';

export default function RadarModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState('Evaluando candidatos activos en servidores locales...');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStatusText('Escaneando perfiles por cercanía de rango y preferencias horarias...');

      const timer1 = setTimeout(() => {
        setStatusText('Candidato con 98% de compatibilidad verificado. Creando canal táctico...');
      }, 1600);

      const timer2 = setTimeout(() => {
        setIsOpen(false);
        window.dispatchEvent(
          new CustomEvent('open-lobby-modal', {
            detail: {
              player: {
                id: 1,
                name: 'Ignacio Silva',
                gamertag: 'NachoViper#LAS',
                game: 'valorant',
                rank: 'Ascendente 2',
                role: 'Iniciador / Sova',
                avatarText: 'IS'
              }
            }
          })
        );
      }, 2900);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    };

    window.addEventListener('open-radar-modal', handleOpen);
    return () => window.removeEventListener('open-radar-modal', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="neu-modal-backdrop open">
      <div className="neu-modal-card max-w-sm text-center flex flex-col items-center gap-5">
        
        {/* Antena / Sonar HUD */}
        <div className="w-28 h-28 rounded-full bg-[var(--bg-sunken)] shadow-[var(--neu-pressed)] flex items-center justify-center relative">
          <div className="absolute w-20 h-20 rounded-full border-2 border-[var(--primary)] opacity-40 animate-ping"></div>
          <svg className="w-9 h-9 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">Radar de Afinidad Asistido</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs mx-auto">
            {statusText}
          </p>
        </div>

        <button onClick={() => setIsOpen(false)} className="neu-btn neu-btn-sm text-xs">
          Cancelar Escaneo
        </button>

      </div>
    </div>
  );
}

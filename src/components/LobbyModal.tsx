import React, { useState, useEffect, useRef } from 'react';

interface Partner {
  id: number;
  name: string;
  gamertag: string;
  game?: string;
  rank?: string;
  role?: string;
  avatarText?: string;
}

interface Message {
  sender: string;
  text: string;
  isSystem?: boolean;
}

export default function LobbyModal() {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.player) {
        const p = e.detail.player;
        setPartner(p);
        setMessages([
          {
            sender: 'system',
            text: 'Canal táctico privado establecido. Protocolo de convivencia activo: cero toxicidad.',
            isSystem: true
          },
          {
            sender: p.name,
            text: `Hola. Confirmo disponibilidad para jugar en servidores de Santiago. Pásame tu Discord o ID de juego para coordinar la sala.`
          }
        ]);
      }
    };

    window.addEventListener('open-lobby-modal', handleOpen);
    return () => window.removeEventListener('open-lobby-modal', handleOpen);
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const copyGamertag = () => {
    if (!partner) return;
    navigator.clipboard.writeText(partner.gamertag);
    showToast(`Gamertag copiado: ${partner.gamertag}`);
  };

  const copyDiscord = () => {
    if (!partner) return;
    const tag = `${partner.name.toLowerCase().replace(/[^a-z]/g, '')}_las#2026`;
    navigator.clipboard.writeText(tag);
    showToast(`Discord ID copiado: ${tag}`);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setMessages(prev => [...prev, { sender: 'Tú', text }]);
    setInputText('');

    setTimeout(() => {
      if (partner) {
        const responses = [
          'Solicitud enviada en el cliente de juego. Revisa tus invitaciones pendientes.',
          'Conectado al canal de voz de Discord. Te espero para iniciar cola competitiva.',
          'Listo por mi parte. Marca estado preparado en el cliente cuando desees buscar.'
        ];
        const randomResp = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { sender: partner.name, text: randomResp }]);
      }
    }, 1100);
  };

  const showToast = (message: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message } }));
  };

  const finishAndRate = () => {
    const currentPartner = partner;
    setPartner(null);
    if (currentPartner) {
      window.dispatchEvent(new CustomEvent('open-karma-modal', { detail: { player: currentPartner } }));
    }
  };

  if (!partner) return null;

  return (
    <div className="neu-modal-backdrop open">
      <div className="neu-modal-card max-w-lg flex flex-col gap-4">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Sala de Coordinación Privada</h3>
            <span className="text-[11px] font-mono text-[var(--accent-mint)]">Canal de comunicación seguro</span>
          </div>
          <button onClick={() => setPartner(null)} className="neu-icon-btn neu-btn-sm" aria-label="Cerrar ventana">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Dúo Roster Split */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)] flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--bg-card)] shadow-[var(--neu-flat-xs)] flex items-center justify-center font-mono font-bold text-xs text-[var(--primary)]">
              TÚ
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--text-main)]">Gamer VoxTi</div>
              <div className="text-[10px] font-mono text-[var(--text-muted)]">VoxTiPlayer#CL</div>
            </div>
          </div>

          <div className="bg-[var(--bg-sunken)] p-3 rounded-2xl border border-[var(--border-subtle)] flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--bg-card)] shadow-[var(--neu-flat-xs)] flex items-center justify-center font-mono font-bold text-xs text-[var(--accent-violet)]">
              {partner.avatarText || 'IS'}
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--text-main)]">{partner.name}</div>
              <div className="text-[10px] font-mono text-[var(--accent-mint)]">{partner.gamertag}</div>
            </div>
          </div>
        </div>

        {/* Botones de Copiado */}
        <div className="flex gap-2">
          <button onClick={copyGamertag} className="neu-btn neu-btn-sm text-xs flex-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copiar Gamertag
          </button>
          <button onClick={copyDiscord} className="neu-btn neu-btn-sm text-xs flex-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            Copiar Discord
          </button>
        </div>

        {/* Ventana de Chat */}
        <div className="h-56 bg-[var(--bg-sunken)] shadow-[var(--neu-pressed-sm)] border border-[var(--border-subtle)] rounded-2xl p-3 overflow-y-auto flex flex-col gap-2.5">
          {messages.map((m, idx) => {
            if (m.isSystem) {
              return (
                <div key={idx} className="bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 text-[11px] p-2 rounded-xl text-center font-mono">
                  {m.text}
                </div>
              );
            }
            const isMe = m.sender === 'Tú';
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl max-w-[85%] text-xs flex flex-col ${
                  isMe
                    ? 'self-end bg-[var(--primary)] text-white shadow-[0_2px_8px_rgba(61,90,254,0.3)]'
                    : 'self-start bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] shadow-[var(--neu-flat-xs)]'
                }`}
              >
                <span className="text-[10px] font-bold opacity-75 mb-0.5">{m.sender}</span>
                <span>{m.text}</span>
              </div>
            );
          })}
          <div ref={chatBottomRef} />
        </div>

        {/* Entrada de Chat */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Coordinar sala o partida..."
            className="neu-input flex-1 text-xs"
          />
          <button onClick={sendMessage} className="neu-btn neu-btn-primary text-xs px-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Enviar
          </button>
        </div>

        {/* Cierre y Calificación */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">¿Partida concluida?</span>
          <button onClick={finishAndRate} className="neu-btn neu-btn-mint neu-btn-sm text-xs">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Calificar Experiencia
          </button>
        </div>

      </div>
    </div>
  );
}

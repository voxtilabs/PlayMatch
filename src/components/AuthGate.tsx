import React, { useState, useEffect, useCallback } from 'react';

interface AuthUser {
  gamertag: string;
  email: string;
  clanTag?: string;
}

export default function AuthGate({ children }: { children?: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

  // Form states - Login
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form states - Registro
  const [regGamertag, setRegGamertag] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Common form states
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validaciones en tiempo real para contraseña de registro
  const hasMinLength = regPassword.length >= 6;
  const hasUpperCase = /[A-Z]/.test(regPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-]/.test(regPassword);
  const isPasswordValid = hasMinLength && hasUpperCase && hasSpecialChar;

  // Verificación de sesión previa al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pm_auth_user') || sessionStorage.getItem('pm_auth_user');
      if (stored) {
        const user: AuthUser = JSON.parse(stored);
        if (user && user.gamertag) {
          setIsAuthenticated(true);
        }
      }
    } catch {
      // Sin sesión válida previa
    }
    setIsReady(true);
  }, []);

  // Event listener para cerrar sesión desde Navbar u otro componente
  const handleLogout = useCallback(() => {
    localStorage.removeItem('pm_auth_user');
    sessionStorage.removeItem('pm_auth_user');
    setIsAuthenticated(false);
    setLoginPassword('');
    setRegPassword('');
    setRegConfirmPassword('');
    setErrorMessage('');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Sesión finalizada. Has vuelto al portal de acceso.' } }));
  }, []);

  useEffect(() => {
    const handleLogoutEvent = () => handleLogout();
    const handleOpenLogin = () => setIsAuthenticated(false);

    window.addEventListener('logout-user', handleLogoutEvent);
    window.addEventListener('open-login-portal', handleOpenLogin);

    return () => {
      window.removeEventListener('logout-user', handleLogoutEvent);
      window.removeEventListener('open-login-portal', handleOpenLogin);
    };
  }, [handleLogout]);

  const showToast = (message: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message } }));
  };

  // Enviar Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginIdentifier.trim()) {
      setErrorMessage('Por favor ingresa tu usuario o correo electrónico.');
      return;
    }
    if (!loginPassword) {
      setErrorMessage('Por favor ingresa tu contraseña de acceso.');
      return;
    }

    const gamertag = loginIdentifier.includes('@')
      ? loginIdentifier.split('@')[0] + '#LAS'
      : (loginIdentifier.includes('#') ? loginIdentifier : loginIdentifier + '#LAS');

    const authUser: AuthUser = {
      gamertag,
      email: loginIdentifier.includes('@') ? loginIdentifier : `${gamertag.replace('#', '_')}@playmatch.gg`,
      clanTag: 'VOX'
    };

    if (rememberMe) {
      localStorage.setItem('pm_auth_user', JSON.stringify(authUser));
    } else {
      sessionStorage.setItem('pm_auth_user', JSON.stringify(authUser));
    }

    setIsAuthenticated(true);
    showToast(`¡Bienvenido al Cockpit de PlayMatch, ${authUser.gamertag}!`);
  };

  // Enviar Registro
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regGamertag.trim() || regGamertag.trim().length < 3) {
      setErrorMessage('El nombre de usuario debe contener al menos 3 caracteres.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@') || !regEmail.includes('.')) {
      setErrorMessage('Ingresa un correo electrónico con formato válido.');
      return;
    }
    if (!hasMinLength) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (!hasUpperCase) {
      setErrorMessage('La contraseña debe incluir al menos una letra mayúscula.');
      return;
    }
    if (!hasSpecialChar) {
      setErrorMessage('La contraseña debe incluir al menos un carácter especial (!@#$%...).');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Las contraseñas ingresadas no coinciden.');
      return;
    }

    const gamertagFinal = regGamertag.includes('#') ? regGamertag : `${regGamertag}#LAS`;
    const newAuthUser: AuthUser = {
      gamertag: gamertagFinal,
      email: regEmail.trim(),
      clanTag: 'VOX'
    };

    if (rememberMe) {
      localStorage.setItem('pm_auth_user', JSON.stringify(newAuthUser));
    } else {
      sessionStorage.setItem('pm_auth_user', JSON.stringify(newAuthUser));
    }

    // Inicializar perfil gamer en localStorage
    try {
      const existingProfile = localStorage.getItem('pm_my_gamer_profile');
      if (!existingProfile) {
        const initialProfile = {
          id: Date.now() % 10000,
          name: regGamertag,
          gamertag: gamertagFinal,
          clanTag: 'VOX',
          game: 'valorant',
          gameTitle: 'VALORANT',
          rank: 'Calibrando...',
          role: 'Flex Operative',
          karma: 5.0,
          winRate: '60%',
          matchesCount: 0,
          bio: 'Nuevo operador registrado en PlayMatch. Listo para emparejar en servidores de baja latencia.',
          avatarText: regGamertag.substring(0, 2).toUpperCase(),
          bannerTheme: 'magma',
          avatarFrame: 'solar',
          statusMood: 'Listo para Competir',
          honors: ['Nuevo Recluta', 'Conducta Limpia']
        };
        localStorage.setItem('pm_my_gamer_profile', JSON.stringify(initialProfile));
      }
    } catch {}

    setIsAuthenticated(true);
    showToast(`¡Cuenta creada con éxito! Bienvenido a la escuadra, ${newAuthUser.gamertag}.`);
  };

  // Rápido login de demostración
  const handleQuickDemoLogin = () => {
    const demoUser: AuthUser = {
      gamertag: 'NachoViper#LAS',
      email: 'nacho.silva@playmatch.gg',
      clanTag: 'VOX'
    };
    if (rememberMe) {
      localStorage.setItem('pm_auth_user', JSON.stringify(demoUser));
    } else {
      sessionStorage.setItem('pm_auth_user', JSON.stringify(demoUser));
    }
    setIsAuthenticated(true);
    showToast('Acceso con credenciales de prueba activado.');
  };

  return (
    <>
      {/* Contenido Principal Protegido */}
      <div style={{ display: isAuthenticated ? 'block' : 'none' }}>
        {children}
      </div>

      {/* Ventana de Login / Registro Gamer si no está autenticado */}
      {!isAuthenticated && isReady && (
        <div className="auth-portal-backdrop animate-fadeIn" role="dialog" aria-modal="true" aria-label="Portal de Acceso PlayMatch">
          
          <div className="auth-portal-card hud-corners grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            
            {/* Columna Izquierda: Formulario Táctico */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
              
              {/* Encabezado: Marca y Modos */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-sunken)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--primary)] shadow-[var(--neu-flat-xs)]">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-black tracking-tight text-[var(--text-main)] font-['Outfit'] flex items-center gap-2">
                        Play<span className="text-[var(--primary)]">Match</span>
                        <span className="text-[9px] tracking-wider px-1.5 py-0.5 rounded font-mono font-bold bg-[var(--bg-sunken)] border border-[var(--border-subtle)] text-[var(--accent-mint)]">
                          VOXTI LABS
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="telemetry-indicator text-xs">
                    <span className="indicator-pulse-dot"></span>
                    <span>SCL-1: 8ms</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">
                  {isRegisterMode ? 'Crear Nueva Cuenta' : 'Centro de Acceso'}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                  {isRegisterMode
                    ? 'Regístrate para personalizar tu perfil, armar tu escuadra y disputar torneos.'
                    : 'Ingresa tus credenciales tácticas para acceder al matchmaking y salas de juego.'}
                </p>
              </div>

              {/* Conmutador Superior de Pestañas Login / Registro */}
              <div className="flex items-center bg-[var(--bg-sunken)] p-1 rounded-2xl border border-[var(--border-subtle)] shadow-[var(--neu-pressed-sm)]">
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                    !isRegisterMode
                      ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-[var(--neu-flat-xs)]'
                      : 'text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                    isRegisterMode
                      ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-[var(--neu-flat-xs)]'
                      : 'text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  Crear Cuenta
                </button>
              </div>

              {/* Mensaje de Error si existe */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <svg className="w-4 h-4 text-[var(--accent-red)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* FORMULARIO DE INICIO DE SESIÓN */}
              {!isRegisterMode ? (
                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                  
                  {/* Usuario o Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                      <span>Usuario o Correo Electrónico</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={e => setLoginIdentifier(e.target.value)}
                        placeholder="NachoViper#LAS o tu correo"
                        className="neu-input text-xs pl-10"
                        autoFocus
                      />
                      <svg className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                      <span>Contraseña</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="neu-input text-xs pl-10 pr-10"
                      />
                      <svg className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                        aria-label="Alternar visibilidad de contraseña"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mantener Sesión Abierta (Checkbox Requerido) */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <div
                        onClick={() => setRememberMe(!rememberMe)}
                        className={`auth-checkbox ${rememberMe ? 'checked' : ''}`}
                        role="checkbox"
                        aria-checked={rememberMe}
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') setRememberMe(!rememberMe); }}
                      >
                        {rememberMe && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[var(--text-body)]">
                        Mantener la sesión abierta
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => showToast('Para restablecer contraseña contacta al oficial de sala VOXTI LABS.')}
                      className="text-xs font-mono text-[var(--primary)] hover:underline"
                    >
                      ¿Olvidaste tu clave?
                    </button>
                  </div>

                  {/* Botón Principal de Login */}
                  <button type="submit" className="neu-btn neu-btn-primary w-full mt-2 text-xs font-bold py-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    <span>Acceder a PlayMatch</span>
                  </button>

                  {/* Acceso Rápido Demo */}
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="neu-btn neu-btn-sm text-xs text-[var(--text-muted)] hover:text-white w-full border-dashed"
                  >
                    Ingresar con Operador de Prueba (NachoViper#LAS)
                  </button>

                </form>
              ) : (
                /* FORMULARIO DE REGISTRO / CREAR CUENTA */
                <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5">
                  
                  {/* Nombre de Usuario (Gamertag) */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Nombre de Usuario / Gamertag
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={regGamertag}
                        onChange={e => setRegGamertag(e.target.value)}
                        placeholder="Ej: ValkyrieAce"
                        className="neu-input text-xs pl-10"
                        autoFocus
                      />
                      <svg className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="operador@gmail.com"
                        className="neu-input text-xs pl-10"
                      />
                      <svg className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                  </div>

                  {/* Contraseña con Requisitos Estrictos */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                      <span>Contraseña de Seguridad</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="Crea tu clave segura..."
                        className="neu-input text-xs pl-10 pr-10"
                      />
                      <svg className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* REQUISITOS OBLIGATORIOS EN VIVO SOLICITADOS POR EL USUARIO */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className={`password-req-pill ${hasMinLength ? 'valid' : ''}`}>
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={hasMinLength ? '3' : '2'}>
                          {hasMinLength ? <polyline points="20 6 9 17 4 12"></polyline> : <circle cx="12" cy="12" r="9"></circle>}
                        </svg>
                        Mínimo 6 caracteres
                      </span>

                      <span className={`password-req-pill ${hasUpperCase ? 'valid' : ''}`}>
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={hasUpperCase ? '3' : '2'}>
                          {hasUpperCase ? <polyline points="20 6 9 17 4 12"></polyline> : <circle cx="12" cy="12" r="9"></circle>}
                        </svg>
                        1 Mayúscula [A-Z]
                      </span>

                      <span className={`password-req-pill ${hasSpecialChar ? 'valid' : ''}`}>
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={hasSpecialChar ? '3' : '2'}>
                          {hasSpecialChar ? <polyline points="20 6 9 17 4 12"></polyline> : <circle cx="12" cy="12" r="9"></circle>}
                        </svg>
                        1 Carácter especial (!@#$...)
                      </span>
                    </div>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Confirmar Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={e => setRegConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña..."
                        className="neu-input text-xs pl-10"
                      />
                      <svg className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>

                  {/* Mantener Sesión Abierta */}
                  <div className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                    <div
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`auth-checkbox ${rememberMe ? 'checked' : ''}`}
                      role="checkbox"
                      aria-checked={rememberMe}
                      tabIndex={0}
                      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') setRememberMe(!rememberMe); }}
                    >
                      {rememberMe && (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[var(--text-body)]">
                      Mantener la sesión abierta tras registrarse
                    </span>
                  </div>

                  {/* Botón de Registro */}
                  <button
                    type="submit"
                    disabled={!isPasswordValid}
                    className={`neu-btn neu-btn-primary w-full mt-2 text-xs font-bold py-3 ${
                      !isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    <span>Crear Cuenta &amp; Acceder</span>
                  </button>

                </form>
              )}

              {/* Pie del Formulario: Alternar modo */}
              <div className="pt-3 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
                {!isRegisterMode ? (
                  <span>
                    ¿No tienes una cuenta aún?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
                      className="font-bold text-[var(--primary)] hover:underline ml-1 cursor-pointer"
                    >
                      Crear cuenta gratis
                    </button>
                  </span>
                ) : (
                  <span>
                    ¿Ya tienes una cuenta registrada?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
                      className="font-bold text-[var(--primary)] hover:underline ml-1 cursor-pointer"
                    >
                      Inicia sesión aquí
                    </button>
                  </span>
                )}
              </div>

            </div>

            {/* Columna Derecha: Panel Visual Gamer de Alto Impacto */}
            <div className="auth-visual-panel hidden lg:flex flex-col justify-between p-8 relative">
              
              {/* Imagen Gamer Sincronizada con la Paleta de la Página */}
              <img
                src="/images/gamer_login_art.jpg"
                alt="Operador Táctico PlayMatch"
                className="auth-visual-img absolute inset-0 z-0"
                loading="eager"
              />

              {/* Overlays Cinemáticos para Integración Óptima */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-modal)] via-transparent to-black/60 z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-modal)] via-transparent to-transparent z-10 pointer-events-none"></div>

              {/* Badge de Telemetría Superior */}
              <div className="relative z-20 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-white shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-mint)] animate-pulse"></span>
                  OPERADOR EN LÍNEA
                </span>
                <span className="font-mono text-xs text-white/70">
                  RED SCL · 240 FPS
                </span>
              </div>

              {/* Cita Inspiracional Esports Inferior */}
              <div className="relative z-20 bg-black/65 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-2 mb-2 text-[var(--primary)] text-xs font-bold uppercase tracking-wider font-mono">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Matchmaking Táctico &amp; Torneos
                </div>
                <p className="text-xs text-white/90 leading-relaxed font-['Plus_Jakarta_Sans']">
                  "Conéctate con tu escuadra ideal en base a tu franja horaria real y conducta impecable. Cero toxicidad, máxima sincronía."
                </p>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>VOXTI LABS · SANTIAGO</span>
                  <span className="text-[var(--accent-mint)] font-bold">100% LIBRE DE TOXICIDAD</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

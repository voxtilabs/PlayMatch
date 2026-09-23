# Matriz de Funcionalidades & Roadmap — PlayMatch

> Versión 1.0 · Planificación por Fases (18 Semanas + Post-MVP)  
> VoxTi Labs · Duoc UC San Joaquín

---

## 1. Alcance del MVP (Fase 1 y 2: Semanas 1 a 14)

El MVP se enfoca en resolver el **núcleo de valor** con riesgo técnico controlado, priorizando la estabilidad y la experiencia de usuario:

| Módulo | Funcionalidad | Prioridad | Estado en Versión Preliminar |
| :--- | :--- | :---: | :---: |
| **Usuarios** | Registro e inicio de sesión seguro (JWT) | P0 | ✅ Diseñado & documentado |
| **Perfiles** | Carga manual de nicks, rangos, roles y horarios | P0 | ✅ Implementado interactivamente |
| **Matchmaking** | Filtros en vivo por juego, horario, modo y mic | P0 | ✅ Funcional en web preliminar |
| **Matchmaking** | Algoritmo de cálculo de afinidad (%) | P0 | ✅ Operativo en frontend |
| **Matchmaking** | Radar de búsqueda rápida (Quick Match) | P1 | ✅ Simulado con animación y eventos |
| **Salas / Chat** | Creación de sala privada de coordinación | P1 | ✅ Operativa con copia de Gamertag/Discord |
| **Salas / Chat** | Mensajería de texto en tiempo real | P1 | ✅ Chat interactivo con respuestas simuladas |
| **Reputación** | Sistema de Karma y entrega de honor post-partida | P1 | ✅ Modal interactivo y recálculo de karma |
| **Torneos** | Catálogo de torneos con fechas y premios | P1 | ✅ Presentación interactiva |
| **Torneos** | Inscripción de escuadras con capitán | P1 | ✅ Modal funcional con confirmación |
| **Torneos** | Visualizador de Brackets (Llaves) en vivo | P2 | ✅ Árbol de llaves renderizado interactivo |
| **UI / UX** | Sistema Pulso con modo día / modo noche | P0 | ✅ Funcional con persistencia local |

---

## 2. Fase de Cierre Técnico (Fase 3: Semanas 15 a 18)

- **Contenerización Docker:** Imagen optimizada para evaluación y despliegue local portable.
- **Suite de Pruebas Automatizadas:** Pruebas de integración para garantizar que el cálculo de afinidad y el avance de brackets nunca fallen.
- **Documentación de Portafolio:** Manual de configuración, arquitectura y evidencias para la comisión evaluadora de Duoc UC.

---

## 3. Funcionalidades para Versiones Posteriores (Post-MVP)

Estas capacidades se planifican para una etapa comercial posterior a la titulación:

1. **Integración con APIs Oficiales de Videojuegos:**
   - Sincronización automática de rangos con Riot Games API (Valorant / LoL) y Steam Web API (CS2).
2. **Sistema de Pagos y Bounties para Premios:**
   - Integración con pasarelas de pago locales (Webpay Plus / Fintoc) para recaudación de inscripciones y pago automatizado de premios a capitanes ganadores.
3. **Bot de Discord Oficial:**
   - Bot verificado que crea canales de voz temporales automáticamente al concretarse un match en la web y notifica inicios de partidas de torneos.
4. **Modo Suizo Avanzado y Check-in con Código QR:**
   - Soporte para torneos masivos presenciales o híbridos en eventos eSports.
5. **Inteligencia Artificial para Detección de Toxicidad:**
   - Análisis de mensajes de chat en sala mediante modelos NLP para prevenir acoso o lenguaje de odio en tiempo real.

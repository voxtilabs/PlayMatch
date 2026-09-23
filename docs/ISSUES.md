# Backlog de Issues para GitHub — PlayMatch (VoxTi Labs)

> Este catálogo contiene los **16 issues oficiales** listos para ser abiertos en el repositorio [`voxtilabs/PlayMatch`](https://github.com/voxtilabs/PlayMatch), redactados siguiendo estrictamente el estándar de ingeniería de VoxTi Labs (*Qué*, *Por qué*, *Criterios de Aceptación*, *Módulos*, *Prioridad*).

---

### Epic 1: Infraestructura Base & Entorno (Semanas 1–4)

#### Issue #1: `chore(infra): inicializar monorepo, docker compose y pipeline de CI`
- **Etiquetas:** `type:chore`, `priority:p0`, `module:infra`
- **Qué:** Configurar el repositorio base con Docker Compose para desarrollo local (Postgres 16, Redis y backend API), linter (ESLint / Ruff) y workflow de GitHub Actions que ejecute tests y chequeos de tipos en cada PR.
- **Por qué:** Un estándar de entrega continua desde la Semana 1 previene fallas de integración y asegura que el código siempre compile de forma reproducible.
- **Criterios de aceptación:**
  - [ ] `docker compose up` levanta PostgreSQL y Redis con healthchecks operativos.
  - [ ] GitHub Actions `.github/workflows/ci.yml` ejecuta pruebas y validación de tipos en branch `main` y PRs.
  - [ ] Variables de entorno documentadas en `.env.example`.

#### Issue #2: `feat(db): migración del esquema relacional base en PostgreSQL`
- **Etiquetas:** `type:feat`, `priority:p0`, `module:data`
- **Qué:** Crear las migraciones iniciales para las tablas del sistema: `users`, `gamer_profiles`, `matches`, `lobbies`, `lobby_messages`, `karma_ratings`, `tournaments`, `tournament_teams` y `tournament_matches`.
- **Por qué:** El modelo de datos es la base de todo el MVP y debe garantizar integridad referencial y restricciones CHECK antes de construir la capa de negocio.
- **Criterios de aceptación:**
  - [ ] Migraciones ejecutadas sin errores con herramienta de migración (Alembic / Prisma / Flyway).
  - [ ] Restricciones de unicidad y llaves foráneas validadas con tests unitarios.

---

### Epic 2: Autenticación & Perfiles Gamer (Semanas 5–8)

#### Issue #3: `feat(auth): registro, login y emisión de JWT para usuarios`
- **Etiquetas:** `type:feat`, `priority:p0`, `module:auth`
- **Qué:** Implementar endpoints `/api/v1/auth/register` y `/api/v1/auth/login` con encriptación bcrypt / Argon2 de contraseñas y emisión de token JWT con tiempo de expiración y refresh token.
- **Por qué:** Los jugadores requieren credenciales seguras para administrar sus cuentas vinculadas y resguardar su reputación comunitaria.
- **Criterios de aceptación:**
  - [ ] Contraseñas almacenadas exclusivamente como hashes seguros.
  - [ ] Endpoints protegidos mediante dependency/middleware de autenticación Bearer JWT.

#### Issue #4: `feat(profiles): CRUD de perfiles gamer y vinculación manual de cuentas`
- **Etiquetas:** `type:feat`, `priority:p1`, `module:profiles`
- **Qué:** Endpoints para que el usuario registre y edite sus perfiles por juego (Valorant, LoL, CS2, Rocket League) indicando gamertag, rango actual, rol preferido, horario semanal y estilo (casual vs tryhard).
- **Por qué:** Para controlar el riesgo del MVP y no depender de aprobaciones tempranas de APIs de Riot/Valve, los datos se ingresan de forma asistida por el usuario.
- **Criterios de aceptación:**
  - [ ] Un usuario puede asociar hasta un perfil por juego soportado.
  - [ ] Validación de formatos de gamertag (ej: `Nombre#TAG`).

---

### Epic 3: Motor de Matchmaking & Emparejamiento Social (Semanas 9–11)

#### Issue #5: `feat(matchmaking): algoritmo de cálculo de afinidad y filtros en tiempo real`
- **Etiquetas:** `type:feat`, `priority:p0`, `module:matchmaking`
- **Qué:** Implementar la lógica de scoring de compatibilidad (0% a 100%) ponderando coincidencia de juego, cercanía de elo/división, horario habitual de conexión y uso de micrófono.
- **Por qué:** Es el núcleo del valor de PlayMatch; encontrar compañeros compatibles reduce drásticamente la tasa de partidas abandonadas y frustración.
- **Criterios de aceptación:**
  - [ ] Endpoint `/api/v1/players` responde con listado filtrable ordenado por compatibilidad descendente.
  - [ ] Respuesta con latencia menor a 150 ms para catálogos de hasta 10.000 jugadores activos.

#### Issue #6: `feat(matchmaking): radar de búsqueda rápida (Quick Match)`
- **Etiquetas:** `type:feat`, `priority:p1`, `module:matchmaking`
- **Qué:** Endpoint `/api/v1/matchmaking/quick-search` que coloca al usuario en una cola de espera en memoria (Redis) y empareja automáticamente con el mejor candidato disponible en un umbral de 30 segundos.
- **Por qué:** Permite a jugadores que quieren una partida inmediata encontrar dúo sin explorar manualmente el catálogo.
- **Criterios de aceptación:**
  - [ ] Manejo de timeout y cancelación de búsqueda sin dejar estados huérfanos en Redis.
  - [ ] Emparejamiento automático y disparo de evento de match encontrado.

---

### Epic 4: Salas de Coordinación & Chat en Tiempo Real (Semanas 12–13)

#### Issue #7: `feat(chat): servidor WebSocket para salas de lobby y coordinación`
- **Etiquetas:** `type:feat`, `priority:p1`, `module:chat`
- **Qué:** Servicio WebSocket (`/ws/lobbies/:room_code`) para mensajería instantánea bidireccional entre los integrantes de un match aceptado, con estado de presencia (Listo / En juego).
- **Por qué:** Permite pasarse los links de Discord, códigos de lobby de juego y ponerse de acuerdo antes de iniciar la partida.
- **Criterios de aceptación:**
  - [ ] Mensajes entregados a los integrantes conectados en menos de 50 ms.
  - [ ] Historial reciente persistido para usuarios que reconecten la pestaña.

#### Issue #8: `feat(social): acciones rápidas de copiado de Gamertag y Discord`
- **Etiquetas:** `type:feat`, `priority:p2`, `module:ui`
- **Qué:** Botones de un solo clic en la sala para copiar el Riot ID, Steam ID o Discord Tag directamente al portapapeles del sistema operativo, con feedback visual toast.
- **Por qué:** Minimiza la fricción de agregar amigos manualmente en el cliente del juego.
- **Criterios de aceptación:**
  - [ ] Soporte para Clipboard API en navegadores de escritorio y celulares.

---

### Epic 5: Módulo de Torneos Amateur & Brackets (Semanas 13–15)

#### Issue #9: `feat(tournaments): registro y administración de torneos comunitarios`
- **Etiquetas:** `type:feat`, `priority:p1`, `module:tournaments`
- **Qué:** Creación de torneos con fecha, cupos de equipos, juego, servidores y descripción de premios. Endpoint de inscripción de escuadras con validación de capitán y contacto.
- **Por qué:** Resuelve la fragmentación de la competencia amateur que actualmente se coordina de manera precaria en Discord.
- **Criterios de aceptación:**
  - [ ] Cierre automático de inscripciones cuando se alcanza el límite de cupos (`max_teams`).
  - [ ] Listado público de equipos confirmados.

#### Issue #10: `feat(tournaments): generador automático de árbol de llaves (Brackets)`
- **Etiquetas:** `type:feat`, `priority:p1`, `module:tournaments`
- **Qué:** Módulo que genera automáticamente la estructura de llaves de eliminación directa (Cuartos, Semifinales, Final) una vez cerrado el torneo, y avanza a los ganadores según los resultados reportados.
- **Por qué:** Elimina la necesidad de dibujar o actualizar llaves manualmente en planillas externas.
- **Criterios de aceptación:**
  - [ ] Árbol de partidos generado de acuerdo al número de equipos (potencias de 2: 8 o 16).
  - [ ] Al registrarse el ganador de una serie, el equipo avanza automáticamente a la siguiente ronda.

---

### Epic 6: Reputación Comunitaria & Karma Anti-Toxicidad (Semanas 14–16)

#### Issue #11: `feat(karma): flujo de calificación y reconocimiento de honor post-partida`
- **Etiquetas:** `type:feat`, `priority:p1`, `module:karma`
- **Qué:** Modal al finalizar la partida en la sala de coordinación que permite calificar de 1 a 5 estrellas y otorgar insignias de honor ("Cero Toxicidad", "Buen Shotcalling", "Gran Comunicación", "Puntual").
- **Por qué:** Fomenta la autorregulación de la comunidad y crea un incentivo directo para no tiltearse ni agredir a compañeros.
- **Criterios de aceptación:**
  - [ ] Solo se puede calificar una vez por match finalizado.
  - [ ] El score de karma del usuario evaluado se recalcula con media móvil ponderada.

#### Issue #12: `feat(karma): aislamiento de jugadores con baja reputación en colas separadas`
- **Etiquetas:** `type:feat`, `priority:p2`, `module:karma`
- **Qué:** Regla en el algoritmo de emparejamiento que segrega a jugadores con karma menor a 3.5 estrellas hacia una cola de baja prioridad, protegiendo a los jugadores con buen comportamiento.
- **Por qué:** Garantiza la seguridad y bienestar emocional de la comunidad.
- **Criterios de aceptación:**
  - [ ] Jugadores con karma < 3.5 no aparecen en las sugerencias de usuarios con karma > 4.5.

---

### Epic 7: Frontend, Sistema de Diseño Pulso & Experiencia de Usuario (Semanas 11–16)

#### Issue #13: `feat(ui): implementación de tokens del Sistema de Diseño Pulso con modo dual día/noche`
- **Etiquetas:** `type:feat`, `priority:p1`, `module:ui`
- **Qué:** Estilos globales basados en variables CSS (`--bg`, `--bg-raised`, `--action`, `--warn`, `--good-text`), modo día y modo noche mediante selector `[data-mode]`, y tipografías Outfit, Inter y JetBrains Mono.
- **Por qué:** Cumplimiento estricto del manual de marca de VoxTi Labs y garantía de accesibilidad visual y estética premium gamer.
- **Criterios de aceptación:**
  - [ ] Modo día y modo noche intercambiables instantáneamente sin parpadeos ni recargas de página.
  - [ ] Ratios de contraste WCAG AA cumplidos en ambos modos.

#### Issue #14: `feat(ui): componente de visualización reactiva de llaves de torneo`
- **Etiquetas:** `type:feat`, `priority:p2`, `module:ui`
- **Qué:** Componente visual interactivo para visualizar las llaves de torneos con conexión visual entre rondas, marcadores en vivo y destacado del campeón.
- **Por qué:** Proporciona a los participantes y espectadores un seguimiento transparente de la competencia.
- **Criterios de aceptación:**
  - [ ] Visualización fluida y responsiva con scroll horizontal en dispositivos móviles.

---

### Epic 8: Pruebas, Dockerización & Preparación de Entrega (Semanas 16–18)

#### Issue #15: `test(qa): suite de pruebas de integración para matchmaking y torneos`
- **Etiquetas:** `type:test`, `priority:p0`, `module:qa`
- **Qué:** Batería de pruebas automatizadas que simule el ciclo completo: registro de usuario, cálculo de compatibilidad, invitación a partida, chat y reporte de torneo.
- **Por qué:** Requisito indispensable para la evaluación técnica y defensa del proyecto de título ante la comisión examinadora.
- **Criterios de aceptación:**
  - [ ] Cobertura de código superior al 80% en los módulos de negocio.
  - [ ] Tiempos de ejecución de tests inferiores a 30 segundos en el pipeline de CI.

#### Issue #16: `chore(release): contenerización final en Docker y manual de despliegue`
- **Etiquetas:** `type:chore`, `priority:p0`, `module:infra`
- **Qué:** `Dockerfile` multi-stage optimizado, configuración de variables de entorno y manual paso a paso de puesta en marcha para evaluación docente.
- **Por qué:** Permite a la comisión evaluadora levantar la solución completa con un único comando.
- **Criterios de aceptación:**
  - [ ] Imagen de producción con tamaño menor a 200 MB.
  - [ ] Despliegue validado desde cero en un ambiente limpio.

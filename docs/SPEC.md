# SPEC-001: Especificación Técnica de Arquitectura y Datos — PlayMatch

> Versión 1.0 · Septiembre 2026  
> Producto: PlayMatch (VoxTi Labs)  
> Proyecto de Portafolio APT122 — Duoc UC San Joaquín

---

## 1. Alcance & Objetivos del Sistema

PlayMatch es una aplicación web full-stack diseñada para resolver el emparejamiento social y la gestión de torneos amateur en la comunidad gamer. El sistema debe operar con alta disponibilidad, baja latencia en la coordinación en vivo y estricta integridad en la persistencia relacional.

---

## 2. Modelo de Datos Relacional (PostgreSQL)

```sql
-- 1. Tabla de Usuarios & Autenticación
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(32) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    country VARCHAR(3) DEFAULT 'CHL',
    karma_score NUMERIC(3, 2) DEFAULT 5.00 CHECK (karma_score >= 0.00 AND karma_score <= 5.00),
    total_reviews INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Perfiles Gamer Vinculados
CREATE TABLE gamer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    game_code VARCHAR(32) NOT NULL, -- 'valorant', 'lol', 'cs2', 'rocket_league'
    gamertag VARCHAR(64) NOT NULL,
    current_rank VARCHAR(32) NOT NULL,
    preferred_role VARCHAR(64),
    play_style VARCHAR(16) DEFAULT 'ranked' CHECK (play_style IN ('ranked', 'casual')),
    schedule_preference VARCHAR(16) DEFAULT 'noches' CHECK (schedule_preference IN ('tardes', 'noches', 'findes')),
    mic_required BOOLEAN DEFAULT TRUE,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, game_code)
);

-- 3. Solicitudes y Emparejamientos (Matchmaking)
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES users(id),
    target_id UUID NOT NULL REFERENCES users(id),
    game_code VARCHAR(32) NOT NULL,
    status VARCHAR(16) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'expired')),
    compatibility_score INT CHECK (compatibility_score BETWEEN 0 AND 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP WITH TIME ZONE
);

-- 4. Salas de Lobby y Coordinación
CREATE TABLE lobbies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
    room_code VARCHAR(16) NOT NULL UNIQUE,
    status VARCHAR(16) DEFAULT 'active' CHECK (status IN ('active', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lobby_messages (
    id BIGSERIAL PRIMARY KEY,
    lobby_id UUID NOT NULL REFERENCES lobbies(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id),
    message_type VARCHAR(16) DEFAULT 'user' CHECK (message_type IN ('user', 'system')),
    content TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Calificaciones de Karma Post-Partida
CREATE TABLE karma_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL REFERENCES matches(id),
    evaluator_id UUID NOT NULL REFERENCES users(id),
    evaluated_id UUID NOT NULL REFERENCES users(id),
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    badge_honor VARCHAR(32), -- 'zero_toxic', 'good_comms', 'punctual', 'shotcaller'
    feedback_text VARCHAR(280),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(match_id, evaluator_id)
);

-- 6. Torneos & Brackets
CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(128) NOT NULL,
    game_code VARCHAR(32) NOT NULL,
    max_teams INT NOT NULL DEFAULT 8,
    status VARCHAR(16) DEFAULT 'open' CHECK (status IN ('draft', 'open', 'ongoing', 'finished')),
    format VARCHAR(32) DEFAULT 'single_elimination',
    prize_description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournament_teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    team_name VARCHAR(64) NOT NULL,
    captain_id UUID NOT NULL REFERENCES users(id),
    contact_discord VARCHAR(64),
    seed INT,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournament_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    round_number INT NOT NULL, -- 1: Cuartos, 2: Semis, 3: Final
    match_order INT NOT NULL,
    team_a_id UUID REFERENCES tournament_teams(id),
    team_b_id UUID REFERENCES tournament_teams(id),
    score_a INT DEFAULT 0,
    score_b INT DEFAULT 0,
    winner_id UUID REFERENCES tournament_teams(id),
    status VARCHAR(16) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'playing', 'finished'))
);
```

---

## 3. Algoritmo de Compatibilidad (Heurística de Afinidad)

El puntaje de compatibilidad \(C \in [0, 100]\) entre un usuario solicitante \(U_1\) y un candidato \(U_2\) se formula según pesos ponderados:

\[
C = W_{\text{juego}} \cdot S_{\text{juego}} + W_{\text{rango}} \cdot S_{\text{rango}} + W_{\text{horario}} \cdot S_{\text{horario}} + W_{\text{mic}} \cdot S_{\text{mic}} + B_{\text{karma}}
\]

Donde:
- **\(S_{\text{juego}}\) (35%)**: Coincidencia exacta de juego principal y modo (Ranked vs Casual).
- **\(S_{\text{rango}}\) (25%)**: Proximidad de elo/división (máximo 1 nivel de diferencia para competitivas).
- **\(S_{\text{horario}}\) (20%)**: Solapamiento en franjas horarias (tardes, noches o fines de semana).
- **\(S_{\text{mic}}\) (15%)**: Acuerdo en uso de comunicación por voz.
- **\(B_{\text{karma}}\) (5%)**: Bono de reputación comunitaria para jugadores con índice de karma \(> 4.8\).

---

## 4. Endpoints REST Principales

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Registro de usuario con hash seguro de credenciales |
| `POST` | `/api/v1/auth/login` | Autenticación y emisión de JWT |
| `GET` | `/api/v1/players` | Explorador y feed de jugadores con filtros de afinidad |
| `POST` | `/api/v1/matchmaking/quick-search` | Iniciar cola de emparejamiento rápido |
| `POST` | `/api/v1/matches/invite` | Enviar invitación directa a un compañero |
| `POST` | `/api/v1/karma/rate` | Registrar valoración de honor y actualizar score |
| `GET` | `/api/v1/tournaments` | Listar torneos activos y próximos |
| `POST` | `/api/v1/tournaments/:id/register` | Inscribir equipo a un torneo |
| `GET` | `/api/v1/tournaments/:id/bracket` | Obtener árbol de llaves y resultados en tiempo real |
| `WS` | `/ws/lobbies/:room_code` | Canal WebSocket para chat y señalización de sala |

# Guía de Personalidad & Sistema de Diseño: Pulso Gamer — PlayMatch

> Versión 1.1 · Septiembre 2026  
> Marca: PlayMatch · Sistema: Pulso (VoxTi Labs)

---

## 1. Personalidad de Marca

PlayMatch combina el rigor arquitectónico y minimalista de **VoxTi Labs** con la energía vibrante y táctica del mundo de los eSports. Su personalidad se define como:

- **Directa y Sin Rodeos:** La interfaz prioriza la acción ("Buscar Dúo", "Inscribir Equipo"). Sin textos de relleno ni jerga burocrática.
- **Táctica y Confiable:** Inspira seguridad competitiva y juego limpio. El sistema de karma no es punitivo sino un estándar de respeto profesional.
- **Moderna y Dinámica:** Una atmósfera gamer sofisticada (inspirada en clientes competitivos modernos como Riot Client, Faceit y HLTV), evitando excesos estridentes o barrocos de los 2000s.

---

## 2. Tipografía Oficial (Sistema Pulso)

| Rol | Familia | Peso | Uso en PlayMatch |
| :--- | :--- | :---: | :--- |
| **Display & H1** | **Outfit** | 800 | Titulares principales, hero, nombres de torneos. |
| **H2 & H3** | **Outfit** | 700 | Títulos de sección, modales, nombres de tarjetas. |
| **Cuerpo** | **Inter** | 400 / 500 / 600 | Descripciones, bios de jugadores, mensajes de chat y labels. |
| **Métricas & Datos** | **JetBrains Mono** | 500 / 700 | Gamertags, porcentajes de afinidad (%), scores de brackets, horarios. |

> **Regla de Oro de VoxTi:** *Outfit* nunca se usa en párrafos largos (cansa la vista). *JetBrains Mono* nunca se usa en prosa corrida; su uso es exclusivo para datos técnicos y cifras comparables.

---

## 3. Paleta Cromática y Tokens Semánticos

PlayMatch implementa la regla fundacional de Pulso: **ningún componente decide colores arbitrarios en hex; todo consume tokens semánticos**.

### Tokens Principales (Modo Noche — Predeterminado Gamer)
- `--bg`: `#0B0D14` (fondo profundo, evita halos excesivos).
- `--bg-raised`: `#141826` (superficie de tarjetas de jugadores y torneos).
- `--bg-rest`: `#1D2233` (superficie de descanso, campos e inputs secundarios).
- `--border`: `#262C40` (delimitador sutil).
- `--border-strong`: `#333A52` (bordes de campos activos y botones secundarios).
- `--text`: `#EDEFF7` (titulares y datos; no blanco puro `#FFF` para reducir fatiga visual).
- `--text-muted`: `#8189A0` (metadatos, etiquetas y subtítulos).

### Tokens de Acción y Acentos Gaming
- `--action`: `#3D5AFE` (azul primario de VoxTi Labs para acciones principales).
- `--accent-cyan`: `#35E0D0` (cian neón para indicadores de match, alta afinidad y victorias de torneo).
- `--accent-purple`: `#8B5CF6` (violeta eléctrico para roles, títulos y botones de acento).
- `--warn`: `#FFB84D` / `--warn-soft`: `#2A2012` (ámbar para insignias de Karma y advertencias).
- `--good`: `#4FD9A0` / `--good-soft`: `#10281F` (verde esmeralda para estado en línea y confirmaciones).
- `--bad`: `#D9304F` / `--bad-soft`: `#2A141B` (destructivo o reporte de toxicidad).

### Tokens en Modo Día
En modo día, las tarjetas se separan del fondo mediante un tono suave (`--bg: #FFFFFF` y `--bg-raised: #F7F8FD`), manteniendo la misma legibilidad y contraste accesible WCAG AA.

---

## 4. Radios y Escala de Componentes

```
Radios:
  Botón:      999px (Pill shape absoluto, tacto ergonómico)
  Campo:      14px (Suavidad moderna)
  Tarjeta:    22px (Tarjetas de jugadores y torneos)
  Contenedor: 28px (Barra de matchmaking y visualizador de brackets)

Alturas mínimas:
  Controles e inputs: 46px (Área táctil mínima accesible)
```

---

## 5. Tono de Voz & Textos de Interfaz

- **Errores y Avisos:** Siempre indican qué sucedió y qué hacer a continuación. Nunca "Error inesperado" ni mensajes técnicos crudos.
- **Estados Vacíos:** Comunican qué aparecerá y ofrecen la acción directa (ej: *"No encontramos jugadores con este filtro. Intenta ampliar el horario o cambiar de juego."* con botón de acción).
- **Tratamiento:** Cercano, colaborativo y respetuoso, utilizando modismos gamers comprensibles en Chile (dúo, tryhard, chilling, coms, tilt, bracket, partida).

# Guía de Personalidad & Sistema de Diseño: Neumorfismo Elegante — PlayMatch

> Versión 2.0 · Septiembre 2026  
> Marca: PlayMatch · Sistema: Pulso Neumórfico (VoxTi Labs)

---

## 1. Filosofía Visual: Alta Calidad, Táctil & Sofisticada

PlayMatch evoluciona hacia una estética **neumórfica táctil y de alta fidelidad** combinada con una **paleta de colores vibrantes**. Se eliminan deliberadamente las tipografías de neón, los brillos excesivos y los emojis, reemplazándolos por iconografía vectorial SVG de precisión y superficies en relieve físico:

- **Sensación Táctil (Soft UI / Neumorfismo):** Los botones, tarjetas y campos de entrada poseen profundidad mediante combinaciones de luces y sombras duales cóncavas y convexas, simulando controles físicos de alta gama.
- **Sin Efectos Neón Artificiales:** La tipografía es nítida, de alto contraste y refinada, priorizando la legibilidad ejecutiva y profesional sobre los clichés de videojuegos de los 2000s.
- **Iconografía Exclusivamente Vectorial (Cero Emojis):** Cada acción, estado o métrica se representa mediante trazos SVG limpios (stroke-width 2px) alineados a la grilla tipográfica.
- **Animaciones Físicas y Sutiles:** Transiciones fluidas en curvas Bezier (`cubic-bezier(0.16, 1, 0.3, 1)`) en estados de hover, presionado y modales, evitando animaciones sobrecargadas.

---

## 2. Paleta Cromática y Tokens Neumórficos

### Modo Noche (Obsidiana Suave)
- **Fondo General (`--bg`):** `#111520`
- **Superficie de Tarjetas (`--bg-card`):** `#151B2A`
- **Superficie Hundida / Inputs (`--bg-sunken`):** `#0D101A`
- **Sombra Neumórfica Elevada (`--neu-flat`):** `8px 8px 20px #090B12, -7px -7px 18px #1A2234`
- **Sombra Neumórfica Presionada (`--neu-pressed`):** `inset 4px 4px 9px #080A10, inset -4px -4px 9px #1D2539`

### Modo Día (Arcilla / Slated Alabaster)
- **Fondo General (`--bg`):** `#EAEFF6`
- **Superficie de Tarjetas (`--bg-card`):** `#EBF0F8`
- **Superficie Hundida / Inputs (`--bg-sunken`):** `#E2E7F0`
- **Sombra Neumórfica Elevada (`--neu-flat`):** `7px 7px 16px #C8D1E0, -7px -7px 16px #FFFFFF`
- **Sombra Neumórfica Presionada (`--neu-pressed`):** `inset 4px 4px 8px #CCD5E4, inset -4px -4px 8px #FFFFFF`

### Acentos Vibrantes de Alta Energía
- **Primario / Acción:** `#3D5AFE` (Azul ultramarino real) con gradiente `linear-gradient(145deg, #4461FF, #334EEB)`.
- **Menta / Convivencia / Éxito:** `#00E599` (Verde menta vibrante).
- **Violeta Táctico:** `#8B5CF6` (Acento sofisticado de rol e identidad).
- **Ámbar / Reputación:** `#FFB300` (Evaluación de karma y honor).
- **Coral / Destructivo:** `#FF5252` (Alertas críticas).

---

## 3. Tipografía Oficial

| Rol | Familia | Peso | Características |
| :--- | :--- | :---: | :--- |
| **Display & H1** | **Outfit** | 800 | Titulares con carácter sin sombras difuminadas ni neón. |
| **H2 & H3** | **Outfit** | 700 | Títulos de sección y modales limpios. |
| **Cuerpo de Texto** | **Plus Jakarta Sans** | 500 / 600 / 700 | Lectura ultra-nítida con excelente rendimiento en pantallas. |
| **Métricas & Datos** | **JetBrains Mono** | 500 / 700 | Gamertags, porcentajes de afinidad y marcadores de llaves. |

---

## 4. Componentes Neumórficos Clave

1. **Botón Neumórfico Base (`.neu-btn`):**
   - Altura mínima: 48px.
   - Radio de curvatura: 16px.
   - Sombra suave elevada con estado activo hundido (`--neu-pressed`) que transmite un clic mecánico realista.
2. **Botón Primario Neumórfico (`.neu-btn-primary`):**
   - Gradiente de color vibrante con relieve sutil superior y sombra coloreada difusa.
3. **Selector Neumórfico Tipo Píldora (`.neu-chip`):**
   - Estados inactivos con sombra plana exterior; al seleccionarse se deprimen hacia el fondo (`--neu-pressed-sm`).
4. **Campos de Entrada Hundidos (`.neu-input`, `.neu-select`):**
   - Aspecto de cavidad física suave (`--neu-pressed-sm`) que destaca naturalmente sobre la superficie elevada de la tarjeta.

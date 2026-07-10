# Kevin Castillo — Portafolio

Portafolio personal de **Kevin Brian Castillo Mejía** (Software Developer / Backend Developer) con temática de automovilismo: el scroll recorre una carrera completa, con parrilla de salida, semáforo, pista SVG que serpentea por todo el documento, un monoplaza original (**KBC-74**) que la recorre, telemetría, grandes premios por proyecto y bandera a cuadros en la meta.

## Stack

- **React 18 + Vite 4** (compatible con Node 16+)
- **GSAP 3** con `ScrollTrigger` y `MotionPathPlugin` (ambos gratuitos)
- CSS puro por componente, sin frameworks de UI
- Sin backend ni variables de entorno

## Estructura

```
src/
  data/profile.js        <- TODO el contenido editable (textos, proyectos, skills)
  components/
    Hud.jsx              <- HUD fijo: sector, progreso, velocidad, marcha
    RaceTrack.jsx        <- Pista SVG generada por JS + carro con MotionPath
    RaceCar.jsx          <- SVG original del monoplaza
  sections/
    StartingGrid.jsx     <- Hero con semáforo de salida
    DriverProfile.jsx    <- Ficha de piloto
    Telemetry.jsx        <- Skills como telemetría (sin porcentajes falsos)
    GrandsPrix.jsx       <- Proyectos como grandes premios con circuito propio
    RaceHistory.jsx      <- Experiencia como temporadas
    Academy.jsx          <- Educación como licencias
    FinishLine.jsx       <- Contacto con bandera a cuadros
public/
  404.html               <- Página 404 temática (bandera roja)
```

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build y lint

```bash
npm run build      # genera dist/
npm run lint
npm run preview    # sirve el build localmente
```

## Deploy en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. Vercel detecta Vite automáticamente (`Build: vite build`, `Output: dist`). No hay variables de entorno que configurar.
4. Deploy. La página `404.html` se sirve automáticamente para rutas inexistentes.

O por CLI:

```bash
npm i -g vercel
vercel
```

## Qué debes reemplazar (placeholders)

| Qué | Dónde |
|-----|-------|
| **Tu foto** | Guarda tu foto como `public/driver.jpg` (idealmente ~600px de ancho, recortada 5:6) y en `src/data/profile.js` cambia `photo: '/driver-placeholder.svg'` por `photo: '/driver.jpg'` |
| **Imagen Open Graph** | Reemplaza `public/og-image.png` por una captura del hero (1200×630) para que el link se vea bien en redes |
| **Años "since" de cada skill** | En `src/data/profile.js` → `skills`. Son estimados a partir de tu CV; ajusta los que no coincidan |
| **Vueltas / longitud de cada GP** | En `src/data/profile.js` → `projects` (`laps`, `length`) son datos decorativos; cámbialos si quieres |
| **Dominio canónico** | Cuando tengas dominio, agrega `<link rel="canonical" href="https://tudominio.com" />` en `index.html` y actualiza las URLs de `og:image` a absolutas |

## Notas de contenido

- El formulario de contacto no tiene backend: arma un `mailto:` hacia `kerroris@gmail.com` con lo que escriba el visitante. Si luego quieres envío real, conecta un servicio tipo Formspree y cambia `onSubmit` en `src/sections/FinishLine.jsx`.
- El nivel de inglés está como **B2** (así se pidió para el portafolio; el CV dice B1 — unifica el que corresponda en `src/data/profile.js`).
- Accesibilidad: se respeta `prefers-reduced-motion` (sin carro animado ni parallax; el contenido queda visible y estático).
- En pantallas menores a 900px la pista de fondo se oculta y queda la experiencia optimizada: HUD con progreso, semáforo, circuitos por proyecto y animaciones de aparición.

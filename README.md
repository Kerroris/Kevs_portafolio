# Kevin Castillo — Portafolio

Portafolio personal de **Kevin Brian Castillo Mejía** (Software Developer / Backend Developer) con temática de automovilismo: el scroll recorre una carrera completa, con parrilla de salida, semáforo, pista SVG que serpentea por todo el documento, tres monoplazas originales que la recorren (el **KBC-74** rojo al frente, perseguido por un carro negro y uno plateado), telemetría, grandes premios por proyecto y bandera a cuadros en la meta.

## Características

- **Bilingüe**: todo el contenido en español e inglés, con selector ES/EN en el HUD (se guarda la preferencia).
- **Tema claro y oscuro**: botón de sol/luna en el HUD (también se guarda la preferencia).
- **Tres carros en pista** con distinta inercia de scroll: al acelerar el scroll el grupo se estira, al frenar se compactan como en un relanzamiento.
- HUD fijo con sector actual, progreso de carrera, velocidad (derivada de la velocidad real del scroll) y marcha.
- `prefers-reduced-motion` respetado; en móvil la pista y los carros se dibujan a escala reducida.

## Stack

- **React 18 + Vite 4** (compatible con Node 16+)
- **GSAP 3** con `ScrollTrigger` y `MotionPathPlugin` (ambos gratuitos)
- CSS puro por componente, sin frameworks de UI
- Sin backend ni variables de entorno

## Estructura

```
src/
  data/profile.js        <- TODO el contenido editable (textos ES/EN, proyectos, skills, links)
  i18n.jsx               <- Textos de interfaz ES/EN y proveedor de idioma
  components/
    Hud.jsx              <- HUD fijo: sector, progreso, velocidad, idioma y tema
    RaceTrack.jsx        <- Pista SVG generada por JS + 3 carros con MotionPath
    RaceCar.jsx          <- SVG original del monoplaza (acepta liverys de color)
  sections/
    StartingGrid.jsx     <- Hero con semáforo de salida
    DriverProfile.jsx    <- Ficha de piloto + intereses personales
    Telemetry.jsx        <- Skills como telemetría (sin porcentajes falsos)
    GrandsPrix.jsx       <- Proyectos como grandes premios con circuito, links e imagen
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
| **Links de cada proyecto** | En `src/data/profile.js` → `projects[n].links`: pon la URL en `live` (sistema en línea) y/o `repo` (GitHub). Si se quedan `''` no se muestra ningún botón |
| **Imágenes de cada proyecto** | Crea la carpeta `public/projects/`, coloca tus capturas y pon la ruta en `projects[n].image`, p. ej. `'/projects/cobranza.png'`. Si se queda `''` no se muestra nada |
| **Imagen Open Graph** | Reemplaza `public/og-image.png` por una captura del hero (1200×630) |
| **Años "since" de cada skill** | En `src/data/profile.js` → `skills`. Son estimados a partir de tu CV; ajusta los que no coincidan |
| **Vueltas / longitud de cada GP** | En `src/data/profile.js` → `projects` (`laps`, `length`) son datos decorativos; cámbialos si quieres |
| **Dominio canónico** | Cuando tengas dominio, agrega `<link rel="canonical" href="https://tudominio.com" />` en `index.html` y actualiza las URLs de `og:image` a absolutas |

## Formulario de contacto (envío directo)

El formulario envía los mensajes **directo a tu correo** usando [FormSubmit](https://formsubmit.co) (gratuito, sin cuenta ni backend).

**Activación (una sola vez):** la primera vez que alguien envíe el formulario, FormSubmit mandará un correo de confirmación a `kerroris@gmail.com` con un botón **Activate**. Dale clic y desde ese momento todos los mensajes te llegan a la bandeja. Si el envío falla, el visitante ve un aviso con tu correo como respaldo.

## Circuitos disponibles

Cada proyecto muestra un circuito real de F1. Se elige en `src/data/profile.js` con `circuit: '<clave>'`:

`suzuka` (Japón, con su cruce en 8) · `monza` (Italia) · `monaco` · `spa` (Bélgica) · `cota` (EE. UU.) · `interlagos` (Brasil)

Actualmente: Cobranza → Suzuka, Archivo Digital → Monza, POS → Mónaco.

## Notas de contenido

- Los textos bilingües viven como objetos `{ es: '…', en: '…' }` en `src/data/profile.js`; los rótulos de interfaz en `src/i18n.jsx`. Para editar un texto, cambia ambos idiomas.
- El nivel de inglés está como **B2** (así se pidió para el portafolio; el CV dice B1 — unifica el que corresponda en `src/data/profile.js`).
- Los carros rivales (negro #08 y plata #27) se configuran en `src/components/RaceTrack.jsx` (constante `CARS`): colores, números, separación y retraso de scrub.

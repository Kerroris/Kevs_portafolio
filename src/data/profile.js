// ============================================================
// DATOS DEL PORTAFOLIO
// Todo el contenido editable vive en este archivo.
// Los campos marcados con [REEMPLAZAR] necesitan tu revisión.
// ============================================================

export const profile = {
  name: 'Kevin Brian Castillo Mejía',
  shortName: 'Kevin Castillo',
  role: 'Software Developer',
  subRole: 'Full Stack Developer | Backend & System Architecture',
  tagline: 'Backends que aguantan la carrera completa.',
  location: 'Querétaro, Qro., México',
  specialty: 'Backend, APIs REST y arquitectura de sistemas',
  racingNumber: '74',
  chassis: 'KBC-74',
  email: 'kerroris@gmail.com',
  github: 'https://github.com/Kerroris',
  linkedin: 'https://www.linkedin.com/in/kerroris',
  // [REEMPLAZAR] Coloca tu foto en public/driver.jpg y cambia esta ruta a '/driver.jpg'
  photo: '/driver-placeholder.svg',
  summary:
    'Desarrollador de software con experiencia en desarrollo web y backend. ' +
    'Diseño e implemento aplicaciones para gestión documental y automatización de ' +
    'procesos administrativos, desde el análisis de requerimientos hasta producción: ' +
    'APIs REST, integración de módulos y bases de datos relacionales.',
  stats: [
    { label: 'En pista desde', value: '2022' },
    { label: 'Sistemas en producción', value: '3' },
    { label: 'Especialidad', value: 'Backend' },
  ],
}

// context: 'prod' = usado en producción, 'acad' = académico, 'personal' = proyectos propios
// since: año en que empezaste a usarlo (ajústalo si algún estimado no coincide)
export const skills = [
  {
    channel: 'Lenguajes',
    unit: 'ENGINE',
    items: [
      { name: 'PHP', since: 2022, context: 'prod' },
      { name: 'JavaScript', since: 2022, context: 'prod' },
      { name: 'SQL', since: 2022, context: 'prod' },
      { name: 'Java', since: 2023, context: 'prod' },
      { name: 'Python', since: 2023, context: 'personal' },
      { name: 'C++', since: 2022, context: 'acad' },
      { name: 'Kotlin', since: 2024, context: 'acad' },
    ],
  },
  {
    channel: 'Frontend',
    unit: 'AERO',
    items: [
      { name: 'React', since: 2023, context: 'prod' },
      { name: 'HTML5', since: 2022, context: 'prod' },
      { name: 'CSS', since: 2022, context: 'prod' },
      { name: 'Bootstrap', since: 2022, context: 'prod' },
      { name: 'React Native', since: 2024, context: 'personal' },
      { name: 'AngularJS', since: 2023, context: 'prod' },
    ],
  },
  {
    channel: 'Backend',
    unit: 'POWER UNIT',
    items: [
      { name: 'Laravel', since: 2024, context: 'prod' },
      { name: 'CodeIgniter', since: 2024, context: 'prod' },
      { name: 'Symfony', since: 2023, context: 'prod' },
      { name: 'FastAPI', since: 2024, context: 'personal' },
      { name: 'Spring Boot', since: 2024, context: 'acad' },
    ],
  },
  {
    channel: 'Bases de datos',
    unit: 'FUEL',
    items: [
      { name: 'SQL Server', since: 2024, context: 'prod' },
      { name: 'MySQL', since: 2022, context: 'prod' },
      { name: 'MariaDB', since: 2023, context: 'prod' },
      { name: 'MongoDB', since: 2023, context: 'personal' },
      { name: 'Firebase', since: 2023, context: 'prod' },
    ],
  },
  {
    channel: 'Herramientas',
    unit: 'PIT CREW',
    items: [
      { name: 'Git', since: 2022, context: 'prod' },
      { name: 'GitHub', since: 2022, context: 'prod' },
      { name: 'Azure DevOps', since: 2025, context: 'prod' },
      { name: 'NPM', since: 2022, context: 'prod' },
      { name: 'Yarn', since: 2023, context: 'prod' },
      { name: 'Ubuntu Server', since: 2023, context: 'prod' },
      { name: 'XAMPP', since: 2022, context: 'prod' },
    ],
  },
]

export const contextMeta = {
  prod: { label: 'Producción', color: 'var(--red)' },
  acad: { label: 'Académico', color: 'var(--cyan)' },
  personal: { label: 'Personal', color: 'var(--yellow)' },
}

export const projects = [
  {
    round: '01',
    gpName: 'GP de Cobranza',
    title: 'Sistema de Cobranza',
    laps: '58',
    length: '5.4 km',
    stack: ['CodeIgniter', 'PHP', 'React', 'SQL Server'],
    role: 'Backend Developer',
    description:
      'Sistema empresarial para la operación completa de cobranza: carteras, ' +
      'contactos, usuarios y permisos, reportes, notificaciones y asignación de ' +
      'ejecutivos entre distintas áreas de negocio.',
    notes: [
      'Manejo de carteras y contactos a gran escala',
      'Módulo de usuarios con permisos por rol y área',
      'Reportes operativos y notificaciones internas',
      'Asignación de ejecutivos por área de negocio',
    ],
    circuit: 'A',
  },
  {
    round: '02',
    gpName: 'GP Archivo Digital',
    title: 'Archivo Digital RH',
    laps: '44',
    length: '4.1 km',
    stack: ['Laravel', 'MySQL'],
    role: 'Full Stack Developer',
    description:
      'Sistema interno tipo Drive para Recursos Humanos: expedientes digitales ' +
      'con estructuras de carpetas, carga y visualización de documentos PDF, ' +
      'flujo de aceptación o rechazo y notificaciones.',
    notes: [
      'Estructura de carpetas por expediente',
      'Carga y visualización de documentos PDF',
      'Flujo de aceptar / rechazar archivos con notificaciones',
      'Control de accesos por rol',
    ],
    circuit: 'B',
  },
  {
    round: '03',
    gpName: 'GP Restaurantes',
    title: 'Plataforma POS / Restaurantes',
    laps: '61',
    length: '6.2 km',
    stack: ['SaaS', 'Multiempresa', 'POS'],
    role: 'Arquitectura y desarrollo',
    description:
      'Plataforma SaaS multiempresa para negocios de comida: punto de venta, ' +
      'comandas, mesas, inventario y notificaciones, con roles de super usuario, ' +
      'administrador de empresa, caja, meseros y clientes.',
    notes: [
      'Arquitectura multiempresa (SaaS)',
      'Roles: super usuario, admin, caja, meseros y clientes',
      'Productos, ventas, comandas, mesas e inventario',
      'Notificaciones en tiempo real de operación',
    ],
    circuit: 'C',
  },
]

export const seasons = [
  {
    year: '2023',
    team: 'UNAQ — Universidad Aeronáutica en Querétaro',
    role: 'Desarrollador Backend · Servicios Escolares',
    period: 'Sep 2023 — Dic 2023',
    results: [
      'Módulos backend para sistemas escolares internos',
      'Lógica de negocio en PHP (Symfony) y Java',
      'APIs internas para integración entre sistemas',
      'Validaciones, control de accesos y documentación técnica',
    ],
  },
  {
    year: '2025',
    team: 'UTEQ — Universidad Tecnológica de Querétaro',
    role: 'Desarrollador Web · Recursos Humanos',
    period: 'May 2025 — Ago 2025',
    results: [
      'Sistema de Archivo Digital para expedientes de RH',
      'Backend en Laravel con MySQL',
      'Gestión documental: carpetas, PDFs y flujos de validación',
      'Notificaciones y control de accesos por rol',
    ],
  },
  {
    year: 'HOY',
    team: 'Sistemas empresariales',
    role: 'Backend Developer',
    period: 'Temporada en curso',
    results: [
      'Desarrollo y mantenimiento de sistemas empresariales',
      'Backend con CodeIgniter + PHP y frontend React',
      'Bases de datos SQL Server en operación diaria',
      'Integración entre áreas de negocio y reportes',
    ],
  },
]

export const education = [
  {
    tier: 'SUPERLICENCIA',
    title: 'Ingeniería en Desarrollo y Gestión de Software',
    school: 'Universidad Tecnológica de Querétaro (UTEQ)',
    period: '2024 — 2025',
    detail: 'Cédula profesional 14812448',
  },
  {
    tier: 'LICENCIA',
    title: 'TSU en Tecnologías de la Información',
    school: 'Universidad Tecnológica de Querétaro (UTEQ)',
    period: '2022 — 2024',
    detail: 'Área: Desarrollo de Software Multiplataforma',
  },
]

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'B2' },
]

export const sectors = [
  { id: 'grid', label: 'Starting Grid' },
  { id: 'driver', label: 'Driver Profile' },
  { id: 'telemetry', label: 'Telemetry' },
  { id: 'projects', label: 'Grands Prix' },
  { id: 'history', label: 'Race History' },
  { id: 'academy', label: 'Driver Academy' },
  { id: 'finish', label: 'Finish Line' },
]

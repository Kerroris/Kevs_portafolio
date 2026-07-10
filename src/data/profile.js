// ============================================================
// DATOS DEL PORTAFOLIO
// Todo el contenido editable vive en este archivo.
// Los campos { es, en } son bilingües; los demás son fijos.
// Los campos marcados con [REEMPLAZAR] necesitan tu revisión.
// ============================================================

export const profile = {
  name: 'Kevin Brian Castillo Mejía',
  shortName: 'Kevin Castillo',
  role: 'Software Developer',
  subRole: 'Full Stack Developer | Backend & System Architecture',
  tagline: {
    es: 'Backends que aguantan la carrera completa.',
    en: 'Backends built to last the full race distance.',
  },
  location: {
    es: 'Querétaro, Qro., México',
    en: 'Querétaro, Mexico',
  },
  specialty: {
    es: 'Backend, APIs REST y arquitectura de sistemas',
    en: 'Backend, REST APIs and system architecture',
  },
  racingNumber: '02',
  chassis: 'KBC-02',
  email: 'kerroris@gmail.com',
  github: 'https://github.com/Kerroris',
  linkedin: 'https://www.linkedin.com/in/kerroris',
  // [REEMPLAZAR] Coloca tu foto en public/driver.jpg y cambia esta ruta a '/driver.jpg'
  photo: '/kkeevviinn.jpeg',
  summary: {
    es:
      'Desarrollador de software con experiencia en desarrollo web y backend. ' +
      'Diseño e implemento aplicaciones para gestión documental y automatización de ' +
      'procesos administrativos, desde el análisis de requerimientos hasta producción: ' +
      'APIs REST, integración de módulos y bases de datos relacionales.',
    en:
      'Software developer with experience in web and backend development. ' +
      'I design and build applications for document management and administrative ' +
      'process automation, from requirements analysis all the way to production: ' +
      'REST APIs, module integration and relational databases.',
  },
  stats: [
    { label: { es: 'En pista desde', en: 'On track since' }, value: '2022' },
    { label: { es: 'Sistemas en producción', en: 'Systems in production' }, value: '3' },
    { label: { es: 'Especialidad', en: 'Specialty' }, value: 'Backend' },
  ],
}

// Lo que me mueve fuera del teclado
export const interests = [
  {
    tag: 'GARAGE',
    text: {
      es: 'Los carros: verlos, entenderlos y seguir las carreras',
      en: 'Cars: watching them, understanding them, following the races',
    },
  },
  {
    tag: 'TOURING',
    text: {
      es: 'Viajar y conocer lugares nuevos',
      en: 'Traveling and discovering new places',
    },
  },
  {
    tag: 'PADDOCK',
    text: {
      es: 'Conocer gente nueva y buenas conversaciones',
      en: 'Meeting new people and having good conversations',
    },
  },
  {
    tag: 'UPGRADE',
    text: {
      es: 'Aprender temas nuevos y disfrutar el proceso',
      en: 'Picking up new topics and enjoying the ride',
    },
  },
]

// context: 'prod' = usado en producción, 'acad' = académico, 'personal' = proyectos propios
// since: año en que empezaste a usarlo (ajústalo si algún estimado no coincide)
export const skills = [
  {
    channel: { es: 'Lenguajes', en: 'Languages' },
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
    channel: { es: 'Frontend', en: 'Frontend' },
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
    channel: { es: 'Backend', en: 'Backend' },
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
    channel: { es: 'Bases de datos', en: 'Databases' },
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
    channel: { es: 'Herramientas', en: 'Tools' },
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
  prod: { label: { es: 'Producción', en: 'Production' }, color: 'var(--red)' },
  acad: { label: { es: 'Académico', en: 'Academic' }, color: 'var(--cyan)' },
  personal: { label: { es: 'Personal', en: 'Personal' }, color: 'var(--yellow)' },
}

// En cada proyecto:
//   links.live  -> [REEMPLAZAR] URL del sistema en línea (déjala '' si es interno y no se puede mostrar)
//   links.repo  -> [REEMPLAZAR] URL del repositorio en GitHub (déjala '' si es privado)
//   image       -> [REEMPLAZAR] captura del sistema, p. ej. '/projects/cobranza.png'
//                  (crea la carpeta public/projects/ y coloca ahí tus imágenes)
export const projects = [
  {
    round: '01',
    gpName: { es: 'GP de Cobranza', en: 'Collections GP' },
    title: { es: 'Sistema de Cobranza', en: 'Collections System' },
    laps: '58',
    length: '5.4 km',
    stack: ['CodeIgniter', 'PHP', 'React', 'SQL Server'],
    role: { es: 'Backend Developer', en: 'Backend Developer' },
    description: {
      es:
        'Sistema empresarial para la operación completa de cobranza: carteras, ' +
        'contactos, usuarios y permisos, reportes, notificaciones y asignación de ' +
        'ejecutivos entre distintas áreas de negocio.',
      en:
        'Enterprise system covering the full collections operation: portfolios, ' +
        'contacts, users and permissions, reports, notifications and agent ' +
        'assignment across business areas.',
    },
    notes: {
      es: [
        'Manejo de carteras y contactos a gran escala',
        'Módulo de usuarios con permisos por rol y área',
        'Reportes operativos y notificaciones internas',
        'Asignación de ejecutivos por área de negocio',
      ],
      en: [
        'Large-scale portfolio and contact management',
        'User module with role and area based permissions',
        'Operational reports and internal notifications',
        'Agent assignment per business area',
      ],
    },
    links: { live: '', repo: '' },
    image: '',
    circuit: 'A',
  },
  {
    round: '02',
    gpName: { es: 'GP Archivo Digital', en: 'Digital Archive GP' },
    title: { es: 'Archivo Digital RH', en: 'HR Digital Archive' },
    laps: '44',
    length: '4.1 km',
    stack: ['Laravel', 'MySQL'],
    role: { es: 'Full Stack Developer', en: 'Full Stack Developer' },
    description: {
      es:
        'Sistema interno tipo Drive para Recursos Humanos: expedientes digitales ' +
        'con estructuras de carpetas, carga y visualización de documentos PDF, ' +
        'flujo de aceptación o rechazo y notificaciones.',
      en:
        'Internal Drive-like system for Human Resources: digital employee records ' +
        'with folder structures, PDF upload and preview, approve / reject ' +
        'workflows and notifications.',
    },
    notes: {
      es: [
        'Estructura de carpetas por expediente',
        'Carga y visualización de documentos PDF',
        'Flujo de aceptar / rechazar archivos con notificaciones',
        'Control de accesos por rol',
      ],
      en: [
        'Folder structure per employee record',
        'PDF document upload and preview',
        'Approve / reject workflow with notifications',
        'Role-based access control',
      ],
    },
    links: { live: '', repo: '' },
    image: '',
    circuit: 'B',
  },
  {
    round: '03',
    gpName: { es: 'GP Restaurantes', en: 'Restaurants GP' },
    title: { es: 'Plataforma POS / Restaurantes', en: 'POS / Restaurant Platform' },
    laps: '61',
    length: '6.2 km',
    stack: ['SaaS', 'Multiempresa', 'POS'],
    role: { es: 'Arquitectura y desarrollo', en: 'Architecture & development' },
    description: {
      es:
        'Plataforma SaaS multiempresa para negocios de comida: punto de venta, ' +
        'comandas, mesas, inventario y notificaciones, con roles de super usuario, ' +
        'administrador de empresa, caja, meseros y clientes.',
      en:
        'Multi-tenant SaaS platform for food businesses: point of sale, kitchen ' +
        'orders, tables, inventory and notifications, with roles for super user, ' +
        'company admin, cashier, waiters and customers.',
    },
    notes: {
      es: [
        'Arquitectura multiempresa (SaaS)',
        'Roles: super usuario, admin, caja, meseros y clientes',
        'Productos, ventas, comandas, mesas e inventario',
        'Notificaciones en tiempo real de operación',
      ],
      en: [
        'Multi-tenant (SaaS) architecture',
        'Roles: super user, admin, cashier, waiters and customers',
        'Products, sales, kitchen orders, tables and inventory',
        'Real-time operational notifications',
      ],
    },
    links: { live: '', repo: '' },
    image: '',
    circuit: 'C',
  },
]

export const seasons = [
  {
    year: '2023',
    team: 'UNAQ — Universidad Aeronáutica en Querétaro',
    role: {
      es: 'Desarrollador Backend · Servicios Escolares',
      en: 'Backend Developer · School Services',
    },
    period: { es: 'Sep 2023 — Dic 2023', en: 'Sep 2023 — Dec 2023' },
    results: {
      es: [
        'Módulos backend para sistemas escolares internos',
        'Lógica de negocio en PHP (Symfony) y Java',
        'APIs internas para integración entre sistemas',
        'Validaciones, control de accesos y documentación técnica',
      ],
      en: [
        'Backend modules for internal school systems',
        'Business logic in PHP (Symfony) and Java',
        'Internal APIs for system-to-system integration',
        'Validations, access control and technical documentation',
      ],
    },
  },
  {
    year: '2025',
    team: 'UTEQ — Universidad Tecnológica de Querétaro',
    role: {
      es: 'Desarrollador Web · Recursos Humanos',
      en: 'Web Developer · Human Resources',
    },
    period: { es: 'May 2025 — Ago 2025', en: 'May 2025 — Aug 2025' },
    results: {
      es: [
        'Sistema de Archivo Digital para expedientes de RH',
        'Backend en Laravel con MySQL',
        'Gestión documental: carpetas, PDFs y flujos de validación',
        'Notificaciones y control de accesos por rol',
      ],
      en: [
        'Digital Archive system for HR employee records',
        'Laravel backend with MySQL',
        'Document management: folders, PDFs and approval flows',
        'Notifications and role-based access control',
      ],
    },
  },
  {
    year: { es: 'HOY', en: 'NOW' },
    team: { es: 'Sistemas empresariales', en: 'Enterprise systems' },
    role: { es: 'Backend Developer', en: 'Backend Developer' },
    period: { es: 'Temporada en curso', en: 'Season in progress' },
    results: {
      es: [
        'Desarrollo y mantenimiento de sistemas empresariales',
        'Backend con CodeIgniter + PHP y frontend React',
        'Bases de datos SQL Server en operación diaria',
        'Integración entre áreas de negocio y reportes',
      ],
      en: [
        'Development and maintenance of enterprise systems',
        'CodeIgniter + PHP backend with a React frontend',
        'SQL Server databases in daily operation',
        'Cross-area integrations and reporting',
      ],
    },
  },
]

export const education = [
  {
    tier: { es: 'SUPERLICENCIA', en: 'SUPER LICENCE' },
    title: {
      es: 'Ingeniería en Desarrollo y Gestión de Software',
      en: 'B.Eng. in Software Development and Management',
    },
    school: 'Universidad Tecnológica de Querétaro (UTEQ)',
    period: '2024 — 2025',
    detail: { es: 'Cédula profesional 14812448', en: 'Professional licence 14812448' },
  },
  {
    tier: { es: 'LICENCIA', en: 'LICENCE' },
    title: {
      es: 'TSU en Tecnologías de la Información',
      en: 'Associate Degree in Information Technologies',
    },
    school: 'Universidad Tecnológica de Querétaro (UTEQ)',
    period: '2022 — 2024',
    detail: {
      es: 'Área: Desarrollo de Software Multiplataforma',
      en: 'Focus: Cross-platform Software Development',
    },
  },
]

export const languages = [
  { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
  { name: { es: 'Inglés', en: 'English' }, level: 'B2' },
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

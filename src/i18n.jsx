import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext(null)

// Textos de interfaz por idioma. Los términos de carrera (Starting Grid,
// Telemetry, Pit Radio…) se quedan en inglés en ambos idiomas, como en F1.
export const ui = {
  es: {
    formation: 'FORMATION LAP…',
    lightsOut: 'LIGHTS OUT — HAZ SCROLL PARA ARRANCAR',
    polePosition: 'POLE POSITION',
    startEngine: 'Start Engine',
    enterPaddock: 'Enter Paddock',

    driverTitle: { pre: 'El ', em: 'piloto', post: '' },
    specRole: 'Rol',
    specBase: 'Base',
    specSpecialty: 'Especialidad',
    specChassis: 'Chasis',
    offTrack: 'Fuera de pista',

    telTitle: { pre: 'Telemetría del ', em: 'KBC-02', post: '' },
    telDesc:
      'Sin porcentajes inventados: cada tecnología muestra desde cuándo está en el stint y en qué contexto se ha usado de verdad.',
    yearBlock: '= 1 año en pista',

    projTitle: { pre: 'Calendario de ', em: 'proyectos', post: '' },
    projDesc:
      'Tres grandes premios: sistemas reales, en producción, con usuarios que los exigen todos los días.',
    laps: 'vueltas',
    viewLive: 'Ver en vivo',
    sourceCode: 'Código',

    histTitle: { pre: 'Temporadas ', em: 'corridas', post: '' },
    histDesc: 'Cada temporada, un equipo distinto y un sistema entregado.',

    acadTitle: { pre: 'Formación de ', em: 'piloto', post: '' },
    languages: 'Idiomas',

    finishTitle: { pre: 'Bandera a ', em: 'cuadros', post: '' },
    finishDesc:
      'Cruzaste la meta. Si buscas a alguien para tu equipo o traes un proyecto entre manos, abre el canal de radio.',
    pitRadio: 'PIT RADIO — CANAL ABIERTO',
    formName: 'Nombre',
    formEmail: 'Correo',
    formMessage: 'Mensaje',
    phName: '¿Quién llama a boxes?',
    phEmail: 'Para responderte por radio',
    phMessage: 'Cuéntame del proyecto, la vacante o la idea',
    transmit: 'Transmitir',
    emailTag: 'CORREO',
    quote: {
      a: 'El software, como las carreras, se gana en los detalles: en la vuelta ',
      em: 'que nadie ve',
      b: ', en el pit stop que sale perfecto.',
    },
    footerLine: 'Diseñado y construido desde el garage',
    mailSubject: 'Pit radio de',
    visitor: 'un visitante',
  },
  en: {
    formation: 'FORMATION LAP…',
    lightsOut: 'LIGHTS OUT — SCROLL TO LAUNCH',
    polePosition: 'POLE POSITION',
    startEngine: 'Start Engine',
    enterPaddock: 'Enter Paddock',

    driverTitle: { pre: 'The ', em: 'driver', post: '' },
    specRole: 'Role',
    specBase: 'Base',
    specSpecialty: 'Specialty',
    specChassis: 'Chassis',
    offTrack: 'Off track',

    telTitle: { pre: '', em: 'KBC-02', post: ' telemetry' },
    telDesc:
      'No made-up percentages: every technology shows how long it has been in the stint and the context where it has actually been used.',
    yearBlock: '= 1 year on track',

    projTitle: { pre: 'Project ', em: 'calendar', post: '' },
    projDesc:
      'Three grands prix: real systems, in production, with users who push them hard every single day.',
    laps: 'laps',
    viewLive: 'View live',
    sourceCode: 'Source',

    histTitle: { pre: 'Seasons ', em: 'raced', post: '' },
    histDesc: 'Every season, a different team and a system delivered.',

    acadTitle: { pre: 'Driver ', em: 'academy', post: '' },
    languages: 'Languages',

    finishTitle: { pre: 'Chequered ', em: 'flag', post: '' },
    finishDesc:
      'You crossed the line. If you are hiring or have a project in mind, open the radio channel.',
    pitRadio: 'PIT RADIO — CHANNEL OPEN',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    phName: 'Who is calling the pit wall?',
    phEmail: 'So I can radio you back',
    phMessage: 'Tell me about the project, the role or the idea',
    transmit: 'Transmit',
    emailTag: 'EMAIL',
    quote: {
      a: 'Software, like racing, is won in the details: in the lap ',
      em: 'nobody watches',
      b: ', in the pit stop that comes out perfect.',
    },
    footerLine: 'Designed and built in the garage',
    mailSubject: 'Pit radio from',
    visitor: 'a visitor',
  },
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      return saved === 'en' || saved === 'es' ? saved : 'es'
    } catch {
      return 'es'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* almacenamiento no disponible */
    }
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: ui[lang] }}>{children}</LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

// Devuelve el valor en el idioma activo cuando el campo es bilingüe { es, en }
export function pick(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value.es
  }
  return value
}

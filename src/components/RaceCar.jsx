// Monoplaza original vista cenital, apuntando hacia la derecha (+x).
export default function RaceCar({ className, number = '74' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Alerón trasero */}
      <rect x="1" y="9" width="7" height="38" rx="2" fill="#14171c" />
      <rect x="8" y="13" width="4" height="30" rx="1" fill="#e8342a" />
      {/* Neumáticos traseros */}
      <rect x="15" y="1" width="17" height="12" rx="5" fill="#0d0f13" />
      <rect x="15" y="43" width="17" height="12" rx="5" fill="#0d0f13" />
      <rect x="20" y="4" width="7" height="6" rx="2" fill="#23272e" />
      <rect x="20" y="46" width="7" height="6" rx="2" fill="#23272e" />
      {/* Cuerpo principal */}
      <path
        d="M13 26 L34 15 C46 11 58 11 66 14 L84 21 C96 24 108 26 116 27
           L116 29 C108 30 96 32 84 35 L66 42 C58 45 46 45 34 41 L13 30 Z"
        fill="#e8342a"
      />
      {/* Sidepods oscuros */}
      <path d="M36 14 C48 10.5 57 10.5 64 13 L64 18 L36 19 Z" fill="#b3271f" />
      <path d="M36 42 C48 45.5 57 45.5 64 43 L64 38 L36 37 Z" fill="#b3271f" />
      {/* Franja central */}
      <rect x="18" y="26.6" width="92" height="2.8" fill="#f2f3f5" opacity="0.85" />
      {/* Cockpit + halo */}
      <ellipse cx="58" cy="28" rx="10" ry="6.5" fill="#101216" />
      <path d="M49 28 a9 9 0 0 1 18 0" fill="none" stroke="#3a4048" strokeWidth="2.4" />
      {/* Toma de aire */}
      <circle cx="44" cy="28" r="2.6" fill="#0b0d10" />
      {/* Neumáticos delanteros */}
      <rect x="84" y="4" width="14" height="10" rx="4.5" fill="#0d0f13" />
      <rect x="84" y="42" width="14" height="10" rx="4.5" fill="#0d0f13" />
      {/* Número en la nariz */}
      <circle cx="93" cy="28" r="7.2" fill="#f2f3f5" />
      <text
        x="93"
        y="31.6"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fontStyle="italic"
        fontFamily="Arial, sans-serif"
        fill="#0b0d10"
      >
        {number}
      </text>
      {/* Alerón delantero */}
      <rect x="112" y="7" width="5" height="42" rx="2" fill="#14171c" />
      <rect x="108" y="10" width="4" height="36" rx="1" fill="#e8342a" />
    </svg>
  )
}

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from './hooks/useReducedMotion.js'
import { sectors } from './data/profile.js'
import Hud from './components/Hud.jsx'
import RaceTrack from './components/RaceTrack.jsx'
import StartingGrid from './sections/StartingGrid.jsx'
import DriverProfile from './sections/DriverProfile.jsx'
import Telemetry from './sections/Telemetry.jsx'
import GrandsPrix from './sections/GrandsPrix.jsx'
import RaceHistory from './sections/RaceHistory.jsx'
import Academy from './sections/Academy.jsx'
import FinishLine from './sections/FinishLine.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const wrapRef = useRef(null)
  const [sectorIndex, setSectorIndex] = useState(0)
  const reduced = useReducedMotion()

  // Sector activo para el HUD
  useEffect(() => {
    const triggers = sectors.map((s, i) =>
      ScrollTrigger.create({
        trigger: `#${s.id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) setSectorIndex(i)
        },
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  // Animaciones de aparición de contenido
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 84%' },
          }
        )
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <>
      <Hud sectorIndex={sectorIndex} />
      <main className="race-wrap" ref={wrapRef}>
        <RaceTrack />
        <StartingGrid />
        <DriverProfile />
        <Telemetry />
        <GrandsPrix />
        <RaceHistory />
        <Academy />
        <FinishLine />
      </main>
    </>
  )
}

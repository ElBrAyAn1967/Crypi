'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Gamepad2, // gameplay/aprendizaje
  Coins,    // YTA tokens
  Wallet,   // wallet/email
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

type Slide = {
  id: number
  title: string
  body: string
  icon: React.ReactNode
  accent: string // tailwind gradient
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Aprende cripto jugando',
    body:
      'Explora “Mundos” con lecciones cortas y retos prácticos. Completa niveles y desbloquea contenido paso a paso.',
    icon: <Gamepad2 className="h-8 w-8" />,
    accent: 'from-pink-500 via-fuchsia-500 to-amber-400',
  },
  {
    id: 2,
    title: 'Gana YTA por progresar',
    body:
      'Cada lección te recompensa con YTA (ERC-20). Mantén tu racha diaria, completa logros y reclama tus premios.',
    icon: <Coins className="h-8 w-8" />,
    accent: 'from-amber-400 via-rose-500 to-purple-500',
  },
  {
    id: 3,
    title: 'Entra con correo o wallet',
    body:
      'Empieza en segundos: inicia sesión con tu correo o conecta tu wallet. Lleva tu progreso y recompensas a donde vayas.',
    icon: <Wallet className="h-8 w-8" />,
    accent: 'from-purple-500 via-pink-500 to-yellow-400',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const current = slides[index]
  const pct = Math.round(((index + 1) / slides.length) * 100)

  const next = () => {
    if (index < slides.length - 1) setIndex(index + 1)
    else router.push('/dashboards')
  }
  const prev = () => setIndex(Math.max(0, index - 1))
  const goTo = (i: number) => setIndex(i)

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">¡Bienvenido a Cryptalia!</h1>
          <p className="text-sm text-muted-foreground">Crypto Quest • Onboarding</p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Paso {index + 1} de {slides.length}</span>
            <span>{pct}%</span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>

        {/* Slide */}
        <Card className="overflow-hidden">
          <div className={`h-1 w-full bg-gradient-to-r ${current.accent}`} />
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border">
                {current.icon}
              </div>
              <h2 className="text-xl font-semibold">{current.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{current.body}</p>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Ir al slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? 'w-6 bg-foreground' : 'w-2.5 bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nav buttons */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prev} disabled={index === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Atrás
          </Button>
          <Button onClick={next}>
            {index < slides.length - 1 ? (
              <>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>Empezar</>
            )}
          </Button>
        </div>

        {/* Mini hint */}
        <p className="text-[11px] text-center text-muted-foreground">
          Tip: Después de “Empezar”, podrás iniciar sesión con correo o conectar tu wallet desde la pantalla de acceso.
        </p>
      </div>
    </main>
  )
}

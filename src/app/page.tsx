'use client'

import Link from 'next/link'
import { useRef } from 'react'
import PageWrapper from '@/app/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { ConnectButton } from '@/components/ConnectButton'
import { Gamepad2, Coins, ShieldCheck } from 'lucide-react'
// import MundosScene from '@/components/MundosScene' // opcional: tu escena 3D si la tienes

export default function Landing() {
  const ctaRef = useRef<HTMLButtonElement>(null)

  return (
    <PageWrapper>
      {/* Si tienes una escena, pásale el targetRef para alinear la cámara al CTA */}
      {/* <MundosScene targetRef={ctaRef as unknown as React.RefObject<HTMLElement>} /> */}

      <section className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center relative">
        {/* Accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400" />

        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-6xl font-funnel font-medium tracking-tight !leading-[1.15]">
            Aprende cripto <br className="hidden md:block" />
            <span className="underline decoration-primary underline-offset-8">
              jugando con Mundos
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground">
            Completa mundos, supera retos y gana <span className="font-semibold">YTA</span> por tu progreso.
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            Entra con <span className="font-medium">correo</span> o conecta tu <span className="font-medium">wallet</span>. Tú controlas tus recompensas.
          </p>

          {/* CTAs */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/onboarding">
              <Button ref={ctaRef} className="px-8 py-6 text-base md:text-lg">
                Empezar (Onboarding)
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="outline" className="px-8 py-6 text-base md:text-lg">
                Iniciar sesión
              </Button>
            </Link>

            {/* Conectar wallet directo desde landing */}
            <div className="mt-1 sm:mt-0">
              <ConnectButton />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-8">
            <div className="rounded-2xl border bg-card text-card-foreground p-5 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Gamepad2 className="h-5 w-5" />
                <h3 className="font-semibold">Mundos y retos</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Lecciones cortas, prácticas y progresivas. Desbloquea niveles y mantén tu racha diaria.
              </p>
            </div>

            <div className="rounded-2xl border bg-card text-card-foreground p-5 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="h-5 w-5" />
                <h3 className="font-semibold">Gana YTA</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Recibe <strong>YTA (ERC-20)</strong> por cada logro. Reclama tus recompensas al completar mundos.
              </p>
            </div>

            <div className="rounded-2xl border bg-card text-card-foreground p-5 text-left">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="font-semibold">Control y seguridad</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Entra con correo o wallet. Tus claves son tuyas; nosotros solo guiamos tu aprendizaje.
              </p>
            </div>
          </div>

          {/* Mini nota opcional para Reown (quítala si ya configuraste tu projectId) */}
          {/* <p className="text-[11px] text-muted-foreground">
            Nota: Si usas el projectId de demo de Reown, solo funciona en localhost. Configura el tuyo en Reown Cloud.
          </p> */}
        </div>
      </section>
    </PageWrapper>
  )
}

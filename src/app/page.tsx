'use client'

import Link from 'next/link'
import { useRef } from 'react'
import PageWrapper from '@/app/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { ConnectButton } from '@/components/ConnectButton'
import { Gamepad2, Coins, ShieldCheck } from 'lucide-react'

export default function Landing() {
  const ctaRef = useRef<HTMLButtonElement>(null)

  return (
    <PageWrapper>
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800 px-6 text-center">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-green-400" />

        <div className="relative z-10 max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Aprende <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Blockchain</span><br className="hidden md:block" />
            jugando con <span className="text-gray-900">Cryptalia</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Completa retos interactivos y gana <span className="font-semibold text-blue-600">YTA</span> por tu progreso.
          </p>
          <p className="text-base md:text-lg text-gray-500">
            Accede con tu correo o conecta tu wallet. Tú controlas tus recompensas.
          </p>

          {/* CTAs simplificados */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button ref={ctaRef} size="lg" className="px-8 py-6 text-lg">
                Iniciar sesión / Conectar wallet
              </Button>
            </Link>

            <Link href="/dashboards">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Explorar mundos
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="card-glass p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-3 rounded-full bg-blue-100">
                  <Gamepad2 className="h-6 w-6 text-blue-600" />
                </span>
                <h3 className="font-semibold text-lg">Mundos y retos</h3>
              </div>
              <p className="text-sm text-gray-600">
                Lecciones prácticas y progresivas. Desbloquea niveles y mantén tu racha diaria.
              </p>
            </div>

            <div className="card-glass p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-3 rounded-full bg-green-100">
                  <Coins className="h-6 w-6 text-green-600" />
                </span>
                <h3 className="font-semibold text-lg">Gana YTA</h3>
              </div>
              <p className="text-sm text-gray-600">
                Recibe <strong>YTA (ERC-20)</strong> por cada logro y reclama tus recompensas al completar mundos.
              </p>
            </div>

            <div className="card-glass p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-3 rounded-full bg-yellow-100">
                  <ShieldCheck className="h-6 w-6 text-yellow-600" />
                </span>
                <h3 className="font-semibold text-lg">Control y seguridad</h3>
              </div>
              <p className="text-sm text-gray-600">
                Conecta con correo o wallet. Tus claves son tuyas; nosotros solo guiamos tu aprendizaje.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

'use client'

import Link from 'next/link'
import { FaUserShield, FaChartLine, FaWallet } from 'react-icons/fa'

export default function GetStarted() {
  return (
    <div className="min-h-screen w-screen bg-background text-foreground flex flex-col justify-between">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-background bg-opacity-90 backdrop-blur-lg shadow-md w-full">
        <Link href="/" passHref>
          <span className="text-xl font-bold tracking-wide text-primary cursor-pointer">Patrimo</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-grow pt-32 px-6">
        <section className="max-w-5xl mx-auto space-y-10 text-center">
          <h1 className="text-4xl font-funnel tracking-tight">¿Cómo funciona Patrimo?</h1>

          {/* Diagrama funcional */}
          <div className="flex flex-wrap justify-center items-start gap-6">
            {[
              {
                icon: <FaUserShield size={28} />,
                title: "1. Crea tu cuenta",
                text: "Conéctate con tu wallet y define tu perfil de riesgo.",
              },
              {
                icon: <FaChartLine size={28} />,
                title: "2. Recibe asesoría",
                text: "Selecciona un asesor y recibe recomendaciones personalizadas.",
              },
              {
                icon: <FaWallet size={28} />,
                title: "3. Mantén el control",
                text: "Tus fondos siempre están en tu wallet. Tú decides.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-card text-card-foreground border border-border rounded-xl p-6 w-64 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-center text-primary mb-4">
                  {step.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                <p className="text-sm">{step.text}</p>
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
  <Link href="/login">
    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition-all">
      Iniciar sesión
    </button>
  </Link>
  <Link href="/onboarding/risk-profile">
    <button className="bg-card text-card-foreground border border-border px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all">
      Crear cuenta
    </button>
  </Link>
</div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-purple text-muted-foreground py-6 text-center text-sm">
        Desde México con 💜  — 2025
      </footer>
    </div>
  )
}
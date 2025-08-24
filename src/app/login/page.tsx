'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@/components/ConnectButton'
import { useSession } from '@/hooks/useSession'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { status } = useAccount()            // wagmi: detecta wallet conectada
  const { login } = useSession()             // tu hook (para guardar el email si quieres)

  // Si la wallet se conecta, redirige al dashboard
  useEffect(() => {
    if (status === 'connected') {
      router.push('/dashboards')
    }
  }, [status, router])

  const handleEmailLogin = () => {
    const mail = email.trim()
    if (!mail) return
    // opcional: guarda sesión local
    try { login?.(mail) } catch {}
    router.push('/dashboards')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEmailLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido</h1>
          <p className="text-sm text-muted-foreground">
            Entra con tu correo o conecta tu wallet.
          </p>
        </div>

        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-5 space-y-4">
          {/* Login con correo */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Correo</label>
            <Input
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <Button className="w-full" onClick={handleEmailLogin}>
              Entrar
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-px bg-border w-full" />
            <span className="text-xs text-muted-foreground">o</span>
            <div className="h-px bg-border w-full" />
          </div>

          {/* Conectar wallet (Reown) */}
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>

        {/* (Opcional) Info de Reown si sigues con projectId de demo */}
        {/* <p className="text-xs text-center text-muted-foreground">
          Este projectId funciona solo en localhost. Configura el tuyo en Reown Cloud.
        </p> */}
      </div>
    </div>
  )
}

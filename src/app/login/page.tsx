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
  const { status } = useAccount()
  const { login } = useSession()

  useEffect(() => {
    if (status === 'connected') {
      router.push('/dashboards')
    }
  }, [status, router])

  const handleEmailLogin = () => {
    const mail = email.trim()
    if (!mail) return
    try { login?.(mail) } catch {}
    router.push('/dashboards')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEmailLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800 px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Bienvenido a Cryptalia
          </h1>
          <p className="text-sm text-gray-600">Elige cómo quieres entrar</p>
        </div>

        <div className="rounded-2xl border bg-white shadow-lg p-6 space-y-4">
          {/* Login con correo */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Correo</label>
            <Input
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <Button className="w-full text-lg py-3" onClick={handleEmailLogin}>
              Iniciar con correo
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">o</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Conectar wallet (visible, estilizado) */}
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from '@/hooks/useSession'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { login } = useSession()

  const handleLogin = () => {
    login(email)
    const isAdvisor = email.toLowerCase().includes('advisor')
    const next = isAdvisor ? '/dashboards/advisor' : '/dashboards/user'
    router.push(next)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-sm w-full space-y-6">
        <h1 className="text-3xl font-funnel text-center">Iniciar sesión</h1>
        <div className="space-y-4">
          <Input
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
          >
            Entrar
          </Button>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <Link href="/onboarding" className="text-primary underline">
            Crear una
          </Link>
        </p>
      </div>
    </div>
  )
}
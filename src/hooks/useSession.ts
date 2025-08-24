import { useEffect, useState } from 'react'

type User = {
  email: string
  role: 'user' | 'advisor'
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = (email: string) => {
    const role = email.toLowerCase().includes('advisor') ? 'advisor' as const : 'user' as const
const userData: User = { email, role }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return { user, login, logout }
}
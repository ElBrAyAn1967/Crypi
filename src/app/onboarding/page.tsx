'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingHome() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/onboarding/intro')
  }, [router])

  return null
}
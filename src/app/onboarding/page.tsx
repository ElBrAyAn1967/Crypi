'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingHome() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/onboarding/risk-profile')
  }, [router])

  return null
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StrategyOption from '@/components/onboarding/StrategyOption'
import NavigationButtons from '@/components/onboarding/NavigationButtons'
import ProgressDots from '@/components/onboarding/ProgressDots'
import { Briefcase, BarChart, TrendingUp, User } from 'lucide-react'

export default function StrategyPage() {
  const router = useRouter()
  const [selected, setSelected] = useState('')

  const strategies = [
    { label: 'Conservative', value: 'conservative', icon: <Briefcase /> },
    { label: 'Moderate', value: 'moderate', icon: <BarChart /> },
    { label: 'Aggressive', value: 'aggressive', icon: <TrendingUp /> },
    { label: 'Custom Consultation', value: 'custom', icon: <User /> },
  ]

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <ProgressDots total={3} current={1} />
      <h2 className="text-xl font-semibold mb-6">Select Strategy</h2>
      <div className="grid grid-cols-2 gap-4">
        {strategies.map((s) => (
          <StrategyOption
            key={s.value}
            label={s.label}
            icon={s.icon}
            selected={selected === s.value}
            onClick={() => setSelected(s.value)}
          />
        ))}
      </div>
      <NavigationButtons
        onNext={() => router.push('/onboarding/advisor-match')}
        onBack={() => router.push('/onboarding/risk-profile')}
        isDisabled={!selected}
      />
    </main>
  )
}
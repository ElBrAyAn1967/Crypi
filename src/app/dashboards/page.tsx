'use client'

import { useMemo, useState } from 'react'
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BellIcon, TrophyIcon, MedalIcon, FlagIcon, FlameIcon, CheckIcon } from 'lucide-react'
import PageWrapper from '@/components/layout/page-wrapper'

type Lesson = {
  id: string
  title: string
  completed: boolean
  ytaReward: number
}

type World = {
  id: string
  name: string
  color: string
  description: string
  lessons: Lesson[]
  unlocked: boolean
}

const initialWorlds: World[] = [
  {
    id: 'world-1',
    name: 'Mundo 1 · Fundamentos',
    color: 'from-pink-500 to-yellow-400',
    description: 'Wallets, seed phrase, gas y primeras transacciones.',
    unlocked: true,
    lessons: [
      { id: 'l1', title: '¿Qué es cripto?', completed: true,  ytaReward: 10 },
      { id: 'l2', title: 'Wallet & seed phrase', completed: true, ytaReward: 15 },
      { id: 'l3', title: 'Enviar tu 1ª tx', completed: false, ytaReward: 20 },
      { id: 'l4', title: 'Seguridad básica', completed: false, ytaReward: 15 },
    ],
  },
  {
    id: 'world-2',
    name: 'Mundo 2 · DeFi Básico',
    color: 'from-fuchsia-500 to-amber-400',
    description: 'Swaps, pools, stablecoins y riesgos.',
    unlocked: false,
    lessons: [
      { id: 'l1', title: 'DEX & AMM', completed: false, ytaReward: 20 },
      { id: 'l2', title: 'Stablecoins', completed: false, ytaReward: 15 },
      { id: 'l3', title: 'Pool de liquidez', completed: false, ytaReward: 25 },
    ],
  },
  {
    id: 'world-3',
    name: 'Mundo 3 · NFTs & Identidad',
    color: 'from-purple-500 to-rose-400',
    description: 'Mint, colecciones, identidad on-chain y utilidades.',
    unlocked: false,
    lessons: [
      { id: 'l1', title: 'Mint de NFT', completed: false, ytaReward: 20 },
      { id: 'l2', title: 'Utilidad vs especulación', completed: false, ytaReward: 15 },
    ],
  },
]

const dailyQuests = [
  { id: 'q1', label: 'Revisa tu seed phrase (simulado)', reward: 5 },
  { id: 'q2', label: 'Lee 1 tip de seguridad', reward: 3 },
  { id: 'q3', label: 'Completa 1 lección hoy', reward: 7 },
]

export default function UserDashboard() {
  const [worlds, setWorlds] = useState<World[]>(initialWorlds)
  const [yta, setYta] = useState<number>(35)
  const [unclaimedYta, setUnclaimedYta] = useState<number>(0)
  const [streakDays, setStreakDays] = useState<number>(3)
  const [completedQuests, setCompletedQuests] = useState<string[]>(['q2'])

  const { totalLessons, completedLessons, globalProgress } = useMemo(() => {
    const total = worlds.reduce((acc, w) => acc + w.lessons.length, 0)
    const done  = worlds.reduce((acc, w) => acc + w.lessons.filter(l => l.completed).length, 0)
    return {
      totalLessons: total,
      completedLessons: done,
      globalProgress: total ? Math.round((done / total) * 100) : 0,
    }
  }, [worlds])

  const completeLesson = (worldId: string, lessonId: string) => {
    setWorlds(prev =>
      prev.map(w => {
        if (w.id !== worldId) return w
        const lessons = w.lessons.map(l => {
          if (l.id !== lessonId) return l
          if (l.completed) return l
          setUnclaimedYta(u => u + l.ytaReward)
          return { ...l, completed: true }
        })
        return { ...w, lessons }
      })
    )
    setStreakDays(s => Math.min(s + 1, 7))
  }

  const claimYta = () => {
    if (unclaimedYta <= 0) return
    setYta(v => v + unclaimedYta)
    setUnclaimedYta(0)
  }

  const toggleQuest = (questId: string, reward: number) => {
    setCompletedQuests(prev => {
      if (prev.includes(questId)) {
        setYta(v => Math.max(0, v - reward))
        return prev.filter(id => id !== questId)
      } else {
        setYta(v => v + reward)
        return [...prev, questId]
      }
    })
  }

  const unlockWorlds = () => {
    setWorlds(prev => {
      const progressByWorld = (w: World) => {
        const t = w.lessons.length
        const d = w.lessons.filter(l => l.completed).length
        return t ? (d / t) * 100 : 0
      }
      const [w1, w2, w3] = prev
      const canUnlock2 = progressByWorld(w1) >= 75
      const canUnlock3 = progressByWorld(w2) >= 75
      return prev.map(w =>
        w.id === 'world-2' ? { ...w, unlocked: w.unlocked || canUnlock2 }
        : w.id === 'world-3' ? { ...w, unlocked: w.unlocked || canUnlock3 }
        : w
      )
    })
  }

  useMemo(() => { unlockWorlds() }, [worlds]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageWrapper>
      <div className="page bg-background text-foreground">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mundos</h1>
              <p className="text-sm text-muted-foreground">
                Aprende cripto paso a paso y gana <span className="font-semibold">YTA</span> por cada logro.
              </p>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Notificaciones">
                  <BellIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[340px] p-0">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <TrophyIcon className="h-4 w-4" />
                    <p className="text-sm">¡Completaste “Wallet & seed phrase”! +15 YTA por reclamar.</p>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2 mt-2">
                    <FlagIcon className="h-4 w-4" />
                    <p className="text-sm">Nueva misión diaria disponible.</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* KPIs Top */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Progreso Global</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>{completedLessons}/{totalLessons} lecciones</span>
                  <span className="font-semibold">{globalProgress}%</span>
                </div>
                <Progress value={globalProgress} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">YTA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-2xl font-bold">{yta} YTA</div>
                    <p className="text-xs text-muted-foreground">Balance actual</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{unclaimedYta} YTA</div>
                    <p className="text-xs text-muted-foreground">Pendiente por reclamar</p>
                  </div>
                </div>
                <Button onClick={claimYta} disabled={unclaimedYta === 0} className="w-full">
                  Reclamar recompensas
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Racha</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <FlameIcon className="h-5 w-5" />
                  <div className="text-2xl font-bold">{streakDays} días</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Completa al menos 1 lección diaria para mantener la racha.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs principales */}
          <Tabs defaultValue="worlds" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="worlds">Mundos</TabsTrigger>
              <TabsTrigger value="quests">Misiones</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            {/* Mundos (con tabs internos) */}
            <TabsContent value="worlds">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-4">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  {worlds.map(w => (
                    <TabsTrigger
                      key={w.id}
                      value={w.id}
                      disabled={!w.unlocked}
                      title={w.unlocked ? w.name : 'Completa el mundo anterior'}
                    >
                      {w.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Tab: Todos (grid) */}
                <TabsContent value="all">
                  <div className="grid gap-4 md:grid-cols-3">
                    {worlds.map(w => {
                      const total = w.lessons.length
                      const done = w.lessons.filter(l => l.completed).length
                      const p = total ? Math.round((done / total) * 100) : 0
                      const locked = !w.unlocked
                      return (
                        <Card key={w.id} className="overflow-hidden">
                          <div className={`h-1 w-full bg-gradient-to-r ${w.color}`} />
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{w.name}</CardTitle>
                              {locked ? (
                                <Badge variant="secondary">Bloqueado</Badge>
                              ) : (
                                <Badge>Desbloqueado</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{w.description}</p>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span>{done}/{total} lecciones</span>
                              <span className="font-semibold">{p}%</span>
                            </div>
                            <Progress value={p} className="h-2" />
                            <div className="pt-2">
                              <Button className="w-full" disabled={locked}>
                                {locked ? 'Completa el mundo anterior' : 'Continuar'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* Un tab por mundo (detalle con lecciones) */}
                {worlds.map(w => {
                  const total = w.lessons.length
                  const done = w.lessons.filter(l => l.completed).length
                  const p = total ? Math.round((done / total) * 100) : 0
                  const locked = !w.unlocked
                  return (
                    <TabsContent key={w.id} value={w.id}>
                      <Card className="overflow-hidden">
                        <div className={`h-1 w-full bg-gradient-to-r ${w.color}`} />
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{w.name}</CardTitle>
                            {locked ? (
                              <Badge variant="secondary">Bloqueado</Badge>
                            ) : (
                              <Badge>Desbloqueado</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{w.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>{done}/{total} lecciones</span>
                            <span className="font-semibold">{p}%</span>
                          </div>
                          <Progress value={p} className="h-2" />
                          <Separator />
                          <div className="space-y-2">
                            {w.lessons.map(lesson => (
                              <div key={lesson.id} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant={lesson.completed ? 'secondary' : 'outline'}
                                    className="h-7 w-7"
                                    onClick={() => completeLesson(w.id, lesson.id)}
                                    disabled={locked || lesson.completed}
                                    aria-label={lesson.completed ? 'Completado' : 'Completar lección'}
                                  >
                                    {lesson.completed ? <CheckIcon className="h-4 w-4" /> : <span>•</span>}
                                  </Button>
                                  <span className={lesson.completed ? 'line-through text-muted-foreground' : ''}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <Badge variant="outline">+{lesson.ytaReward} YTA</Badge>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2">
                            <Button className="w-full" disabled={locked}>
                              {locked ? 'Completa el mundo anterior' : 'Continuar'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  )
                })}
              </Tabs>
            </TabsContent>

            {/* Misiones */}
            <TabsContent value="quests">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Misiones diarias</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dailyQuests.map(q => {
                      const done = completedQuests.includes(q.id)
                      return (
                        <div key={q.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MedalIcon className="h-4 w-4" />
                            <span className={done ? 'line-through text-muted-foreground' : ''}>{q.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">+{q.reward} YTA</Badge>
                            <Button size="sm" variant={done ? 'secondary' : 'default'} onClick={() => toggleQuest(q.id, q.reward)}>
                              {done ? 'Completada' : 'Completar'}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recompensas y logros</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Primera transacción on-chain</span>
                      <Badge>Logro</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>3 días de racha</span>
                      <Badge>Logro</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Completa el Mundo 1</span>
                      <Badge variant="secondary">Pendiente</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Actividad */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad reciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Completaste “Wallet & seed phrase”</span>
                    <span className="text-muted-foreground">hace 2h</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Iniciaste “Enviar tu 1ª tx”</span>
                    <span className="text-muted-foreground">ayer</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Reclamaste 20 YTA</span>
                    <span className="text-muted-foreground">ayer</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leaderboard */}
            <TabsContent value="leaderboard">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>Top aprendices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { user: 'Ana', yta: 145 },
                      { user: 'Vale', yta: 120 },
                      { user: 'Julio', yta: 95 },
                      { user: 'Mel', yta: 80 },
                    ].map((row, i) => (
                      <div key={row.user} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-right">{i + 1}.</span>
                          <span className="font-medium">{row.user}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrophyIcon className="h-4 w-4" />
                          <span className="font-semibold">{row.yta} YTA</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="h-10" />
        </div>
      </div>
    </PageWrapper>
  )
}

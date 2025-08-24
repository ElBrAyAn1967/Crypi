'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Lesson = { id: string; title: string; completed: boolean; ytaReward: number }
type World = { id: string; name: string; color: string; lessons: Lesson[]; unlocked: boolean }

const initialWorlds: World[] = [
  {
    id: 'w1',
    name: 'Fundamentos',
    color: 'from-pink-500 to-yellow-400',
    unlocked: true,
    lessons: [
      { id: 'l1', title: '¿Qué es cripto?', completed: true, ytaReward: 10 },
      { id: 'l2', title: 'Wallet & seed phrase', completed: false, ytaReward: 15 },
    ],
  },
  {
    id: 'w2',
    name: 'DeFi Básico',
    color: 'from-fuchsia-500 to-amber-400',
    unlocked: false,
    lessons: [{ id: 'l1', title: 'Stablecoins', completed: false, ytaReward: 15 }],
  },
]

const dailyQuests = [
  { id: 'q1', label: 'Revisa tu seed phrase', reward: 5 },
  { id: 'q2', label: 'Completa 1 lección', reward: 7 },
]

export default function Dashboard() {
  const [worlds, setWorlds] = useState(initialWorlds)
  const [yta, setYta] = useState(20)
  const [unclaimed, setUnclaimed] = useState(0)
  const [completedQuests, setCompletedQuests] = useState<string[]>([])

  const { total, done, progress } = useMemo(() => {
    const total = worlds.reduce((a, w) => a + w.lessons.length, 0)
    const done = worlds.reduce((a, w) => a + w.lessons.filter(l => l.completed).length, 0)
    return { total, done, progress: total ? Math.round((done / total) * 100) : 0 }
  }, [worlds])

  const completeLesson = (wId: string, lId: string) => {
    setWorlds(prev =>
      prev.map(w =>
        w.id === wId
          ? {
              ...w,
              lessons: w.lessons.map(l =>
                l.id === lId && !l.completed
                  ? (setUnclaimed(u => u + l.ytaReward), { ...l, completed: true })
                  : l
              ),
            }
          : w
      )
    )
  }

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Progreso</CardTitle></CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span>{done}/{total} lecciones</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>YTA</CardTitle></CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{yta} YTA</p>
            <p className="text-sm text-muted-foreground">+{unclaimed} pendiente</p>
            <Button onClick={() => { setYta(y => y + unclaimed); setUnclaimed(0) }} disabled={!unclaimed} className="mt-2 w-full">
              Reclamar
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Misiones</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {dailyQuests.map(q => {
              const done = completedQuests.includes(q.id)
              return (
                <div key={q.id} className="flex justify-between text-sm">
                  <span className={done ? "line-through text-muted-foreground" : ""}>{q.label}</span>
                  <Button
                    size="sm"
                    variant={done ? "secondary" : "default"}
                    onClick={() =>
                      setCompletedQuests(prev =>
                        done ? prev.filter(id => id !== q.id) : [...prev, q.id]
                      )
                    }
                  >
                    {done ? "✔" : "+YTA"}
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Mundos */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          {worlds.map(w => <TabsTrigger key={w.id} value={w.id}>{w.name}</TabsTrigger>)}
        </TabsList>

        <TabsContent value="all" className="grid md:grid-cols-2 gap-4 mt-4">
          {worlds.map(w => {
            const total = w.lessons.length
            const done = w.lessons.filter(l => l.completed).length
            const p = total ? Math.round((done / total) * 100) : 0
            return (
              <Card key={w.id}>
                <div className={`h-1 w-full bg-gradient-to-r ${w.color}`} />
                <CardHeader><CardTitle>{w.name}</CardTitle></CardHeader>
                <CardContent>
                  <Progress value={p} />
                  {w.lessons.map(l => (
                    <div key={l.id} className="flex justify-between text-sm mt-2">
                      <span className={l.completed ? "line-through text-muted-foreground" : ""}>{l.title}</span>
                      <Button size="sm" disabled={l.completed} onClick={() => completeLesson(w.id, l.id)}>
                        {l.completed ? "✔" : `+${l.ytaReward}`}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}

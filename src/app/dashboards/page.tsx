'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BellIcon } from 'lucide-react'
import Suggestions from '@/components/user/Suggestions'
import PortfolioOverview from '@/components/user/PortfolioOverview'
import AllocationChart from '@/components/user/AllocationChart'
import PerformanceChart from '@/components/user/PerformanceChart'
import RiskScoreChart from '@/components/user/RiskScoreChart'
import UserWalletStatus from '@/components/user/UserWalletStatus'
import ActivityLog from '@/components/user/ActivityLog'
import { Button } from '@/components/ui/button'
import { PortfolioProvider } from '@/context/PortfolioContext'
import TokenStatsTable from '@/components/user/TokenStatsTable'
import PageWrapper from '@/components/layout/page-wrapper'

export default function UserDashboard() {
  return (
    <PortfolioProvider>
      <PageWrapper>
        <div className="page bg-background text-foreground">
          <div className="container">
            <div className="flex items-center justify-between max-w-6xl mx-auto mb-6 w-full">
              <h1 className="text-3xl font-bold">Mi Portafolio</h1>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <BellIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0">
                  <Suggestions />
                </PopoverContent>
              </Popover>
            </div>

            <div className="max-w-4xl mx-auto mb-8">
              <UserWalletStatus />
            </div>

            <Tabs defaultValue="overview" className="w-full mx-auto section">
              <TabsList className="grid w-full grid-cols-5 mb-4">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="allocation">Activos</TabsTrigger>
                <TabsTrigger value="activity">Actividad</TabsTrigger>
                <TabsTrigger value="performance">Rendimiento</TabsTrigger>
                <TabsTrigger value="risk">Riesgo</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <PortfolioOverview />
              </TabsContent>
              <TabsContent value="allocation">
                <AllocationChart />
                <TokenStatsTable />
              </TabsContent>
              <TabsContent value="activity">
                <ActivityLog />
              </TabsContent>
              <TabsContent value="performance">
                <PerformanceChart />
              </TabsContent>
              <TabsContent value="risk">
                <RiskScoreChart />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </PageWrapper>
    </PortfolioProvider>
  )
}
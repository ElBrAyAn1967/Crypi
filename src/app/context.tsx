'use client'

import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppKitProvider } from "@reown/appkit/react"
import { config, wagmiAdapter, networks, projectId } from "@/config/index"

const queryClient = new QueryClient()

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppKitProvider
      projectId={projectId}
      networks={networks}
      adapters={[wagmiAdapter]}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </AppKitProvider>
  )
}

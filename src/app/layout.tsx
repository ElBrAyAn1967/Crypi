import type { Metadata } from "next"
import "./globals.css"
import ContextProvider from "@/context"

export const metadata: Metadata = {
  title: "Cryptalia",
  description: "Aprende blockchain jugando con Mundos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  )
}

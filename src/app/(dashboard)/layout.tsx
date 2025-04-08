import { Providers } from '@/contexts/providers/provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BottomNavigation } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RedeApícola',
  description: 'Sua fidelidade digital',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  bg-white flex flex-col h-full overflow-hidden relative`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

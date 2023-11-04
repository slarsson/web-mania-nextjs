import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/auth/session'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WEB3',
  description: 'Go > TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <header>
            <h1>sl</h1>
          </header>
          {children}
          <footer></footer>
        </SessionProvider>
      </body>
    </html>
  )
}

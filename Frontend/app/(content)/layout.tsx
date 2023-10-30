import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/contexts/AuthProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}
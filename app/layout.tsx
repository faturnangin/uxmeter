import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UX Meter',
  description: 'Sistem Pengukuran UX',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={inter.className}>
      <Navbar/>
        {children}
      <div className="mb-24 lg:hidden"></div>
      </body>
    </html>
  )
}

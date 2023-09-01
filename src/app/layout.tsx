import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Hostile Bot',
  description: 'Webapp for Hostile Bot',
}

import { ReduxProvider } from '@/utils/redux/provider'
import NavBar from '@/components/nav'
import Footer from '@/components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <ReduxProvider>
              <div className='min-h-screen bg-gradient-to-br from-sky-50 to-gray-200'>
                <NavBar />
                <div className='sm:ml-56'>
                  {children}
                </div>
              </div>
              <Footer/>
            </ReduxProvider>
          </body>
    </html>
  )
}

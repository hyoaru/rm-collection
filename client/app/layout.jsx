export const revalidate = 600

import { Lora } from 'next/font/google'

// App imports
import Header from "@components/Header"
import './globals.css'
import { Toaster } from '@components/ui/toaster'

const typeface = Lora({ subsets: ['latin'] })

export const metadata = {
  title: 'Rea Mariz Collection Co.Ltd',
  description: '',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={typeface.className} suppressHydrationWarning>
        <Header />
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}

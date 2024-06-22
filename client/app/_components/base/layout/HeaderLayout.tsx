'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export default function HeaderLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 pt-4 z-50 backdrop-filter backdrop-blur-lg'>

    </header>
  )
}

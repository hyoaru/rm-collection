import { ReactNode } from 'react'

export default function BaseContainer({ children }: { children: ReactNode }) {
  return (
    <div className='px-4 mx-auto md:container'>
      {children}
    </div>
  )
}

import React from 'react'
import { User } from 'lucide-react'

export default function RecentOrderRow(props) {
  const { fullName, totalPrice, email } = props

  return (
    <>
      <div className='flex items-center'>
        <User size={35} strokeWidth={1} className='bg-secondary border border-primary h-full object-cover p-[3px] rounded-full me-4' />
        <div className="me-auto">
          <p className='font-medium'>{fullName}</p>
          <p className='opacity-80 text-sm'>{email}</p>
        </div>
        <p className='font-bold'>{`+ ₱ ${totalPrice.toLocaleString()}`}</p>
      </div>
    </>
  )
}

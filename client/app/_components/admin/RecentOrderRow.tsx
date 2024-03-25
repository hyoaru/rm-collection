import React from 'react'
import { User } from 'lucide-react'

// App imports
import { Tables } from '@constants/base/database-types'

type RecentOrderRowProps = {
  user: Tables<'users'> | null
  totalPrice: number
}

export default function RecentOrderRow({user, totalPrice}: RecentOrderRowProps) {
  return (
    <>
      <div className='flex items-center'>
        <User size={35} strokeWidth={1} className='bg-secondary border  h-full object-cover p-[3px] rounded-full me-4' />
        <div className="me-auto">
          <p className='font-medium'>{`${user?.first_name} ${user?.last_name}`}</p>
          <p className='opacity-80 text-sm'>{user?.email}</p>
        </div>
        <p className='font-bold'>{`+ ₱ ${totalPrice.toLocaleString()}`}</p>
      </div>
    </>
  )
}
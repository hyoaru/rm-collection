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
      <div className='text-nowrap flex items-center'>
        <User className='me-4 w-8 h-8 bg-secondary rounded-full text-primary p-[0.3rem]' />
        <div className="me-auto">
          <p className='font-medium text-sm'>{`${user?.first_name} ${user?.last_name}`}</p>
          <p className='opacity-80 text-sm'>{user?.email}</p>
        </div>
        <p className='text-sm text-primary text-nowrap'>{`+ ₱ ${totalPrice.toLocaleString()}`}</p>
      </div>
    </>
  )
}
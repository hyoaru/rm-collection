import React from 'react'

// App imports
import SectionHeader from '@/app/_components/shared/SectionHeader'
import { getUserStateServer } from '@services/authentication/getUserStateServer'
import getAllOrdersByUser from '@services/orders/getAllOrdersByUser'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  const { data: orders, error } = await getAllOrdersByUser()

  return (
    <>
      <SectionHeader
        title={'All orders'}
        description={'Overview information of all your orders.'}
      />

    </>
  )
}

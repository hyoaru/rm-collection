import React from 'react'

// App imports
import { getUserStateServer } from '@services/authentication/getUserStateServer'
import getAllOrdersByUser from '@services/orders/getAllOrdersByUser'
import OrdersFeed from '@components/orders/OrdersFeed'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  const { data: orders, error } = await getAllOrdersByUser(userStateGeneral.id)

  return (
    <>
      <div className="mt-4">
        <OrdersFeed orders={orders} />
      </div>
    </>
  )
}

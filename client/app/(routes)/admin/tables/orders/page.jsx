import React from 'react'

// App imports
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import getAllOrders from '@services/admin/shared/getAllOrders'
import { getUserStateServer } from '@services/authentication/getUserStateServer'
import OrdersTable from '@components/admin/tables/orders/OrdersTable'
import getAllOrderStatus from '@services/admin/shared/getAllOrderStatus'

export default async function Page() {
  const orders = await getAllOrders()
  const orderStatus = await getAllOrderStatus()
  const { userStateGeneral, userStateAuth } = await getUserStateServer()

  return (
    <>
      <AdminSectionHeader
        category={'Table'}
        title={'Orders'}
        description={'Comprehensive overview of order list and other relevant information.'}
      />

      <OrdersTable
        orders={orders.data}
        orderStatus={orderStatus}
        userStateGeneral={userStateGeneral}
      />

    </>
  )
}

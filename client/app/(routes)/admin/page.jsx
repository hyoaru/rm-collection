import React from 'react'

// App imports
import AdminDashboard from '@components/admin/AdminDashboard'
import getAllOrders from '@services/admin/shared/getAllOrders'
import getUserList from '@/app/_services/admin/shared/getUserList'

export default async function Page() {
  const { data, error } = await getAllOrders()
  const { data: users } = await getUserList()

  return (
    <>
      <AdminDashboard orders={data} users={users} />
    </>
  )
}

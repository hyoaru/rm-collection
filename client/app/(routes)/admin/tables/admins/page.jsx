import React from 'react'

// App imports
import getAdminList from '@services/admin/shared/getAdminList'
import DataTable from '@components/admin/tables/shared/DataTable'

export default async function page() {
  const adminList = await getAdminList()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'email' }, { accessorKey: 'first_name' },
    { accessorKey: 'last_name' }, { accessorKey: 'role' }
  ]

  return (
    <>
      <h1 className="text-4xl capitalize my-5 font-bold text-center sm:mt-0 md:text-left">Admin list</h1>
      <DataTable data={adminList.data} columnDefinition={columnDefinition} />
    </>
  )
}

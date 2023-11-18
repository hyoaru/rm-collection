import React from 'react'

// App imports
import getUserList from '@services/admin/shared/getUserList'
import DataTable from '@components/admin/tables/shared/DataTable'
import FormHeader from '@components/admin/shared/FormHeader'
import getUserListCsv from '@services/admin/shared/getUserListCsv'

export default async function page() {
  const userList = await getUserList()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'email' }, { accessorKey: 'first_name' },
    { accessorKey: 'last_name' }, { accessorKey: 'role' }
  ]

  return (
    <>
      <FormHeader
        category={'Table'}
        title={'User list table'}
        description={'Comprehensive overview of user list and other relevant information.'}
      />

      <DataTable
        data={userList.data}
        columnDefinition={columnDefinition}
        getListCsv={getUserListCsv}
        tableName={'byd-user-list'}
      />
    </>
  )
}

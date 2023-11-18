import React from 'react'

// App imports
import getAdminList from '@services/admin/shared/getAdminList'
import DataTable from '@components/admin/tables/shared/DataTable'
import FormHeader from '@components/admin/shared/FormHeader'
import getAdminListCsv from '@services/admin/shared/getAdminListCsv'

export default async function page() {
  const adminList = await getAdminList()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'email' }, { accessorKey: 'first_name' },
    { accessorKey: 'last_name' }, { accessorKey: 'role' }
  ]

  return (
    <>
      <FormHeader
        category={'Table'}
        title={'Admin list table'}
        description={'Comprehensive overview of admin list and other relevant information.'}
      />

      <DataTable
        data={adminList.data}
        columnDefinition={columnDefinition}
        getListCsv={getAdminListCsv}
        tableName={'byd-admin-list'}
      />
    </>
  )
}

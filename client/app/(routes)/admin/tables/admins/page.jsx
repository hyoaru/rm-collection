import React from 'react'

// App imports
import getAdminList from '@services/admin/shared/getAdminList'
import DataTable from '@components/admin/tables/shared/DataTable'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import getAdminListCsv from '@services/admin/shared/getAdminListCsv'
import removeAdminAuthority from '@services/admin/tables/removeAdminAuthority'
import { ADMIN_ROLES, BASE_ADMIN_ROLES } from '@constants/admin/base'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function page() {
  const adminList = await getAdminList()
  const {userStateGeneral, userStateAuth} = await getUserStateServer()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'email' }, { accessorKey: 'first_name' },
    { accessorKey: 'last_name' }, { accessorKey: 'role' }
  ]

  const rowActions = [
    {
      label: "Remove admin authority",
      onClick: removeAdminAuthority,
      isDestructive: true,
      adminRolesPermitted: ADMIN_ROLES.slice(0, 1)
    }
  ]


  return (
    <>
      <AdminSectionHeader
        category={'Table'}
        title={'Admin list table'}
        description={'Comprehensive overview of admin list and other relevant information.'}
      />

      <DataTable
        data={adminList.data}
        columnDefinition={columnDefinition}
        getListCsv={getAdminListCsv}
        tableName={'byd-admin-list'}
        rowActions={rowActions}
        userStateGeneral={userStateGeneral}
      />
    </>
  )
}

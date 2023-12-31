import React from 'react'

// App imports
import getUserList from '@services/admin/shared/getUserList'
import DataTable from '@components/admin/tables/shared/DataTable'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import getUserListCsv from '@services/admin/shared/getUserListCsv'
import deleteUser from '@services/admin/tables/deleteUser'
import { ADMIN_ROLES, BASE_ADMIN_ROLES } from '@constants/admin/base'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function page() {
  const userList = await getUserList()
  const {userStateGeneral, userStateAuth} = await getUserStateServer()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'email' }, { accessorKey: 'first_name' },
    { accessorKey: 'last_name' }, { accessorKey: 'role' }
  ]

  const rowActions = [
    { 
      label: "Delete user", 
      onClick: deleteUser, 
      isDestructive: true,
      adminRolesPermitted: ADMIN_ROLES.slice(0,1)
    }
  ]

  return (
    <>
      <AdminSectionHeader
        category={'Table'}
        title={'User list table'}
        description={'Comprehensive overview of user list and other relevant information.'}
      />

      <DataTable
        data={userList.data}
        columnDefinition={columnDefinition}
        getListCsv={getUserListCsv}
        tableName={'byd-user-list'}
        rowActions={rowActions}
        userStateGeneral={userStateGeneral}
      />
    </>
  )
}

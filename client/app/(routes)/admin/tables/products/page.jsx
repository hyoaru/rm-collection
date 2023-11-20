import React from 'react'

// App imports
import getProductList from '@services/admin/shared/getProductList'
import DataTable from '@components/admin/tables/shared/DataTable'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import getProductListCsv from '@services/admin/shared/getProductListCsv'
import deleteProduct from '@services/admin/tables/deleteProduct'
import { ADMIN_ROLES, BASE_ADMIN_ROLES } from '@constants/admin'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const productList = await getProductList()
  const {userStateGeneral, userStateAuth} = await getUserStateServer()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'name' }, { accessorKey: 'category' },
    { accessorKey: 'description' }
  ]

  const rowActions = [
    { 
      label: "Delete product", 
      onClick: deleteProduct, 
      isDestructive: true,
      adminRolesPermitted: ADMIN_ROLES.slice(0,1)
    }
  ]

  return (
    <>
      <AdminSectionHeader
        category={'Table'}
        title={'Product list table'}
        description={'Comprehensive overview of product list and other relevant information.'}
      />

      <DataTable
        data={productList.data}
        columnDefinition={columnDefinition}
        getListCsv={getProductListCsv}
        tableName={'byd-product-list'}
        rowActions={rowActions}
        userStateGeneral={userStateGeneral}
      />
    </>
  )
}

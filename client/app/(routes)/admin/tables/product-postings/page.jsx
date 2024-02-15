import React from 'react'

// App imports
import getProductPostingList from '@services/admin/shared/getProductPostingList'
import DataTable from '@components/admin/tables/shared/DataTable'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import getProductPostingListCsv from '@services/admin/shared/getProductPostingListCsv'
import deleteProductVariant from '@services/admin/tables/deleteProductVariant'
import productVariantDisableIsDisplayed from '@services/admin/tables/productVariantDisableIsDisplayed'
import { ADMIN_ROLES, BASE_ADMIN_ROLES } from '@constants/admin/base'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const productPostingList = await getProductPostingList()
  const { userStateGeneral } = await getUserStateServer()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'product_id' }, { accessorKey: 'material' },
    { accessorKey: 'material_property' }, { accessorKey: 'size' },
    { accessorKey: 'quantity' }, { accessorKey: 'price' },
    { accessorKey: 'discount_rate' }, { accessorKey: 'is_displayed' },
  ]

  const rowActions = [
    {
      label: "Delete product variant",
      onClick: deleteProductVariant,
      isDestructive: true,
      adminRolesPermitted: ADMIN_ROLES.slice(0, 1)
    },
    {
      label: "Hide from collections",
      onClick: productVariantDisableIsDisplayed,
      isDestructive: false,
      adminRolesPermitted: BASE_ADMIN_ROLES
    },
  ]

  return (
    <>
      <AdminSectionHeader
        category={'Table'}
        title={'Product posting list table'}
        description={'Comprehensive overview of product posting list and other relevant information.'}
      />

      <DataTable
        data={productPostingList.data}
        columnDefinition={columnDefinition}
        getListCsv={getProductPostingListCsv}
        tableName={'byd-product-posting-list'}
        rowActions={rowActions}
        userStateGeneral={userStateGeneral}
      />
    </>
  )
}

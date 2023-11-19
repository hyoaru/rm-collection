import React from 'react'

// App imports
import getProductPostingList from '@services/admin/shared/getProductPostingList'
import DataTable from '@components/admin/tables/shared/DataTable'
import FormHeader from '@components/admin/shared/FormHeader'
import getProductPostingListCsv from '@services/admin/shared/getProductPostingListCsv'
import deleteProductVariant from '@services/admin/tables/deleteProductVariant'

export default async function Page() {
  const productPostingList = await getProductPostingList()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'product_id' }, { accessorKey: 'material' },
    { accessorKey: 'material_property' }, { accessorKey: 'quantity' }, { accessorKey: 'price' },
    { accessorKey: 'is_displayed' }
  ]

  const rowActions = [
    { label: "Delete product variant", onClick: deleteProductVariant, isDestructive: true }
  ]

  return (
    <>
      <FormHeader
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
      />
    </>
  )
}

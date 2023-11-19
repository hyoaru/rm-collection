import React from 'react'

// App imports
import getProductVariantList from '@services/admin/shared/getProductVariantList'
import DataTable from '@components/admin/tables/shared/DataTable'
import FormHeader from '@components/admin/shared/FormHeader'
import getProductVariantListCsv from '@services/admin/shared/getProductVariantListCsv'
import deleteProductVariant from '@services/admin/tables/deleteProductVariant'
import productVariantEnableIsDisplayed from '@services/admin/tables/productVariantEnableIsDisplayed'
import productVariantDisableIsDisplayed from '@services/admin/tables/productVariantDisableIsDisplayed'

export default async function Page() {
  const productVariantList = await getProductVariantList()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'product_id' }, { accessorKey: 'material' },
    { accessorKey: 'material_property' }, { accessorKey: 'quantity' }, { accessorKey: 'price' },
    { accessorKey: 'is_displayed' }
  ]

  const rowActions = [
    { label: "Delete product variant", onClick: deleteProductVariant, isDestructive: true },
    { label: "Show on collections", onClick: productVariantEnableIsDisplayed, isDestructive: false },
    { label: "Hide from collections", onClick: productVariantDisableIsDisplayed, isDestructive: false },
  ]

  return (
    <>
      <FormHeader
        category={'Table'}
        title={'Product variant list table'}
        description={'Comprehensive overview of product variant list and other relevant information.'}
      />

      <DataTable
        data={productVariantList.data}
        columnDefinition={columnDefinition}
        getListCsv={getProductVariantListCsv}
        tableName={'byd-product-variant-list'}
        rowActions={rowActions}
      />
    </>
  )
}

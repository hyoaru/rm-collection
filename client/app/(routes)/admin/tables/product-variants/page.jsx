import React from 'react'

// App imports
import getProductVariantList from '@services/admin/shared/getProductVariantList'
import DataTable from '@components/admin/tables/shared/DataTable'
import FormHeader from '@components/admin/shared/FormHeader'
import getProductVariantListCsv from '@services/admin/shared/getProductVariantListCsv'

export default async function Page() {
  const productVariantList = await getProductVariantList()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'product_id' }, { accessorKey: 'material' },
    { accessorKey: 'material_property' }, { accessorKey: 'quantity' }, { accessorKey: 'price' },
    { accessorKey: 'is_displayed' }
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
      />
    </>
  )
}

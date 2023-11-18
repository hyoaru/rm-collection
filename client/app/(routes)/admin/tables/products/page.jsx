import React from 'react'

// App imports
import getProductList from '@services/admin/shared/getProductList'
import DataTable from '@components/admin/tables/shared/DataTable'
import FormHeader from '@components/admin/shared/FormHeader'
import getProductListCsv from '@services/admin/shared/getProductListCsv'

export default async function Page() {
  const productList = await getProductList()

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'name' }, { accessorKey: 'category' },
    { accessorKey: 'description' }
  ]

  return (
    <>
      <FormHeader
        category={'Table'}
        title={'Product list table'}
        description={'Comprehensive overview of product list and other relevant information.'}
      />

      <DataTable
        data={productList.data}
        columnDefinition={columnDefinition}
        getListCsv={getProductListCsv}
        tableName={'byd-product-list'}
      />
    </>
  )
}

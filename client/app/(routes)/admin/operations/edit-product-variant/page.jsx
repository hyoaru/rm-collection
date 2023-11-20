import React from 'react'

// App imports
import getProductList from '@services/admin/shared/getProductList'
import getProductVariantList from '@services/admin/shared/getProductVariantList'
import EditProductVariantForm from '@components/admin/operations/EditProductVariantForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'

export default async function Page() {
  const productList = await getProductList()
  const productVariantList = await getProductVariantList()
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Edit product variant'}
        description={'Check details about the product and other pertinent information.'}
      />
      <EditProductVariantForm productList={productList} productVariantList={productVariantList} />
    </>
  )
}

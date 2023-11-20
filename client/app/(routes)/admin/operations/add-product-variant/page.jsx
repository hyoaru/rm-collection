import React from 'react'

// App imports
import getProductList from '@services/admin/shared/getProductList'
import AddProductVariantForm from '@components/admin/operations/AddProductVariantForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'

export default async function Page() {
  const productList = await getProductList()
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Add product variant'}
        description={'Provide details about the product and other pertinent information.'}
      />
      <AddProductVariantForm productList={productList} />
    </>
  )
}

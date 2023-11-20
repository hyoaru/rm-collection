import Image from 'next/image'
import React from 'react'

// App imports
import EditProductForm from '@components/admin/operations/EditProductForm'
import getProductList from '@services/admin/shared/getProductList'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'

export default async function page() {
  const productList = await getProductList()
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Edit product'}
        description={'Check details about the product and other pertinent information.'}
      />
      <EditProductForm productList={productList} />
    </>
  )
}

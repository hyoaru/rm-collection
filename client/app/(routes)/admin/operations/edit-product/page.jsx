import Image from 'next/image'
import React from 'react'

// App imports
import EditProductForm from '@components/admin/operations/EditProductForm'
import getProductList from '@services/admin/getProductList'

export default async function page() {
  const productList = await getProductList()
  return (
    <>
      <EditProductForm productList={productList} />
    </>
  )
}

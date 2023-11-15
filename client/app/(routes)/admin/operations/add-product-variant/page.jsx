import React from 'react'

// App imports
import getProductList from '@services/admin/shared/getProductList'
import AddProductVariantForm from '@/app/_components/admin/operations/AddProductVariantForm'

export default async function Page() {
  const productList = await getProductList()
  return (<AddProductVariantForm productList={productList} />)
}

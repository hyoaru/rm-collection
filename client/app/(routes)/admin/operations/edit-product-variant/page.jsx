import React from 'react'

// App imports
import getProductList from '@services/admin/shared/getProductList'
import getProductVariantList from '@services/admin/shared/getProductVariantList'
import EditProductVariantForm from '@components/admin/operations/EditProductVariantForm'

export default async function Page() {
  const productList = await getProductList()
  const productVariantList = await getProductVariantList()
  return (<EditProductVariantForm productList={productList} productVariantList={productVariantList} />)
}

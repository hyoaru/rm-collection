import React from 'react'

// App imports
import getCollection from '@services/main/getCollectionPaginated'
import CollectionHeader from '@components/main/CollectionHeader'
import ProductSearchFeed from './ProductSearchFeed'

export default async function Page() {
  const { data: products, error } = await getCollection()
  const breadcrumbs = [{ label: "Collection", link: '/' }]

  return (
    <>
      <ProductSearchFeed
        products={products}
        breadcrumbs={breadcrumbs}
      />
    </>
  )
}

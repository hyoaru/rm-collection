import React from 'react'

// App imports
import getCollection from '@/app/_services/collection/getCollectionPaginated'
import CollectionHeader from '@/app/_components/collection/CollectionHeader'
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

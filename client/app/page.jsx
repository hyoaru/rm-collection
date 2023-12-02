import React from "react"

// App imports
import getCollection from "@services/main/getCollection"
import ProductsFeed from "@components/shared/ProductsFeed"

export default async function Home() {
  const { data: products, error } = await getCollection()
  const breadcrumbs = [{ label: "Collection", link: "/" }]
  const inStock = products?.length ?? 0

  return (
    <>
      <ProductsFeed
        products={products}
        breadcrumbs={breadcrumbs}
        inStock={inStock}
      />
    </>
  )
}

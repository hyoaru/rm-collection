import React from "react"

// App imports
import getCollectionByCategory from "@services/main/getCollectionByCategory"
import ProductsFeed from "@components/shared/ProductsFeed"

export default async function Page() {
  const { data: products, error } = await getCollectionByCategory({category: 'necklace'})
  const inStock = products?.length ?? 0

  const breadcrumbs = [
    { label: "Collection", link: "/" },
    { label: "Necklaces", link: "/collection/necklace" },
  ]

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

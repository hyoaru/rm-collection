import React from "react"

// App imports
import getCollectionByCategory from "@services/main/getCollectionByCategory"
import ProductsFeed from "@components/shared/ProductsFeed"

export default async function Page() {
  const { data: products, error } = await getCollectionByCategory({category: 'bracelet'})
  const inStock = products?.length ?? 0

  const breadcrumbs = [
    { label: "Collection", link: "/" },
    { label: "Bracelets", link: "/collection/bracelet" },
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

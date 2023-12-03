import React from "react"

// App imports
import getCollectionByCategoryPaginated from "@services/collection/getCollectionByCategoryPaginated"
import ProductsFeed from "@components/collection/ProductsFeed"

export default async function Page(props) {
  const { searchParams } = props
  const currentPage = searchParams.page ?? 0
  const { data: products, error, count, endPage } = await getCollectionByCategoryPaginated({category: 'earring', page: currentPage})
  const inStock = count ?? 0

  const breadcrumbs = [
    { label: "Collection", link: "/" },
    { label: "Earrings", link: "/collection/earring" },
  ]

  return (
    <>
      <ProductsFeed
        products={products}
        breadcrumbs={breadcrumbs}
        inStock={inStock}
        endPage={endPage}
        currentPage={currentPage}
      />
    </>
  )
}

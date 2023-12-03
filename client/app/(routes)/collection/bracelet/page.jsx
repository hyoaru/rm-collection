import React from "react"

// App imports
import getCollectionByCategoryPaginated from "@/app/_services/collection/getCollectionByCategoryPaginated"
import ProductsFeed from "@/app/_components/collection/ProductsFeed"

export default async function Page(props) {
  const { searchParams } = props
  const currentPage = searchParams.page ?? 0
  const { data: products, error, count, endPage } = await getCollectionByCategoryPaginated({category: 'bracelet', page: currentPage})
  const inStock = count ?? 0

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
        endPage={endPage}
        currentPage={currentPage}
      />
    </>
  )
}

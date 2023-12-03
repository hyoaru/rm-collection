import React from "react"

// App imports
import getCollectionPaginated from "@services/main/getCollectionPaginated"
import ProductsFeed from "@components/shared/ProductsFeed"

export default async function Home(props) {
  const { searchParams } = props
  const currentPage = searchParams.page ?? 0
  const { data: products, error, count, endPage } = await getCollectionPaginated({ page: currentPage })
  const breadcrumbs = [{ label: "Collection", link: "/" }]
  const inStock = count ?? 0

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

"use client"

import React, { useState } from 'react'

// App imports
import ProductCard from '@components/main/ProductCard'
import CollectionHeader from '@components/main/CollectionHeader'

export default function ProductsFeed(props) {
  const { products, breadcrumbs, inStock } = props
  const [_, setState] = useState()

  function toggleProductsOrder() {
    products.reverse()
    setState(performance.now())
  }

  return (
    <>
      <CollectionHeader
        breadcrumbs={breadcrumbs}
        inStock={inStock}
        toggleSortOrder={toggleProductsOrder}
      />

      <div className="md:container mx-auto px-4 mt-4 mb-8">
        <div className="columns-3 space-y-8">
          {products && products.map((product, index) => (
            <div className="break-inside-avoid-column w-full" key={product.id}>
              <ProductCard
                product={product}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

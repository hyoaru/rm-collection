"use client"

import React, { useState } from 'react'
import Image from 'next/image'

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
        {!products?.[0] && <>
          <div className="flex justify-center mt-10">
            <div className="space-y-12">
              <div className="">
                <h1 className='text-4xl text-center font-bold'>No products avaiable yet</h1>
                <h1 className='text-lg mt-2 text-muted-foreground text-center'>Stay tuned for dazzling exclusive deals</h1>
              </div>
              <Image
                src={'/undraw-illustrations/light-undraw_taken_re_yn20.svg'}
                className='w-[300px] sm:w-[400px] md:w-[500px] object-cover mx-auto'
                height={1000}
                width={1000}
                alt=''
              />
            </div>
          </div>
        </>}
        <div className="columns-2 space-y-8 sm:columns-3 lg:gap-x-8 ">
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
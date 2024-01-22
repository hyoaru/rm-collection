"use client"

import React, { useState } from 'react'
import Image from 'next/image'

// App imports
import CollectionHeader from '@components/collection/CollectionHeader'
import { Input } from '@components/ui/input'
import ProductCard from '@components/collection/ProductCard'

export default function ProductSearchFeed(props) {
  const { products, breadcrumbs } = props
  const [keywordFilter, setKeywordFilter] = useState('')
  const inStock = products?.length ?? 0
  const [_, setState] = useState()

  function toggleProductsOrder() {
    matchedProducts.reverse()
    setState(performance.now())
  }

  const matchedProducts = (
    keywordFilter !== ''
      ? products.filter(
        (product) => {
          let stringToSearch = Object.values(product).join(' ').toLowerCase()

          product?.product_variants?.forEach((productVariant) => {
            stringToSearch += Object.values(productVariant).join(' ').toLowerCase()
          })

          return stringToSearch.includes(keywordFilter)
        }
      )
      : products
  )

  return (
    <>
      <CollectionHeader
        breadcrumbs={breadcrumbs}
        inStock={inStock}
        toggleSortOrder={toggleProductsOrder}
      />

      <div className="md:container mx-auto px-4 mt-4 mb-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl font-bold text-center">Search product</h1>
          <Input
            className={'max-w-4xl placeholder:text-center text-center'}
            placeholder={'Search product by id, name, or any other attribute'}
            onChange={(event) => setKeywordFilter(event.target.value)}
          />
        </div>

        {matchedProducts
          ? <>
            <div className="columns-2 space-y-8 sm:columns-3 md:columns-4 lg:gap-x-8 mt-10">
              {matchedProducts.map((product, index) => (
                <div className="break-inside-avoid-column w-full" key={product.id}>
                  <ProductCard
                    product={product}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </>
          : <>
            <div className="flex justify-center mt-10">
              <div className="space-y-12">
                <Image
                  src={'/undraw-illustrations/light-undraw_file_searching_re_3evy.svg'}
                  className='w-[300px] sm:w-[400px] object-cover mx-auto'
                  height={1000}
                  width={1000}
                  alt=''
                />
              </div>
            </div>
          </>}

      </div>
    </>
  )
}

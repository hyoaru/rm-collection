"use client"

import React, { useState } from 'react'
import Image from 'next/image'

// App imports
import ProductCard from '@components/collection/ProductCard'
import CollectionHeader from '@components/collection/CollectionHeader'
import { Button } from '@components/ui/button'
import { useRouter } from 'next/navigation'

export default function ProductsFeed(props) {
  const { products, breadcrumbs, inStock, endPage, currentPage } = props
  const router = useRouter()
  const [_, setState] = useState()

  function toggleProductsOrder() {
    products.reverse()
    setState(performance.now())
  }

  function onPreviousPage() {
    if (currentPage <= 0) { return }
    router.push(`/?page=${Number(currentPage) - 1}`)
  }

  function onNextPage() {
    if (currentPage == endPage) { return }
    router.push(`/?page=${Number(currentPage) + 1}`)
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
                className='w-[300px] sm:w-[400px]  object-cover mx-auto'
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
        {(currentPage <= endPage) && (!products?.[0]) && <>
          <div className="flex justify-center gap-4 mt-14">
            <Button
              size={'lg'}
              className={'w-28'}
              onClick={onPreviousPage}
              disabled={currentPage == 0}
            >
              Previous
            </Button>

            <Button
              size={'lg'}
              className={'w-28'}
              onClick={onNextPage}
              disabled={currentPage == endPage}
            >
              Next
            </Button>
          </div>
        </>}
      </div>
    </>
  )
}

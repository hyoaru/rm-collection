"use client"

import React, { useState } from 'react'
import Link from 'next/link'

// App imports
import Breadcrumbs from '@components/shared/Breadcrumbs'

export default function CollectionHeader(props) {
  const { breadcrumbs, inStock, toggleSortOrder } = props
  const [sortOrder, setSortOrder] = useState("Ascending")

  function onSortOrderClick() {
    setSortOrder(prevSortOrder => prevSortOrder === "Ascending" ? "Descending" : "Ascending")
    toggleSortOrder()
  }

  return (
    <>
      <div className="md:container mx-auto px-4 mb-8">
        <div className="flex items-center px-2">
          <div className="flex items-center justify-start w-3/6 sm:w-2/6 xl:w-1/3">
            <div className="hidden sm:block">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <small className='opacity-50'>{`In stock (${inStock})`}</small>
          </div>

          <div className="hidden justify-center w-2/6 sm:flex xl:w-1/3">
            <small className='opacity-50 text-center'>A collection of in stock jewelries</small>
          </div>

          <div className="flex justify-end w-3/6 sm:w-2/6 xl:w-1/3 ">
            <small
              className='cursor-pointer opacity-50 hover:opacity-80 text-end'
              onClick={onSortOrderClick}>
              Sort order: {sortOrder}
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

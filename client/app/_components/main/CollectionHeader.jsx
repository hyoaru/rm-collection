"use client"

import React, { useState } from 'react'
import Link from 'next/link'

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
          <div className="flex items-center justify-start w-1/6 xl:w-1/3">
            {breadcrumbs && breadcrumbs.map((breadcrumb) => (
              <small className='me-1 opacity-50 hover:opacity-80' key={`Breadcrumb-${breadcrumb.label}`}>
                <Link href={breadcrumb.link}>{`${breadcrumb.label} >`}</Link>
              </small>
            ))}
            <small className='opacity-50'>{`In stock (${inStock})`}</small>
          </div>

          <div className="flex justify-center w-4/6 xl:w-1/3">
            <small className='opacity-50'>A collection of in stock jewelries</small>
          </div>

          <div className="flex justify-end w-1/6 xl:w-1/3 ">
            <small
              className='cursor-pointer opacity-50 hover:opacity-80'
              onClick={onSortOrderClick}>
              Sort order: {sortOrder}
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import React from 'react'

// App imports
import { queryDiscountedProducts } from '@constants/index/queries'
import ProductsFeed from '@components/index/ProductsFeed'

export default function DiscountedProductsFeed() {
  return (
    <ProductsFeed queryOptions={queryDiscountedProducts} />
  )
}

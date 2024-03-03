"use client"

import React from 'react'

// App imports
import { queryLatestProducts } from '@constants/index/queries'
import ProductsFeed from '@components/index/ProductsFeed'

export default function LatestProductsFeed() {
  return (
    <ProductsFeed queryOptions={queryLatestProducts} />
  )
}

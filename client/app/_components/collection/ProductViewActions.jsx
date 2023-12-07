"use client"

import React, { useState } from 'react'

// App imports
import { Button } from '@components/ui/button'
import getDiscountedPrice from '@lib/getDiscountedPrice'

export default function ProductViewActions(props) {
  const { productVariant } = props
  const { price: productVariantPrice, discount_rate: productVariantDiscountRate, quantity: productVariantQuantity } = productVariant
  const productVariantDiscountedPrice = getDiscountedPrice({ originalPrice: productVariantPrice, discountRate: productVariantDiscountRate })
  const [orderQuantity, setOrderQuantity] = useState(productVariantQuantity > 0 ? 1 : 0)

  function onOrderQuantityIncrease() {
    if (orderQuantity >= productVariantQuantity) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity + 1)
  }

  function onOrderQuantityDecrease() {
    if (orderQuantity <= 0) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity - 1)
  }

  return (
    <>
      <div className="flex items-center">
        <p className='me-auto font-semibold'>Quantity</p>
        <div className="flex items-center gap-x-6">
          <Button
            size={'sm'}
            variant={'secondary'}
            onClick={onOrderQuantityDecrease}
          >
            -
          </Button>
          <p className='font-semibold'>{orderQuantity}</p>
          <Button
            size={'sm'}
            variant={'secondary'}
            onClick={onOrderQuantityIncrease}
          >
            +
          </Button>
        </div>
      </div>
      <Button size={'lg'} className={'w-full'}>
        {`₱ ${productVariantDiscountedPrice.toLocaleString()} ・ Add to cart`}
      </Button>
    </>
  )

}  

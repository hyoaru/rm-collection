"use client"

import React, { useState } from 'react'

// App imports
import { Button } from '@components/ui/button'
import useAddToCart from '@hooks/collection/useAddToCart'
import { useToast } from '@components/ui/use-toast'
import revalidateAllData from '@services/shared/revalidateAllData'

export default function ProductViewActions(props) {
  const { product, productVariant, userState } = props
  const { userStateAuth, userStateGeneral } = userState
  const { quantity: productVariantQuantity, discounted_price: productVariantDiscountedPrice } = productVariant
  const [orderQuantity, setOrderQuantity] = useState(productVariantQuantity > 0 ? 1 : 0)
  const isOutOfStock = productVariantQuantity <= 0
  const { addToCart, isLoading } = useAddToCart()
  const { toast } = useToast()

  function onOrderQuantityIncrease() {
    if (orderQuantity >= productVariantQuantity) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity + 1)
  }

  function onOrderQuantityDecrease() {
    if (orderQuantity <= 1) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity - 1)
  }

  async function onAddToCart() {
    await addToCart({
      userId: userStateAuth.id,
      productVariantId: productVariant.id,
      quantity: orderQuantity,
    }).then(async ({ data, error }) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error has occured.",
          description: "Please try again later."
        })
      } else {
        toast({
          title: `${product.name} ${productVariant.material}-${productVariant.material_property} added to cart.`
        })

        await revalidateAllData()
      }
    })
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
      <Button
        size={'lg'}
        className={'w-full'}
        onClick={onAddToCart}
        disabled={isLoading || isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : `₱ ${productVariantDiscountedPrice.toLocaleString()} ・ Add to cart`}
      </Button>
    </>
  )

}  
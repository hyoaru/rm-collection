"use client"

import React, { useState } from 'react'
import { Trash } from "lucide-react"

// App imports
import { Button } from "@components/ui/button"
import getDiscountedPrice from '@lib/getDiscountedPrice'
import getProductThumbnailPublicUrl from '@services/shared/getProductThumbnailPublicUrl'
import deleteCartItem from '@/app/_services/collection/deleteCartItem'
import { useToast } from '@components/ui/use-toast'
import revalidateAllData from '@services/shared/revalidateAllData'

export default function CartItem(props) {
  const { cartItem, product, productVariant } = props
  const { id: productId, name: productName } = product
  const { toast } = useToast()

  const { id: cartItemId, quantity: cartItemQuantity } = cartItem
  const { id: productVariantId, material: productVariantMaterial, material_property: productVariantMaterialProperty } = productVariant
  const { quantity: productVariantQuantity, price: productVariantPrice, discount_rate: productVariantDiscountRate } = productVariant
  const productVariantDiscountedPrice = getDiscountedPrice({ originalPrice: productVariantPrice, discountRate: productVariantDiscountRate })
  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: productId })

  const [orderQuantity, setOrderQuantity] = useState(cartItemQuantity)

  function onOrderQuantityIncrease() {
    if (orderQuantity >= productVariantQuantity) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity + 1)
  }

  function onOrderQuantityDecrease() {
    if (orderQuantity <= 0) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity - 1)
  }

  async function onRemove(itemId) {
    await deleteCartItem({ itemId: itemId })
      .then(async ({ error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          await revalidateAllData()
        }
      })
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-x-4 justify-center p-3 rounded-lg transition-all ease-in-out duration-300 hover:bg-secondary">
        <div className="col-span-3">
          <img
            src={productThumbnailPublicUrl}
            className="object-cover rounded-lg w-full max-h-[100px]"
            alt=""
          />
        </div>

        <div className="col-span-7 self-center">
          <p className="font-semibold text-sm">{productName}</p>
          <p className="text-xs">{productVariantMaterial}-{productVariantMaterialProperty}</p>
          <p className="text-xs text-muted-foreground">{productVariantId}</p>
          <div className="flex items-center text-xs mt-2">
            <div className="me-auto">
              <p className=''>{`₱ ${productVariantDiscountedPrice.toLocaleString()}`}</p>
            </div>
            <div className="flex items-center gap-x-1">
              <button
                className='px-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-background'
                onClick={onOrderQuantityDecrease}
              >
                -
              </button>
              <p className='font-semibold'>{orderQuantity}</p>
              <button
                className='px-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-background'
                onClick={onOrderQuantityIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-2 border-s ">
          <div className="flex items-center justify-center h-full">
            <div
              onClick={() => onRemove(cartItemId)}
              className="w-10 h-10 justify-center items-center flex rounded-lg cursor-pointer"
            >
              <Trash size={18} className="hover:text-destructive" />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

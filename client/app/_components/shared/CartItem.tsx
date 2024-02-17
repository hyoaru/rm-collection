"use client"

import React, { useState } from 'react'
import { Trash } from "lucide-react"
import Image from 'next/image'

// App imports
import { Button } from "@components/ui/button"
import getProductThumbnailPublicUrl from '@services/shared/getProductThumbnailPublicUrl'
import deleteCartItem from '@services/collection/deleteCartItem'
import { useToast } from '@components/ui/use-toast'
import revalidateAllData from '@services/shared/revalidateAllData'
import updateCartItemQuantity from '@services/collection/updateCartItemQuantity'

export default function CartItem(props) {
  const { cartItem, product, productVariant, userState, isReadOnly } = props
  const { id: productId, name: productName } = product
  const { toast } = useToast()

  const { userStateAuth: { id: userId } } = userState
  const { id: cartItemId, quantity: cartItemQuantity } = cartItem
  const { id: productVariantId, material: productVariantMaterial, material_property: productVariantMaterialProperty, size: productVariantSize } = productVariant
  const { quantity: productVariantQuantity } = productVariant
  const { discounted_price: productVariantDiscountedPrice } = productVariant
  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: productId })

  const [orderQuantity, setOrderQuantity] = useState(cartItemQuantity)

  async function commitCartItemQuantity(quantity) {
    await updateCartItemQuantity({
      userId: userId,
      productVariantId: productVariantId,
      quantity: quantity
    }) 
  }

  async function onOrderQuantityIncrease() {
    if (orderQuantity >= productVariantQuantity) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity + 1)
    await commitCartItemQuantity(orderQuantity + 1)
  }

  async function onOrderQuantityDecrease() {
    if (orderQuantity <= 1) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity - 1)
    await commitCartItemQuantity(orderQuantity - 1)
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
          <Image
            src={productThumbnailPublicUrl}
            className="object-cover rounded-lg h-full "
            width={200}
            height={150}
            alt=""
          />
        </div>

        <div className={`self-center ${isReadOnly ? 'col-span-9' : 'col-span-7'}`}>
          <p className="font-semibold text-sm">{productName}</p>
          <p className="text-xs break-words">{productVariantMaterial} - {productVariantMaterialProperty} : {productVariantSize}</p>
          <p className="text-xs text-muted-foreground break-all">{productVariantId}</p>
          <div className="flex items-center text-xs mt-2">
            <div className="me-auto">
              <p className=''>{`₱ ${productVariantDiscountedPrice.toLocaleString()}`}</p>
            </div>
            <div className={`flex items-center gap-x-1 ${isReadOnly ? 'hidden' : ''}`}>
              <button
                type='button'
                className='px-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-background'
                onClick={onOrderQuantityDecrease}
              >
                -
              </button>
              <p className='font-semibold'>{orderQuantity}</p>
              <button
                type='button'
                className='px-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-background'
                onClick={onOrderQuantityIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={`border-s ${isReadOnly ? 'hidden' : 'col-span-2'}`}>
          <div className="flex items-center justify-center h-full">
            <div
              onClick={() => onRemove(cartItemId)}
              className="w-10 h-10 justify-center items-center flex rounded-lg cursor-pointer"
            >
              <Trash size={18} className="transition-all ease-in-out duration-300 hover:text-destructive" />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
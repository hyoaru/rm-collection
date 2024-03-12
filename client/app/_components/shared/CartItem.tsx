"use client"

import React, { useState } from 'react'
import { Trash } from "lucide-react"
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'

// App imports
import getProductThumbnailPublicUrl from '@services/shared/getProductThumbnailPublicUrl'
import deleteCartItem from '@services/collection/deleteCartItem'
import { useToast } from '@components/ui/use-toast'
import updateCartItemQuantity from '@services/collection/updateCartItemQuantity'
import { Tables } from '@constants/base/database-types'

type CartItemProps = {
  isReadOnly?: boolean
  cartItem: Tables<'cart'> & {
    product_variants: Tables<'product_variants'> & {
      products: Tables<'products'>
    }
  }
}

export default function CartItem({isReadOnly, cartItem}: CartItemProps) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [orderQuantity, setOrderQuantity] = useState(cartItem.quantity)
  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: cartItem.product_variants.product_id })

  async function commitCartItemQuantity(quantity: number) {
    await updateCartItemQuantity({
      cartItemId: cartItem.id,
      quantity: quantity
    }) 

    revalidateCart()
  }

  async function onOrderQuantityIncrease() {
    if (orderQuantity >= cartItem.product_variants.quantity) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity + 1)
    await commitCartItemQuantity(orderQuantity + 1)
  }

  async function onOrderQuantityDecrease() {
    if (orderQuantity <= 1) return
    setOrderQuantity(previousOrderQuantity => previousOrderQuantity - 1)
    await commitCartItemQuantity(orderQuantity - 1)
  }

  async function onRemove(itemId: string) {
    await deleteCartItem(itemId)
      .then(({ error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          revalidateCart()
        }
      })
  }

  function revalidateCart(){
    queryClient.invalidateQueries({queryKey: ['cart'], refetchType: 'all'})
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
          <p className="font-semibold text-sm">{cartItem.product_variants.products.name}</p>
          <p className="text-xs break-words">
            {cartItem.product_variants.material} - {cartItem.product_variants.material_property}
            {cartItem.product_variants.size ? ` : ${cartItem.product_variants.size}` : ''}
          </p>
          {/* <p className="text-xs text-muted-foreground break-all">{cartItem.product_variant_id}</p> */}
          <div className="flex items-center text-xs mt-2">
            <div className="me-auto">
              <p className=''>{`₱ ${cartItem.product_variants.discounted_price!.toLocaleString()}`}</p>
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
              onClick={() => onRemove(cartItem.id)}
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
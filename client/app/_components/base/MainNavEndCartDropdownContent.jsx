"use client"

import { User, Lock } from "lucide-react"
import Link from "next/link"
import React, { useRef } from 'react'

// App imports
import { DropdownMenuContent } from "@components/ui/dropdown-menu"
import { Button } from "@components/ui/button"
import { ScrollArea } from "@components/ui/scroll-area"
import CartItem from "./CartItem"
import getDiscountedPrice from "@/app/_lib/getDiscountedPrice"


export default function MainNavEndCartDropdownContent(props) {
  const { userState, cart } = props
  const { data: cartItems, error } = cart

  return (
    <>
      <DropdownMenuContent side={'bottom'} align={'end'} className={'w-screen sm:w-[23rem] '}>
        <div className="p-2">
          {!cartItems?.[0]
            ? <>
              <h1 className="text-center font-bold text-xl text-muted-foreground p-5">No items yet</h1>
            </>
            : <>
              <ScrollArea className={cartItems.length <= 1 ? 'h-[8rem]' : 'h-[20rem]'}>
                {cartItems && cartItems.map((cartItem) => {
                  return (
                    <CartItem
                      key={`CartItem-${cartItem.id}`}
                      cartItem={cartItem}
                      product={cartItem.product_variants.products}
                      productVariant={cartItem.product_variants}
                      quantity={cartItem.quantity}
                      userState={userState}
                    />
                  )
                })}
              </ScrollArea>
              <div className="flex justify-center py-3">
                <Button size={'sm'} >Proceed to checkout</Button>
              </div>
            </>}
        </div>
      </DropdownMenuContent>
    </>
  )
}

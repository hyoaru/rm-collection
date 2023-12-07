"use client"

import React, { useState } from 'react'
import { Trash } from "lucide-react"

// App imports
import { Button } from "@components/ui/button"

export default function CartContentItem(props) {
  const { productVariant } = props
  const [orderQuantity, setOrderQuantity] = useState(1)

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
      <div className="grid grid-cols-12 gap-x-4 justify-center p-3 rounded-lg transition-all ease-in-out duration-300 hover:bg-secondary">
        <div className="col-span-3">
          <img
            src="https://picsum.photos/500/1000"
            className="object-cover rounded-lg w-full max-h-[100px]"
            alt=""
          />
        </div>

        <div className="col-span-7 self-center">
          <p className="font-semibold text-sm">sample product </p>
          <p className="text-xs">sample product variant</p>
          <p className="text-xs text-muted-foreground">dsafj asdpoifjasodf asdpo</p>
          <div className="flex items-center text-xs mt-2">
            <div className="me-auto">
              <p className=''>₱ 123 123</p>
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
          <div className="w-10 h-10 justify-center items-center flex rounded-lg">
            <Trash size={18} className="text-destructive" />
          </div>
          
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import React from 'react'
import { Check, X, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

// App imports
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { ScrollArea } from '@components/ui/scroll-area'
import { Button } from '@components/ui/button'
import ReadOnlyFormControl from '@components/shared/ReadOnlyFormControl'
import getProductThumbnailPublicUrl from '@services/shared/getProductThumbnailPublicUrl'


export default function OrderReceiptDialogContent({ order }) {
  const { id: orderId, users: user, shipping_address: shippingAddress, product_variants: productVariants, order_status: orderStatus } = order
  const { id: orderStatusId, label: orderStatusLabel } = orderStatus
  const { quantity, discount_rate: discountRate, price, total_price: totalPrice } = order
  const { first_name: firstName, last_name: lastName, email } = user
  const { id: productVariantId, products: product, material: productVariantMaterial, material_property: productVariantMaterialProperty } = productVariants
  const { id: productId, name: productName } = product
  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: productId })

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'text-sm font-normal text-center'}>{`Order #${orderId}`}</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="px-5 space-y-1">
            <div className="flex justify-center items-center">
              <span className="font-bold text-2xl text-center">
                {`Order ${orderStatusLabel.toLowerCase().replaceAll('-', ' ')} `}
                {orderStatusId <= 1
                  ? <X className='inline align-middle p-1 bg-destructive rounded-full text-background' />
                  :  <Check className='inline align-middle p-1 bg-success rounded-full text-background' />
                }
              </span>
            </div>
            <div className="text-center text-xs opacity-80">
              Thank you for choosing Rea Mariz Collection Co.Ltd
            </div>
          </div>


          <div className="relative mt-6">
            <div className="absolute z-[2] bottom-0 left-0 right-0">
              <div className="w-full bg-gradient-to-t from-primary h-[50px] opacity-30 rounded-br-xl rounded-bl-xl">
                <div className="h-full flex w-full justify-center items-center">
                </div>
              </div>
            </div>
            <ScrollArea className="h-[250px]">
              <div className="space-y-2">
                <ReadOnlyFormControl
                  label={'Customer name'}
                  value={`${firstName} ${lastName}`}
                />

                <ReadOnlyFormControl
                  label={'Email'}
                  value={`${email}`}
                />

                <ReadOnlyFormControl
                  label={'Shipping address'}
                  value={`${shippingAddress}`}
                />

                <ReadOnlyFormControl
                  label={'Delivery'}
                  value={`${'Home deliver'}`}
                />

                <ReadOnlyFormControl
                  label={'Payment'}
                  value={`${'Bank transfer / E-wallet transfer'}`}
                />

                <div className="bg-secondary rounded-xl p-2 px-5">
                  <p className="opacity-80 text-xs">{'Instruction'}</p>
                  <p className="text-sm">
                    <span className="">{'Send a screenshot of this receipt on '}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://www.facebook.com/ReaMarizCollection" className='font-medium text-info underline' target='_blank' referrerPolicy='no-referrer'>
                            Facebook
                          </a>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>www.facebook.com/ReaMarizCollection</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span>{' for the payment channels'}</span>
                    <span className="font-medium text-info">{' (Bank transfer / e-wallets) '}</span>
                    <span className="">{'to complete your order.'}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="rounded-xl p-3 px-5 border">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                      <Image
                        width={100}
                        height={100}
                        src={productThumbnailPublicUrl}
                        className='object-cover rounded-lg h-full'
                        alt=''
                      />
                    </div>
                    <div className="col-span-9">
                      <p className="font-semibold text-sm">{productName}</p>
                      <p className="text-xs">{quantity} unit - {productVariantMaterial}-{productVariantMaterialProperty}</p>
                      <p className="text-xs text-muted-foreground">{productVariantId}</p>
                      <div className="flex items-center gap-x-2">
                        <p className="text-xs">{`₱ ${price.toLocaleString()}`}</p>
                        <p className="text-xs">{`${discountRate}% off`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          <div className="mt-4 rounded-xl border p-3 px-5 text-sm">
            <div className="flex items-center">
              <p className="opacity-80 me-auto">Subtotal</p>
              <p>{`₱ ${totalPrice.toLocaleString()}`}</p>
            </div>

            <div className="flex items-center">
              <p className="opacity-80 me-auto">Delivery fee</p>
              <p>{`Quoted after order`}</p>
            </div>

            <div className="flex items-center font-bold">
              <p className="opacity-80 me-auto">Total</p>
              <p>{`₱ ${totalPrice.toLocaleString()}`}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <div className={'mx-auto w-6/12'} >
              <Button className={'w-full'}>Close</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

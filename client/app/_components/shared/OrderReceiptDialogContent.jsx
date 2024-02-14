'use client'

import React from 'react'
import { Check, X, MoreHorizontal, XCircle } from 'lucide-react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { useToJpeg } from '@hugocxl/react-to-image'

// App imports
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { ScrollArea } from '@components/ui/scroll-area'
import { Button } from '@components/ui/button'
import ReadOnlyFormControl from '@components/shared/ReadOnlyFormControl'
import getProductThumbnailPublicUrl from '@services/shared/getProductThumbnailPublicUrl'
import { useToast } from '@components/ui/use-toast'


export default function OrderReceiptDialogContent({ order }) {
  const { id: orderId, users: user, product_variants: productVariants, order_status: orderStatus, orders_shipping: orderShipping } = order
  const { id: orderStatusId, label: orderStatusLabel } = orderStatus
  const { quantity, discount_rate: discountRate, price, total_price: totalPrice } = order
  const { first_name: firstName, last_name: lastName, email } = user || {}
  const { id: productVariantId, products: product, material: productVariantMaterial, material_property: productVariantMaterialProperty } = productVariants || {}
  const { id: productId, name: productName } = product || {}
  const { receiver_email: receiverEmail, receiver_first_name: receiverFirstName, receiver_last_name: receiverLastName } = orderShipping
  const { receiver_phone_number: receiverPhoneNumber, shipping_country: shippingCountry, shipping_address: shippingAddress, shipping_zip_code: shippingZipCode } = orderShipping
  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: productId })
  const { toast } = useToast()

  const [{ isLoading }, downloadReceipt] = useToJpeg({
    selector: '#receiptBody',
    cacheBust: true,
    backgroundColor: '#ffffff',
    onStart: () => {
      document.querySelector('#receiptBody').className = "p-5"
      document.querySelector('#scrollArea').className = "h-max"
    },
    onSuccess: data => {
      const link = document.createElement('a');
      link.download = `rea-mariz-collection_order-receipt_${dayjs().format('YYYY-MM-DD')}.jpeg`;
      link.href = data;
      link.click();
      document.querySelector('#scrollArea').className = "h-[250px]"
      document.querySelector('#receiptBody').className = ""
      toast({
        title: "Receipt has been downloaded.",
        description: "Please check your downloads."
      })
    }
  })

  return (
    <>
      <DialogContent className={isLoading ? 'hidden' : 'block'}>
        <div id="receiptBody">
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
                    : <Check className='inline align-middle p-1 bg-success rounded-full text-background' />
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
              <ScrollArea className="h-[250px]" id='scrollArea'>
                <div className="space-y-2">
                  <ReadOnlyFormControl
                    label={'Customer name'}
                    value={`${firstName} ${lastName}`}
                  />
                  <ReadOnlyFormControl
                    label={'Customer email'}
                    value={`${email}`}
                  />
                  <ReadOnlyFormControl
                    label={'Receiver email'}
                    value={`${receiverEmail}`}
                  />
                  <ReadOnlyFormControl
                    label={'Receiver name'}
                    value={`${receiverFirstName} ${receiverLastName}`}
                  />
                  <ReadOnlyFormControl
                    label={'Receiver phone number'}
                    value={`${receiverPhoneNumber}`}
                  />
                  <ReadOnlyFormControl
                    label={'Shipping country'}
                    value={`${shippingCountry}`}
                  />
                  <ReadOnlyFormControl
                    label={'Shipping address'}
                    value={`${shippingAddress}`}
                  />
                  <ReadOnlyFormControl
                    label={'Shipping zip code'}
                    value={`${shippingZipCode}`}
                  />
                  <ReadOnlyFormControl
                    label={'Delivery'}
                    value={`${'Home delivery'}`}
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
                        <div className="flex h-full w-full ">
                          <div className="my-auto">
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
        </div>

        <DialogFooter className={'flex items-center mt-4'}>
          <Button onClick={downloadReceipt} className={'w-full'}>Download receipt</Button>
          <DialogClose asChild>
            <Button >Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

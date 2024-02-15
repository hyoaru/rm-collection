import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlignRight } from 'lucide-react'

// App imports
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@components/ui/dialog"
import useCancelOrder from '@hooks/orders/useCancelOrder'
import OrderReceiptDialogContent from '@components/shared/OrderReceiptDialogContent'
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl"
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { useToast } from '@components/ui/use-toast'
import revalidateAllData from '@services/shared/revalidateAllData'
import useCompleteOrder from '@hooks/orders/useCompleteOrder'

export default function OrderCard({ order }) {
  const { id: orderId, discount_rate: discountRate, total_price: totalPrice, discounted_price: discountedPrice, price, quantity, product_variants: productVariants } = order
  const { material, material_property: materialProperty, size, products } = productVariants || {}
  const { id: productId, name: productName } = products || {}
  const { order_status: { id: orderStatusId, label: orderStatusLabel } } = order
  const [receiptModalIsOpen, setReceiptModalIsOpen] = useState(false)
  const [cancelOrderModalIsOpen, setCancelOrderModalIsOpen] = useState(false)
  const { cancelOrder, isLoadingCancellation } = useCancelOrder()
  const { completeOrder, isLoadingCompletion } = useCompleteOrder()
  const { toast } = useToast()

  const imageSize = { width: 1000, height: 1000 }
  const orderThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: productId })

  function openReceiptModal() {
    setReceiptModalIsOpen(true)
  }

  function openCancelOrderModal() {
    setCancelOrderModalIsOpen(true)
  }

  async function commitCancelOrder() {
    await cancelOrder({ orderId: orderId })
      .then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          toast({
            title: "Order has been cancelled successfully.",
            description: "Changes should take effect immediately."
          })

          await revalidateAllData()
          setCancelOrderModalIsOpen(false)
        }
      })
  }

  async function commitCompleteOrder() {
    await completeOrder({ orderId: orderId })
      .then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          toast({
            title: "Order has been completed successfully.",
            description: "Changes should take effect immediately."
          })

          await revalidateAllData()
        }
      })
  }

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 right-0 z-[2] mt-2 me-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='rounded-lg bg-secondary p-2 cursor-pointer'>
                <AlignRight size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={'end'}>
              <DropdownMenuItem
                className={'text-xs'}
                onClick={openReceiptModal}
              >
                View receipt
              </DropdownMenuItem>
              {(['pending', 'to-ship'].includes(orderStatusLabel) && productVariants && products) && <>
                <DropdownMenuItem
                  className={'text-xs text-destructive data-[highlighted]:text-destructive'}
                  onClick={openCancelOrderModal}
                >
                  Cancel order
                </DropdownMenuItem>
              </>}
              {(orderStatusLabel === 'to-receive' && productVariants && products) && <>
                <DropdownMenuItem
                  className={'text-xs text-lime-700 data-[highlighted]:text-lime-700'}
                  onClick={commitCompleteOrder}
                  disabled={isLoadingCompletion}
                >
                  Received order
                </DropdownMenuItem>
              </>
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href={`/collection/product/${productId}`}>
          <div className="rounded-tl-xl rounded-br-xl overflow-hidden">
            <Image
              alt=''
              width={imageSize.width}
              height={imageSize.height}
              className={`hover:scale-105 transition-all duration-500 rounded-tl-xl rounded-br-xl`}
              src={orderThumbnailPublicUrl}
            />
          </div>
          <div className="sm:px-3 py-3 md:text-sm ">
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-8 space-y-1">
                <p className="text-sm font-semibold lg:text-xl ">{productName} : {material} {materialProperty} : {size}</p>

                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs items-center">
                  <Badge className={'lg:hidden'}>{`₱ ${discountedPrice.toLocaleString()}`}</Badge>
                  {discountRate > 0 && <>
                    <p className=" ">{`${discountRate}% off`}</p>
                    <p className="text-muted-foreground line-through">{`₱ ${price.toLocaleString()}`}</p>
                  </>}
                </div>
              </div>
              <div className="hidden lg:block col-span-12 lg:col-span-4 lg:self-center lg:justify-self-end">
                <div className="lg:text-end">
                  <Badge>{`₱ ${discountedPrice.toLocaleString()}`}</Badge>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div >

      <Dialog open={cancelOrderModalIsOpen} onOpenChange={setCancelOrderModalIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Cancelling your order at this point will result in the permanent removal of your request from our system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              size={'sm'}
              onClick={commitCancelOrder}
              disabled={isLoadingCancellation}
            >
              Cancel order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={receiptModalIsOpen} onOpenChange={setReceiptModalIsOpen}>
        <OrderReceiptDialogContent order={order} />
      </Dialog>
    </>
  )
}

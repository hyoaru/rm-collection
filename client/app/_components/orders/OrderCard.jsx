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
import revalidateAllData from '@/app/_services/shared/revalidateAllData'

export default function OrderCard({ order }) {
  const { id: orderId, discount_rate: discountRate, total_price: totalPrice, discounted_price: discountedPrice } = order
  const { price, quantity, product_variants: { material, material_property: materialProperty, products: { id: productId, name: productName } } } = order
  const { order_status: { id: orderStatusId, label: orderStatusLabel } } = order
  const [receiptModalIsOpen, setReceiptModalIsOpen] = useState(false)
  const [cancelOrderModalIsOpen, setCancelOrderModalIsOpen] = useState(false)
  const { cancelOrder, isLoading } = useCancelOrder()
  const { toast } = useToast()

  const size = { width: 1000, height: 1000 }
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
              {['pending', 'to-ship'].includes(orderStatusLabel) && <>
                <DropdownMenuItem
                  className={'text-xs text-destructive'}
                  onClick={openCancelOrderModal}
                >
                  Cancel order
                </DropdownMenuItem>
              </>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href={`/collection/product/${productId}`}>
          <div className="rounded-tl-xl rounded-br-xl overflow-hidden">
            <Image
              alt=''
              width={size.width}
              height={size.height}
              className={`hover:scale-105 transition-all duration-500 rounded-tl-xl rounded-br-xl`}
              src={orderThumbnailPublicUrl}
            />
          </div>
          <div className="sm:px-3 py-3 md:text-sm ">
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-8 space-y-1">
                <p className="text-sm font-semibold lg:text-xl ">{productName}: {material} - {materialProperty}</p>

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
      </div>

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

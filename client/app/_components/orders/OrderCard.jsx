import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// App imports
import getProductThumbnailPublicUrl from "@services/shared/getOrderThumbnailPublicUrl"
import { Badge } from '@components/ui/badge'

export default function OrderCard(props) {
  const { order, index } = props
  const { id: orderId, name: orderName, order_variants: orderVariants } = order

  const size = { width: 1000, height: 1000 }

  const orderThumbnailPublicUrl = getProductThumbnailPublicUrl({ orderId: order.id })
  const orderVariantsWithDiscountedPricesSorted = orderVariants.sort((x, y) => x.discounted_price - y.discounted_price)
  const lowestDiscountedOrderVariant = orderVariantsWithDiscountedPricesSorted[0]

  return (
    <>
      <Link href={`/collection/order/${orderId}`}>
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
            <div className="col-span-12 lg:col-span-9 space-y-1">
              <p className="lg:text-xl font-semibold">{orderName}</p>

              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs items-center">
                <Badge className={'lg:hidden'}>{`₱ ${lowestDiscountedOrderVariant.discounted_price.toLocaleString()}`}</Badge>
                {lowestDiscountedOrderVariant.discount_rate > 0 && <>
                  <p className=" ">{`${lowestDiscountedOrderVariant.discount_rate}% off`}</p>
                  <p className="text-muted-foreground line-through">{`₱ ${lowestDiscountedOrderVariant.price.toLocaleString()}`}</p>
                </>}
              </div>
            </div>
            <div className="hidden lg:block col-span-12 lg:col-span-3 lg:self-center lg:justify-self-end">
              <div className="lg:text-end">
                <Badge>{`₱ ${lowestDiscountedOrderVariant.discounted_price.toLocaleString()}`}</Badge>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

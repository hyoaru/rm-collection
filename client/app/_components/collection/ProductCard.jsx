import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// App imports
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl"
import getDiscountedPrice from '@lib/getDiscountedPrice'
import { Badge } from '@components/ui/badge'

export default function ProductCard(props) {
  const { product, index } = props
  const { id: productId, name: productName, product_variants: productVariants } = product

  const size = { width: 1000, height: 1000 }

  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: product.id })
  const productVariantsWithDiscountedPricesSorted = productVariants.map((productVariant) => {
    const discountedPrice = getDiscountedPrice({ originalPrice: productVariant.price, discountRate: productVariant.discount_rate })
    productVariant.discounted_price = discountedPrice
    return productVariant
  })
    .sort((x, y) => x.discounted_price - y.discounted_price)

  const lowestDiscountedProductVariant = productVariantsWithDiscountedPricesSorted[0]

  return (
    <>
      <Link href={`/collection/product/${productId}`}>
        <div className="rounded-tl-xl rounded-br-xl overflow-hidden">
          <Image
            alt=''
            width={size.width}
            height={size.height}
            className={`hover:scale-105 transition-all duration-500 rounded-tl-xl rounded-br-xl`}
            src={productThumbnailPublicUrl}
          />
        </div>
        <div className="sm:px-3 py-3 md:text-sm ">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-9 space-y-1">
              <p className="lg:text-xl font-semibold">{productName}</p>

              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs items-center">
                <Badge className={'lg:hidden'}>{`₱ ${lowestDiscountedProductVariant.discounted_price.toLocaleString()}`}</Badge>
                {lowestDiscountedProductVariant.discount_rate > 0 && <>
                  <p className=" ">{`${lowestDiscountedProductVariant.discount_rate}% off`}</p>
                  <p className="text-muted-foreground line-through">{`₱ ${lowestDiscountedProductVariant.price.toLocaleString()}`}</p>
                </>}
              </div>
            </div>
            <div className="hidden lg:block col-span-12 lg:col-span-3 lg:self-center lg:justify-self-end">
              <div className="lg:text-end">
                <Badge>{`₱ ${lowestDiscountedProductVariant.discounted_price.toLocaleString()}`}</Badge>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

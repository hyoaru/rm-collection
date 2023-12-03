import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// App imports
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl"

export default function SuggestionProductCard(props) {
  const { product, index } = props
  const { id: productId, name: productName, product_variants: productVariants } = product
  const size = { width: 300, height: 300 }

  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: product.id })
  const productVariantPrices = productVariants.map((productVariant) => productVariant.price)
  const lowestProductVariantPrice = Math.min(...productVariantPrices)

  return (
    <>
      <Link href={`/collection/product/${productId}`} className=''>
        <div className="rounded-tl-xl rounded-br-xl overflow-hidden">
          <Image
            alt=''
            width={size.width}
            height={size.height}
            style={{width: `${size.width}px`, height: `${size.height}px`}}
            className={`object-cover hover:scale-105 transition-all duration-500 rounded-tl-xl rounded-br-xl`}
            src={productThumbnailPublicUrl}
          />
        </div>
        <div className="p-3 flex flex-wrap text-xs md:text-sm">
          <span className="me-auto text-xs">{productName}</span>
          <span className="text-xs">{`₱ ${lowestProductVariantPrice.toLocaleString()}`}</span>
        </div>
      </Link>
    </>
  )
}

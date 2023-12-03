import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// App imports
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl"

export default function ProductCard(props) {
  const { product, index } = props
  const { id: productId, name: productName, product_variants: productVariants } = product
  const size = { width: 1000, height: 1000 }

  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: product.id })
  const productVariantPrices = productVariants.map((productVariant) => productVariant.price)
  const lowestProductVariantPrice = Math.min(...productVariantPrices)

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
        <div className="sm:px-3 py-3 flex flex-wrap text-xs md:text-sm">
          <span className="me-auto">{productName}</span>
          <span className="">{`₱ ${lowestProductVariantPrice.toLocaleString()}`}</span>
        </div>
      </Link>
    </>
  )
}

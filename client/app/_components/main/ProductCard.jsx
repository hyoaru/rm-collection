import React from 'react'
import Image from 'next/image'

// App imports
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl"

export default function ProductCard(props) {
  const { product, index } = props
  const { name: productName, product_variants: productVariants } = product
  const size = {width: 800, height: 800}

  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: product.id })
  const productVariantPrices = productVariants.map((productVariant) => productVariant.price)
  const lowestProductVariantPrice = Math.min(...productVariantPrices)

  return (
    <>
      <div>
        <Image
          alt=''
          width={size.width}
          height={size.height}
          className={`rounded-tl-xl rounded-br-xl`}
          src={productThumbnailPublicUrl}
        />
        <div className="py-2 flex">
          <span className="text-md me-auto">{productName}</span>
          <span className="text-md">{lowestProductVariantPrice.toLocaleString()}</span>
        </div>
      </div>
    </>
  )
}

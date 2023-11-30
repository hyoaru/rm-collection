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
      <div className=''>
        <Image
          alt=''
          width={size.width}
          height={size.height}
          className={`rounded-tl-xl rounded-br-xl`}
          src={productThumbnailPublicUrl}
        />
        <div className="p-3 flex flex-wrap text-xs md:text-sm">
          <span className="me-auto">{productName}</span>
          <span className="">{`₱ ${lowestProductVariantPrice.toLocaleString()}`}</span>
        </div>
      </div>
    </>
  )
}

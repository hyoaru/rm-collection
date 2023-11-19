import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'
import updateProductVariantImages from '@services/admin/operations/updateProductVariantImages'

export default function useUpdateProductVariant() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updateProductVariant(props) {
    const TABLE_NAME = 'product_variants'
    const { productId, variantId, price, quantity, material, materialProperty, images } = props

    setIsLoading(true)

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        price: price,
        quantity: quantity,
        material: material,
        material_property: materialProperty
      })
      .eq('id', variantId)
      .select()
      .then(async ({ data: updateProductVariantData, error: updateProductVariantError }) => {
        if (images[0]) {
          const { data, error } = await updateProductVariantImages({
            productId: productId,
            variantId: variantId,
            images: images
          })
          return { data, error }
        }

        return { data: updateProductVariantData, error: updateProductVariantError }
      })

    setIsLoading(false)

    return { data, error }
  }

  return { updateProductVariant, isLoading }
}

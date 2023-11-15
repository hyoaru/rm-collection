import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'
import uploadProductVariantImages from '@services/admin/operations/uploadProductVariantImages'
import { default as addNewProductVariant } from '@services/admin/operations/addProductVariant'

export default function useAddProductVariant() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function addProductVariant(props) {
    const { productId, material, materialProperty, quantity, price, images } = props

    setIsLoading(true)

    const { data, error } = await addNewProductVariant({
      productId: productId,
      material: material,
      materialProperty: materialProperty,
      quantity: quantity,
      price: price,
    }).then(async ({ data: addProductVariantData, error: addProductVariantError }) => {
      if (addProductVariantError) {
        return { addProductVariantData, addProductVariantError }
      }

      console.log(addProductVariantData)

      const productId = addProductVariantData[0].product_id
      const variantId = addProductVariantData[0].id

      const { data, error } = await uploadProductVariantImages({
        images: images,
        productId: productId,
        variantId: variantId
      })

      return { data, error }
    })

    setIsLoading(false)

    return { data, error }
  }

  return { addProductVariant, isLoading }
}

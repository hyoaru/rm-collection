import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'
import uploadProductVariantImages from '@services/admin/operations/uploadProductVariantImages'
import uploadProductThumbnail from '@services/admin/operations/uploadProductThumbnail'
import addProductVariant from '@services/admin/operations/addProductVariant'

export default function useAddProduct() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function addProduct(props) {
    const { thumbnail, images, name, category, quantity } = props
    const { material, materialProperty, description } = props

    setIsLoading(true)

    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: name,
        description: description,
        category: category
      }])
      .select()
      .then(async ({ data: addProductData, error: addProductError }) => {
        if (addProductError) {
          return { addProductData, addProductError }
        }

        const { data, error } = await addProductVariant({
          productId: addProductData[0].id,
          material: material,
          materialProperty: materialProperty,
          quantity: quantity
        })

        return { data, error }
      })
      .then(async ({ data: addProductVariantsData, error: addProductVariantsError }) => {
        if (addProductVariantsError) {
          return { addProductVariantsData, addProductVariantsError }
        }

        const productId = addProductVariantsData[0].product_id
        const variantId = addProductVariantsData[0].id

        const { data, error } = await uploadProductVariantImages({
          images: images,
          productId: productId,
          variantId: variantId
        })
          .then(async ({ data: uploadProductVariantImagesData, error: uploadProductVariantImagesError }) => {
            if (uploadProductVariantImagesError) {
              return { uploadProductVariantImagesData, uploadProductVariantImagesError }
            }

            const { data, error } = await uploadProductThumbnail({
              thumbnail: thumbnail,
              productId: productId
            })

            return { data, error }

          })

        return { data, error }
      })

    setIsLoading(false)

    return { response: { data, error } }
  }

  return { addProduct, isLoading }
}

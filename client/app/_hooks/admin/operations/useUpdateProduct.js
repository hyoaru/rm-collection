import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'
import updateProductThumbnail from '@/app/_services/admin/operations/updateProductThumbnail'

export default function useUpdateProduct() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updateProduct(props) {
    const { id, name, category, description, thumbnail } = props

    setIsLoading(true)

    const { data, error } = await supabase
      .from('products')
      .update({ name: name, category: category, description: description })
      .eq('id', id)
      .select()
      .then(async ({ data: updateProductData, error: updateProductError }) => {
        if (updateProductError) {
          return { updateProductData, updateProductError }
        }

        const { data, error } = await updateProductThumbnail({
          thumbnail: thumbnail,
          productId: id,
          productCategory: category
        })

        return { data, error }
      })

    setIsLoading(false)

    return { data, error }
  }

  return { updateProduct, isLoading }
}

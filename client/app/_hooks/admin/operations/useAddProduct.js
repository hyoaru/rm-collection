import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@/app/_services/supabase/getBrowserClient'

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

        const { data, error } = await supabase
          .from('product_variants')
          .insert([{
            product_id: addProductData?.[0].id,
            material: material,
            material_property: materialProperty,
            quantity: quantity
          }])
          .select()

        return { data, error }
      })

    setIsLoading(false)

    return { data, error }
  }

  return { addProduct, isLoading }
}

import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'
import updateCartItemQuantity from '@services/collection/updateCartItemQuantity'

export default function useAddToCart() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function addToCart(props) {
    const TABLE_NAME = 'cart'
    const { userId, productVariantId, quantity } = props

    
    let { count } = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .eq('product_variant_id', productVariantId)

    if (count >= 1) {
      return { data: null, error: null }
    }
    
    setIsLoading(true)
    
    let { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert([{ user_id: userId, product_variant_id: productVariantId, quantity: quantity }])
      .select()
      .then(async ({ data: insertData, error: insertError }) => {
        if (insertError?.code === '23505') {
          const { data, error } = await updateCartItemQuantity({
            userId: userId,
            productVariantId: productVariantId,
            quantity: quantity
          })

          return { data, error }
        }

        return { data: insertData, error: insertError }
      })

    setIsLoading(false)

    return { data, error }
  }

  return { addToCart, isLoading }
}

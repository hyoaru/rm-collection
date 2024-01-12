import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useCheckoutOrder() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function checkoutOrder(props) {
    const TABLE_NAME = 'orders'
    const { userId, cartItems, shippingAddress } = props
    let response = { data: null, error: null }

    setIsLoading(true)

    for await (const cartItem of cartItems) {
      let { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([{
          user_id: userId,
          product_variant_id: cartItem.product_variant_id,
          quantity: cartItem.quantity,
          shipping_address: shippingAddress
        }])
        .select()
        .then(async ({ data: orderInsertData, error: orderInsertError }) => {
          if (orderInsertError) {
            return { data: orderInsertData, error: orderInsertError }
          }

          const productVariantQuantityAfterCheckout = cartItem?.product_variants?.quantity - cartItem.quantity
          const productVariantVisibilityAfterCheckout = productVariantQuantityAfterCheckout > 0

          const { data, error } = await supabase
            .from('product_variants')
            .update({
              quantity: productVariantQuantityAfterCheckout,
              is_displayed: productVariantVisibilityAfterCheckout
            })
            .eq('id', cartItem?.product_variants?.id)
            .select()

          return { data, error }
        })
        .then(async ({ data: updateProductVariantData, error: updateProductVariantError }) => {
          if (updateProductVariantError) {
            return { data: updateProductVariantData, error: updateProductVariantError }
          }

          const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('id', cartItem.id)

          return { data, error }
        })

      response.data = data
      response.error = error
    }

    setIsLoading(false)
    return response
  }

  return { checkoutOrder, isLoading }
}

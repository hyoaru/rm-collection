import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useCheckoutOrder() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function checkoutOrder(props) {
    const { userId, cartItems, shippingAddress, receiverEmail, receiverFirstName } = props
    const { receiverLastName, shippingZipCode, receiverPhoneNumber, shippingCountry } = props

    const TABLE_NAME = 'orders'
    let response = { data: null, error: null }

    setIsLoading(true)
    const orderList = []

    for await (const cartItem of cartItems) {
      let { data, error } = await supabase
        .from('orders_shipping')
        .insert([{
          user_id: userId,
          receiver_email: receiverEmail,
          receiver_first_name: receiverFirstName,
          receiver_last_name: receiverLastName,
          receiver_phone_number: receiverPhoneNumber,
          shipping_country: shippingCountry,
          shipping_address: shippingAddress,
          shipping_zip_code: shippingZipCode
        }])
        .select('id')
        .single()
        .then(async ({ data: orderShippingData, error: orderShippingError }) => {
          if (orderShippingError) {
            return { data: orderShippingData, error: orderShippingError }
          }

          console.log(orderShippingData)

          const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert([{
              user_id: userId,
              order_shipping_id: orderShippingData.id,
              product_variant_id: cartItem.product_variant_id,
              quantity: cartItem.quantity,
              price: cartItem?.product_variants?.price,
              discount_rate: cartItem?.product_variants?.discount_rate,
            }])
            .select(`*, product_variants(*, products(*)), order_status(*), users(*), orders_shipping(*)`)

          return { data, error }
        })
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

          return { data: orderInsertData, error }
        })
        .then(async ({ data: orderInsertData, error: updateProductVariantError }) => {
          if (updateProductVariantError) {
            return { data: orderInsertData, error: updateProductVariantError }
          }

          const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('id', cartItem.id)

          orderList.push(...orderInsertData)
          return { data: orderInsertData, error }
        })

      response.data = data
      response.error = error
    }

    response.data = orderList
    setIsLoading(false)
    return response
  }

  return { checkoutOrder, isLoading }
}

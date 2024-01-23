import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useCancelOrder() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function cancelOrder({ orderId }) {
    const TABLE_NAME = 'orders'

    setIsLoading(true)

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({ status_id: 0 })
      .eq('id', orderId)
      .select(`*, product_variants(*, products(*))`)
      .single()
      .then(async ({ data: orderUpdateData, error: orderUpdateError }) => {
        if (orderUpdateError) {
          return { data: orderUpdateData, error: orderUpdateError }
        }

        const postCancellationProductVariantQuantity = (
          orderUpdateData?.product_variants?.quantity
          + orderUpdateData?.quantity
        )

        const { data, error } = await supabase
          .from('product_variants')
          .update({ quantity: postCancellationProductVariantQuantity })
          .eq('id', orderUpdateData?.product_variants.id)
          .select()

        return { data, error }
      })

    setIsLoading(false)

    return { data, error }
  }

  return { cancelOrder, isLoading }
}

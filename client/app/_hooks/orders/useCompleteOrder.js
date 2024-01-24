import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useCompleteOrder() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function completeOrder({ orderId }) {
    const TABLE_NAME = 'orders'

    setIsLoading(true)

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({ status_id: 5 })
      .eq('id', orderId)
      .select(`*, product_variants(*, products(*))`)
      .single()

    setIsLoading(false)

    return { data, error }
  }

  return { completeOrder, isLoading }
}

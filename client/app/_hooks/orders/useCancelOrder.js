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
      .select()

    setIsLoading(false)

    return { data, error }
  }

  return { cancelOrder, isLoading }
}

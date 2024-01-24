"use server"

import { getServerClient } from "@services/supabase/getServerClient"
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"

export default async function setOrderStatusById(orderId, statusId) {
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from('orders')
    .update({ status_id: statusId })
    .eq('id', orderId)
    .select(`*, order_status(*), product_variants(*, products(*))`)
    .single()
    .then(async ({ data: updateOrderStatusData, error: updateOrderStatusError }) => {
      if (updateOrderStatusError) {
        return { data: updateOrderStatusData, error: updateOrderStatusError }
      }

      if (['cancelled-by-user', 'cancelled-by-management'].includes(updateOrderStatusData.order_status.label)) {
        const postCancellationProductVariantQuantity = (
          updateOrderStatusData?.product_variants.quantity
          + updateOrderStatusData.quantity
        )

        const { data, error } = await supabase
          .from('product_variants')
          .update({ quantity: postCancellationProductVariantQuantity })
          .eq('id', updateOrderStatusData?.product_variants.id)
          .select()

        return {data: updateOrderStatusData, error: error}
      }

      return { data: updateOrderStatusData, error: updateOrderStatusError }
    })

  return { data, error: processErrorToCrossSideSafe(error) }
}
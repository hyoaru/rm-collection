"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import getOrdersByGroupServer from "@services/shared/getOrdersByGroupServer";

export default async function cancelOrderGroup(orderGroup: string) {
  const supabase = getServerClient();

  const { data, error } = await getOrdersByGroupServer(orderGroup).then(
    async ({ data: ordersByGroupData, error: ordersByGroupError }) => {
      if (ordersByGroupError || !ordersByGroupData) {
        return { data: ordersByGroupData, error: ordersByGroupError };
      }

      let response;
      for await (const order of ordersByGroupData) {
        const productVariantId = order.product_variant_id;
        const orderQuantity = order.quantity;
        const productVariantQuantity = order.product_variants?.quantity;

        const { data, error } = await supabase
          .from("product_variants")
          .update({ quantity: productVariantQuantity! + orderQuantity })
          .eq("id", productVariantId!)
          .select()
          .single();

        response = { data, error };
      }
      
      return { data: response?.data, error: response?.error };
    }
  );

  return { data, error: processErrorToCrossSideSafe(error) };
}

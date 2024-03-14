"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type AddOrderParams = {
  userId: string;
  orderShippingId: string;
  productVariantId: string;
  quantity: number;
  price: number;
  discountRate: number;
};

export default async function addOrder({
  userId,
  orderShippingId,
  productVariantId,
  quantity,
  price,
  discountRate,
}: AddOrderParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .insert([{
      user_id: userId,
      order_shipping_id: orderShippingId,
      product_variant_id: productVariantId,
      quantity: quantity,
      price: price,
      discount_rate: discountRate,
    }])
    .select(`*, product_variants(*, products(*)), order_status(*), users(*), orders_shipping(*)`)
    .single()

  return { data, error: processErrorToCrossSideSafe(error) }
}

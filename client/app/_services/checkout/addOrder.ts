"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type AddOrderParams = {
  userId: string;
  orderShippingId: string;
  orderBillingId: string;
  productVariantId: string;
  quantity: number;
  price: number;
  discountRate: number;
  orderGroup: string
};

export default async function addOrder({
  userId,
  orderShippingId,
  orderBillingId,
  productVariantId,
  quantity,
  price,
  discountRate,
  orderGroup
}: AddOrderParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .insert([{
      user_id: userId,
      order_shipping_id: orderShippingId,
      order_billing_id: orderBillingId,
      product_variant_id: productVariantId,
      quantity: quantity,
      price: price,
      discount_rate: discountRate,
      order_group: orderGroup
    }])
    .select(`*, product_variants(*, products(*)), order_status(*), users(*), orders_shipping(*)`)
    .single()

  return { data, error: processErrorToCrossSideSafe(error) }
}

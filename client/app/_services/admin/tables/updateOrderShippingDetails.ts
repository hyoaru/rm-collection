"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type UpdateOrderShippingDetailsParams = {
  shippingId: string;
  shippingCourier: string;
  shippingTrackingId: string;
  shippingFee: number;
};

export async function updateOrderShippingDetails({
  shippingId,
  shippingCourier,
  shippingFee,
  shippingTrackingId,
}: UpdateOrderShippingDetailsParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders_shipping")
    .update({
      shipping_courier: shippingCourier,
      shipping_tracking_id: shippingTrackingId,
      shipping_fee: shippingFee,
    })
    .eq("id", shippingId)
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

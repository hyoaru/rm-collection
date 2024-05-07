import { getBrowserClient } from "@services/supabase/getBrowserClient";
import syncOrderBillingMayaPaymentStatus from "@services/shared/syncOrderBillingMayaPaymentStatus";

export default async function getOrdersByGroup(orderGroup: string) {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`*, users(*), order_status(*), product_variants(*, products(*)), orders_shipping(*), orders_billing(*)`)
    .eq("order_group", orderGroup)
    .order("created_at", { ascending: false });

  const orderBillingId = data?.[0].order_billing_id;
  const orderBillingCheckoutId = data?.[0].orders_billing?.checkout_id;

  if (orderBillingId && orderBillingCheckoutId) {
    await syncOrderBillingMayaPaymentStatus({
      id: orderBillingId,
      checkoutId: orderBillingCheckoutId,
    });
  }

  return { data, error };
}

import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getProductVariantOngoingOrdersCount(variantId: string) {
  const supabase = getBrowserClient();

  const { count, error } = await supabase
    .from("product_variants")
    .select(`id, orders!inner(order_status!inner(label))`, { count: "exact", head: true })
    .in("orders.order_status.label", ["pending", "to-ship", "to-receive"])
    .eq("id", variantId);

  return { count, error };
}

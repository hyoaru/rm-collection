import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getProductOngoingOrdersCount(productId: string) {
  const supabase = getBrowserClient();

  const { count, error } = await supabase
    .from("products")
    .select(`id, product_variants!inner(id, orders!inner(order_status!inner(label)))`, { count: "exact", head: true })
    .in("product_variants.orders.order_status.label", ["pending", "to_ship", "to_receive"])
    .eq("id", productId);

  return { count, error };
}

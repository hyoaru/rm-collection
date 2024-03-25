import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getOrdersByGroup(orderGroup: string) {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`*, users(*), order_status(*), product_variants(*, products(*)), orders_shipping(*)`)
    .eq("order_group", orderGroup)
    .order("created_at", { ascending: false });

  return { data, error };
}

import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getAllOrders() {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`*, users(*), order_status(*), product_variants(*, products(*)), orders_shipping(*)`)
    .order("created_at", { ascending: true });

  return { data, error };
}

'use server'

import { getServerClient } from "@services/supabase/getServerClient";

export default async function getOrdersByGroupServer(orderGroup: string) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`*, users(*), order_status(*), product_variants(*, products(*)), orders_shipping(*)`)
    .eq("order_group", orderGroup)
    .order("created_at", { ascending: false });

  return { data, error };
}

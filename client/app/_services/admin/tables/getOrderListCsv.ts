import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getOrderListCsv() {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .csv()

  return { data, error };
}

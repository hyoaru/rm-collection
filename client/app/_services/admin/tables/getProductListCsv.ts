import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getProductListCsv() {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .csv()

  return { data, error };
}

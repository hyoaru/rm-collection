import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getLatestProducts() {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, product_variants!inner(*)")
    .order("created_at", { ascending: false })
    .limit(20);

  return { data, error };
}

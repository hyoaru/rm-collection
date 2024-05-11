import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getProductPostingListCsv() {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("is_displayed", true)
    .order("created_at", { ascending: false })
    .csv();

  return { data, error };
}

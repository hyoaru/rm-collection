import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getRandomProductsByProductId(productId: string) {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select(`*, product_variants(*)`)
    .lt("id", productId)
    .limit(4);

  return { data, error };
}

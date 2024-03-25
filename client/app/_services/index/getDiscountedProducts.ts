import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getDiscountedProducts() {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select(`*, product_variants!inner(*)`)
    .gt('product_variants.discount_rate', 0)
    .order("discount_rate", { referencedTable: 'product_variants' ,ascending: false })
    .limit(20);

  return { data, error };
}

import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getProductVariantListCsv() {
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .csv()

  return { data, error }
}
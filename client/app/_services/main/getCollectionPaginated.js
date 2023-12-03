import { getBrowserClient } from "@services/supabase/getBrowserClient";
import { getPagination } from "@constants/collection/base";

export default async function getCollectionPaginated({ page }) {
  const supabase = getBrowserClient()
  const { from, to, itemsPerPage } = getPagination({ page })

  const { data, error, count } = await supabase
    .from('products')
    .select(`*, product_variants(*)`)
    .eq('product_variants.is_displayed', true)
    .order('name', { ascending: true })
    .range(from, to)
    .then(async ({ data: collectionData, error: collectionError }) => {
      if (collectionError) {
        return { data: collectionData, error: collectionError }
      }

      const { count, error } = await supabase
        .from('products')
        .select(`*, product_variants(*)`, { count: 'exact', head: true })
        .eq('product_variants.is_displayed', true)
      
      return {data: collectionData, error, count}
    })

  const endPage = Math.ceil(count / itemsPerPage) - 1

  return { data, error, count, endPage }
}
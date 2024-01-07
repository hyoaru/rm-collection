'use server'

import { getServerClient } from "@services/supabase/getServerClient";
import { getPagination } from "@constants/collection/base";
import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe";

export default async function getCollectionByCategoryPaginated({ category, page }) {
  const supabase = await getServerClient()
  const { from, to, itemsPerPage } = getPagination({ page })

  const { data, error, count } = await supabase
    .from('products')
    .select(`*, product_variants!inner(*)`)
    .eq('category', category)
    .eq('product_variants.is_displayed', true)
    .order('name', { ascending: true })
    .range(from, to)
    .then(async ({ data: collectionData, error: collectionError }) => {
      if (collectionError) {
        return { data: collectionData, error: collectionError }
      }

      const { count, error } = await supabase
        .from('products')
        .select(`*, product_variants!inner(*)`, { count: 'exact', head: true })
        .eq('category', category)
        .eq('product_variants.is_displayed', true)
      
      return {data: collectionData, error, count}
    })

  const endPage = Math.ceil(count / itemsPerPage) - 1

  return { data, error: processErrorToCrossSideSafe(error), count, endPage }
}
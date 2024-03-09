import { ProductCategoryType } from "@constants/base/types";
import getPagination from "@lib/getPagination";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

type GetCollectionPaginatedParams = {
  pageParam: number;
  category: ProductCategoryType;
};

export default async function getCollectionPaginated({ pageParam: page = 0, category }: GetCollectionPaginatedParams) {
  const supabase = getBrowserClient();
  const { from, to, itemsPerPage } = getPagination({ page: page });

  const query = supabase
    .from("products")
    .select(`*, product_variants!inner(*)`, { count: "exact" })
    .eq("product_variants.is_displayed", true)
    .order("name", { ascending: true })
    .range(from, to);

  switch (category) {
    case "all":
      break;
    default:
      query.eq("category", category);
      break;
  }

  const { data, error, count } = await query;
  const endPage = Math.ceil((count ?? itemsPerPage) / itemsPerPage) - 1;
  
  return { data, error, page: page, endPage };
}

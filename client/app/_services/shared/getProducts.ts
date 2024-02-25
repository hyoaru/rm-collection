import { getBrowserClient } from "@services/supabase/getBrowserClient";
import { ProductCategoryType } from "@constants/base/types";

type GetProductsParams = {
  category: ProductCategoryType;
};

export default async function getProducts({ category }: GetProductsParams) {
  const supabase = getBrowserClient();

  const query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  switch (category) {
    case "all":
      break;
    default:
      query.eq("category", category);
      break;
  }

  const { data, error } = await query;
  return { data, error };
}

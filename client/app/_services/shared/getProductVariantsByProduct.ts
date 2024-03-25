import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

type GetProductVariantsByProductParams = {
  productId: string;
  visibility?: "displayed" | "hidden" | "all";
};

export default async function getProductVariantsByProduct({
  productId,
  visibility = "all",
}: GetProductVariantsByProductParams) {
  const supabase = getBrowserClient();

  const query = supabase
    .from("product_variants")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("product_id", productId);

  switch (visibility) {
    case "displayed":
      query.eq("is_displayed", true);
    case "hidden":
      query.eq("is_displayed", false);
    default:
      break;
  }

  const { data, error } = await query;

  return { data, error: processErrorToCrossSideSafe(error) };
}

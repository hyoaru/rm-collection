import { getBrowserClient } from "@services/supabase/getBrowserClient";
import { ProductVariantVisibilityType } from "@constants/base/types";

type GetProductVariantsParams = {
  visibility?: ProductVariantVisibilityType;
  productId?: string
};

export default async function getProductVariants({ visibility, productId }: GetProductVariantsParams) {
  const supabase = getBrowserClient()

  const query = supabase
    .from('product_variants')
    .select('*')
    .order('created_at', { ascending: false })

  switch (visibility) {
    case "shown":
      query.eq('is_displayed', true)
      break;
    case "hidden":
      query.eq('is_displayed', false)
    default:
      break;
  }

  if (productId) {
    query.eq('product_id', productId)
  }

  const { data, error } = await query
  return { data, error }
}


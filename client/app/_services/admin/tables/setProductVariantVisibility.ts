"use server";

import { getServerClient } from "@services/supabase/getServerClient";

type SetProductVariantVisibilityParams = {
  isVisible: boolean;
  variantId: string;
};

export default async function setProductVariantVisibility({
  isVisible,
  variantId,
}: SetProductVariantVisibilityParams) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('product_variants')
    .update({ 'is_displayed': isVisible })
    .eq('id', variantId)
    .select()
    .single()

  return { data, error }
}

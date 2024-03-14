"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type UpdateProductVariantAvailabilityParams = {
  productVariantId: string;
  quantity: number;
  isDisplayed: boolean;
};

export default async function updateProductVariantAvailability({
  productVariantId,
  quantity,
  isDisplayed,
}: UpdateProductVariantAvailabilityParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("product_variants")
    .update({
      quantity: quantity,
      is_displayed: isDisplayed,
    })
    .eq("id", productVariantId)
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

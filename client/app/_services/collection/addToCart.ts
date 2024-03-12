"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type AddToCartParams = {
  userId: string;
  variantId: string;
  quantity: number;
};

export default async function addToCart({ userId, variantId, quantity }: AddToCartParams) {
  const supabase = getServerClient();

  let { count } = await supabase
    .from("cart")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .eq("product_variant_id", variantId);

  if (count && count >= 1) {
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("cart")
    .upsert([{
      user_id: userId,
      product_variant_id: variantId,
      quantity: quantity,
    }])
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

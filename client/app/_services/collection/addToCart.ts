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

  // Check if cart items is less than nine
  const { count: cartItems } = await supabase.from("cart").select("*", { count: "exact" });
  if (cartItems && cartItems >= 3) {
    return { data: null, error: { message: "You can only have a max of nine items in cart." } };
  }

  // Check if product variant instance is already in cart
  const { count: productVariantInstanceCount } = await supabase
    .from("cart")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .eq("product_variant_id", variantId);

  if (productVariantInstanceCount && productVariantInstanceCount >= 1) {
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("cart")
    .upsert([
      {
        user_id: userId,
        product_variant_id: variantId,
        quantity: quantity,
      },
    ])
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

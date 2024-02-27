"use server";

import { getServerClient } from "@services/supabase/getServerClient";

type UpdateProductVariantParams = {
  id: string
  material: string;
  materialProperty: string;
  size: string | null;
  weight: string | null;
  quantity: number;
  price: number;
  discountRate: number;
};

export default async function updateProductVariant({ 
  id,
  material,
  materialProperty,
  size,
  weight,
  quantity,
  price,
  discountRate,
}: UpdateProductVariantParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("product_variants")
    .update({
      material: material,
      material_property: materialProperty,
      size: size,
      weight: weight,
      quantity: quantity,
      price: price,
      discount_rate: discountRate,
    })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

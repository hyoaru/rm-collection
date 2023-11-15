import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function addProductVariant({ productId, material, materialProperty, quantity, price }) {
  const TABLE_NAME = 'product_variants'
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      product_id: productId,
      material: material,
      material_property: materialProperty,
      quantity: quantity,
      price: price
    }])
    .select()

  return { data, error }
}
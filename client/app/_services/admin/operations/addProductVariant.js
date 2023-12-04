import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function addProductVariant({ productId, material, materialProperty, quantity, price, discountRate }) {
  const TABLE_NAME = 'product_variants'
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      product_id: productId,
      material: material,
      material_property: materialProperty,
      quantity: quantity,
      price: price,
      discount_rate: discountRate
    }])
    .select()

  return { data, error }
}
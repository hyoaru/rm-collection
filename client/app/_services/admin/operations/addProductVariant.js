'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function addProductVariant({ productId, material, materialProperty, quantity, size, price, discountRate }) {
  const TABLE_NAME = 'product_variants'
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      product_id: productId,
      material: material,
      material_property: materialProperty,
      size: size,
      quantity: quantity,
      price: price,
      discount_rate: discountRate
    }])
    .select()

  return { data, error: processErrorToCrossSideSafe(error) }
}
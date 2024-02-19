"use server"

import { getServerClient } from "@services/supabase/getServerClient"
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"

type AddProductVariantParams = {
  product: { id: string }
  productVariant: {
    material: string
    materialProperty: string
    size: string | null
    quantity: number
    price: number
    discountRate: number
  }
}

export default async function addProductVariant({ product, productVariant }: AddProductVariantParams) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('product_variants')
    .insert([{
      product_id: product.id,
      material: productVariant.material,
      material_property: productVariant.materialProperty,
      size: productVariant.size,
      quantity: productVariant.quantity,
      price: productVariant.price,
      discount_rate: productVariant.discountRate
    }])
    .select()
    .single()

  return { data, error: processErrorToCrossSideSafe(error) }
}
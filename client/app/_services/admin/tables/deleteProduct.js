"use server"

// App imports
import { getServerClient } from "@services/supabase/getServerClient"

export default async function deleteProduct(productId) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('product_variants')
    .delete()
    .eq('product_id', productId)
    .then(async ({ data: deleteProductVariantData, error: deleteProductVariantError }) => {
      if (deleteProductVariantError) {
        return { deleteProductVariantData, deleteProductVariantError }
      }
      
      const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        
      return { data, error }
    })

  return { data, error }
}
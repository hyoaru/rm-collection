'use server'

import { getServerClient } from "@services/supabase/getServerClient";
import getProductVariantImagesPublicUrl from "@services/shared/getProductVariantImagesPublicUrl";
import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe";

export default async function getProductById({ productId }) {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_variants(*)`)
    .eq('id', productId)
    .single()
    .then(async ({ data, error }) => {
      if (error) {
        return { data, error }
      }

      
      for await (const productVariant of data.product_variants) {
        const productVariantImagesPublicUrl = await getProductVariantImagesPublicUrl({
          productId: data.id, variantId: productVariant.id
        })

        productVariant.images_public_url = productVariantImagesPublicUrl
      }

      return { data, error }
    })


  return { data, error: processErrorToCrossSideSafe(error) }
}

import { getBrowserClient } from "@services/supabase/getBrowserClient";
import getProductVariantImagesPublicUrl from "@services/shared/getProductVariantImagesPublicUrl";

export default async function getProductById({ productId }) {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_variants(*)`)
    .eq('id', productId)
    .single()
    .then(async ({ data, error }) => {
      for await (const productVariant of data.product_variants) {
          const productVariantImagesPublicUrl = await getProductVariantImagesPublicUrl({
            productId: data.id, variantId: productVariant.id
          })

          productVariant.images_public_url = productVariantImagesPublicUrl
      }

      return { data, error }
    })


  return { data, error }
}

import { getBrowserClient } from "@services/supabase/getBrowserClient";
import getProductVariantImagesPublicUrl from "@services/shared/getProductVariantImagesPublicUrl";
import { Tables } from "@constants/base/database-types";

type TransformedProductVariantType = Tables<'product_variants'> & {images_public_url?: string[]}
type TransformedProductType = Tables<'products'> & {product_variants: TransformedProductVariantType[]}

export default async function getProductById(productId: string) {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select(`*, product_variants(*)`)
    .eq("id", productId)
    .single()
    .then(async ({data, error}) => {
      if (error || !data) {
        return {data, error}
      }

      for await (const productVariant of data.product_variants as TransformedProductVariantType[]) {
        const productVariantImagesPublicUrl = await getProductVariantImagesPublicUrl({
          productId: data.id, variantId: productVariant.id
        })

        productVariant.images_public_url = productVariantImagesPublicUrl
      }

      const transformedData: TransformedProductType = {...data}
      return { data: transformedData, error }
    })

  return { data, error };
}

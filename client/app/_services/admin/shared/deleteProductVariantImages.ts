import { getBrowserClient } from "@services/supabase/getBrowserClient"

type DeleteProductVariantImagesParams = {
  productId: string;
  variantId: string;
}

export default async function deleteProductVariantImages({ productId, variantId }: DeleteProductVariantImagesParams) {
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .storage
    .from('products')
    .list(`${productId}/${variantId}`, {
      limit: 4,
      offset: 0,
      sortBy: { column: 'created_at', order: 'asc' }
    })
    .then(async ({ data: imagesListData, error: imagesListError }) => {
      if (imagesListError) {
        return { data: imagesListData, error: imagesListError }
      }

      const oldProductVariantImagesPaths = imagesListData?.map((imageFile) => (
        `${productId}/${variantId}/${imageFile.name}`
      ))

      const { data, error } = await supabase
        .storage
        .from('products')
        .remove(oldProductVariantImagesPaths)

      return { data, error }
    })

  return { data, error }
}
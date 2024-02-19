import { getBrowserClient } from "@services/supabase/getBrowserClient"

type DeleteProductVariantImagesParams = {
  product: { id: string }
  productVariant: { id: string }
}

export default async function deleteProductVariantImages({ product, productVariant }: DeleteProductVariantImagesParams) {
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .storage
    .from('products')
    .list(`${product.id}/${productVariant.id}`, {
      limit: 4,
      offset: 0,
      sortBy: { column: 'created_at', order: 'asc' }
    })
    .then(async ({ data: imagesListData, error: imagesListError }) => {
      if (imagesListError) {
        return { data: imagesListData, error: imagesListError }
      }

      const oldProductVariantImagesPaths = imagesListData?.map((imageFile) => (
        `${product.id}/${productVariant.id}/${imageFile.name}`
      ))

      const { data, error } = await supabase
        .storage
        .from('products')
        .remove(oldProductVariantImagesPaths)

      return { data, error }
    })

  return { data, error }
}
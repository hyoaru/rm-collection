import { getBrowserClient } from "@services/supabase/getBrowserClient";
import uploadProductVariantImages from "@services/admin/operations/uploadProductVariantImages";

export default async function updateProductVariantImages({ productId, variantId, images }) {
  const BUCKET_NAME = 'products'
  const supabase = getBrowserClient()

  let oldProductVariantImages = []

  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME)
    .list(`${productId}/${variantId}`, {
      limit: 4,
      offset: 0,
      sortBy: { column: 'created_at', order: 'asc' },
    })
    .then(async ({ data: imagesListData, error: imagesListError }) => {
      imagesListData.forEach((imageFile) => {
        oldProductVariantImages.push(`${productId}/${variantId}/${imageFile?.name}`)
      })

      const { data, error } = await supabase
        .storage
        .from(BUCKET_NAME)
        .remove(oldProductVariantImages)

      return { data, error }
    })
    .then(async ({ data: deleteOldImagesData, deleteOldImagesError }) => {
      if (deleteOldImagesError) {
        return { data: deleteOldImagesData, error: deleteOldImagesError }
      }

      const { data, error } = await uploadProductVariantImages({
        images: images,
        productId: productId,
        variantId: variantId
      })


      return { data, error }
    })

  return { data, error }
}
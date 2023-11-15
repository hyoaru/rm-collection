import { getBrowserClient } from "@services/supabase/getBrowserClient"
import { resizeImage } from "@lib/resizeImage"

export default async function updateProductThumbnail({ thumbnail, productCategory, productId }) {
  const BUCKET_NAME = 'products'
  const supabase = getBrowserClient()

  const imageFile = thumbnail[0]
  const imageFileName = 'thumbnail.jpeg'
  const compressedImageFile = await resizeImage(imageFile)

  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME)
    .update(`${productCategory}/${productId}/${imageFileName}`, compressedImageFile, {
      cacheControl: '3600',
      upsert: true
    })

  return { data, error }
}
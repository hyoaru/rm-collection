import { resizeImage } from "@lib/resizeImage"
import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function uploadProductThumbnail({ thumbnail, productCategory, productId }) {
  const BUCKET_NAME = 'products'
  const supabase = getBrowserClient()

  const imageFile = thumbnail[0]
  const imageFileName = 'thumbnail.jpeg'
  const compressedImageFile = await resizeImage(imageFile)

  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME)
    .upload(`${productCategory}/${productId}/${imageFileName}`, compressedImageFile, {
      cacheControl: '3600',
      upsert: false
    })

  return { data, error }
}
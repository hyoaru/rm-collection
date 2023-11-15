import { resizeImage } from "@lib/resizeImage"
import { getBrowserClient } from "@services/supabase/getBrowserClient"
import { nanoid } from "nanoid"

export default async function uploadProductVariantImages({ images, productId, variantId }) {
  const BUCKET_NAME = 'products'
  const supabase = getBrowserClient()
  const response = { data: null, error: null }

  for await (const imageFile of images) {
    const compressedImageFile = await resizeImage(imageFile)
    const imageFileName = `${nanoid()}-${imageFile.name}`
    const { data, error } = await supabase
      .storage
      .from(BUCKET_NAME)
      .upload(`${productId}/${variantId}/${imageFileName}`, compressedImageFile, {
        cacheControl: '3600',
        upsert: false
      })

    response.data = data
    response.error = error
  }

  return response
}
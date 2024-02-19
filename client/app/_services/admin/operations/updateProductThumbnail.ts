import { getBrowserClient } from "@services/supabase/getBrowserClient";
import { resizeImage } from "@lib/resizeImage";

type UpdateProductThumbnailParams = {
  thumbnail: FileList
  productId: string
}

export default async function updateProductThumbnail({ thumbnail, productId }: UpdateProductThumbnailParams) {
  const supabase = getBrowserClient()

  const imageFile = thumbnail[0]
  const imageFileName = 'thumbnail.jpeg'
  const compressedImageFile = await resizeImage(imageFile)

  const { data, error } = await supabase
    .storage
    .from('products')
    .update(`${productId}/${imageFileName}`, compressedImageFile as File, {
      cacheControl: '3600',
      upsert: true
    })

  return { data, error }
}
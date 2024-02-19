import { getBrowserClient } from "@services/supabase/getBrowserClient";
import { resizeImage } from "@lib/resizeImage";

type AddProductThumbnailParams = {
  thumbnail: FileList
  productId: string
}

export default async function addProductThumbnail({ thumbnail, productId }: AddProductThumbnailParams) {
  const supabase = getBrowserClient()

  const imageFile = thumbnail[0]
  const imageFileName = 'thumbnail.jpeg'
  const compressedImageFile = await resizeImage(imageFile)

  const { data, error } = await supabase
    .storage
    .from('products')
    .upload(`${productId}/${imageFileName}`, compressedImageFile as File, {
      cacheControl: '3600',
      upsert: false
    })

  return { data, error }
}
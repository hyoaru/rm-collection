import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function uploadProductThumbnail({ thumbnail, productCategory, productId }) {
  const supabase = getBrowserClient()
  const thumbnailFile = thumbnail[0]

  const { data, error } = await supabase
    .storage
    .from('products')
    .upload(`${productCategory}/${productId}/${thumbnailFile.name}`, thumbnailFile, {
      cacheControl: '3600',
      upsert: false
    })

  return { data, error }
}
import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default function getProductThumbnailPublicUrl({ productId }) {
  const BUCKET_NAME = 'products'
  const supabase = getBrowserClient()
  const { data } = supabase
    .storage
    .from(BUCKET_NAME)
    .getPublicUrl(`${productId}/thumbnail.jpeg`)

  const thumbnailPublicUrl = data?.publicUrl 
  return thumbnailPublicUrl
}
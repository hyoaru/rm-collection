import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function uploadProductImages({ images, productCategory, productId, variantId }) {
  const supabase = getBrowserClient()
  const response = { data: null, error: null }

  for await (const imageFile of images) {
    const { data, error } = await supabase
      .storage
      .from('products')
      .upload(`${productCategory}/${productId}/${variantId}/${imageFile.name}`, imageFile, {
        cacheControl: '3600',
        upsert: false
      })

    response.data = data
    response.error = error
  }

  return response
}
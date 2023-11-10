import { getBrowserClient } from "@services/supabase/getBrowserClient"
import { nanoid } from "nanoid"

export default async function uploadProductImages({ images, productCategory, productId, variantId }) {
  const supabase = getBrowserClient()
  const response = { data: null, error: null }

  for await (const imageFile of images) {
    const imageFileName = `${nanoid()}-${imageFile.name}`
    const { data, error } = await supabase
      .storage
      .from('products')
      .upload(`${productCategory}/${productId}/${variantId}/${imageFileName}`, imageFile, {
        cacheControl: '3600',
        upsert: false
      })

    response.data = data
    response.error = error
  }

  return response
}
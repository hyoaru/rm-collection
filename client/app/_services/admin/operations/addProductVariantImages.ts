import { nanoid } from "nanoid"
import { resizeImage } from "@lib/resizeImage"
import { getBrowserClient } from "@services/supabase/getBrowserClient"

type AddProductVariantImagesParams = {
  images: FileList
  product: { id: string }
  productVariant: { id: string }
}

export default async function addProductVariantImages({ images, product, productVariant }: AddProductVariantImagesParams) {
  const supabase = getBrowserClient()
  const response: any = { data: null, error: null }

  for await (const imageFile of images) {
    const compressedImageFile = await resizeImage(imageFile)
    const imageFileName = `${nanoid()}-${imageFile.name}`

    const { data, error } = await supabase
      .storage
      .from('products')
      .upload(
        `${product.id}/${productVariant.id}/${imageFileName}`,
        compressedImageFile as File, {
        cacheControl: '3600',
        upsert: false
      })

    response.data = data
    response.error = error
  }

  return response
}
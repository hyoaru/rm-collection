'use server'

import { getServerClient } from "@services/supabase/getServerClient";

export default async function getProductVariantImagesPublicUrl({ productId, variantId }) {
  const BUCKET_NAME = 'products'
  const supabase = await getServerClient()
  let productVariantImagesPublicUrl = []

  const test = await supabase
    .storage
    .from('products')
    .list(`${productId}/${variantId}`)

  console.log(test)

  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME)
    .list(`${productId}/${variantId}`, {
      limit: 4,
      offset: 0,
      sortBy: { column: 'created_at', order: 'asc' },
    })
    .then(async ({ data: imagesListData, error: imagesListError }) => {
      if (imagesListError) {
        return { data: imagesListData, error: imagesListError }
      }

      imagesListData.forEach((imageFile) => {
        const { data } = supabase
          .storage
          .from(BUCKET_NAME)
          .getPublicUrl(`${productId}/${variantId}/${imageFile?.name}`)

        const productVariantImagePublicUrl = data?.publicUrl
        productVariantImagesPublicUrl.push(productVariantImagePublicUrl)
      })


      return { imagesListData, imagesListError }
    })

  return productVariantImagesPublicUrl
}
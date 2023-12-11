"use server"

// App imports
import { getServerClient } from "@services/supabase/getServerClient"

export default async function deleteProduct(productId) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .then(async ({ data: deleteProductData, error: deleteProductError }) => {
      if (deleteProductError) {
        return { data: deleteProductData, error: deleteProductError }
      }

      const { data, error } = await supabase
        .storage
        .from('products')
        .remove([`${productId}/thumbnail.jpeg`])
        .then(async ({ data: deleteProductThumbnailData, error: deleteProductThumbnailError }) => {
          if (deleteProductThumbnailError) {
            return { data: deleteProductThumbnailData, error: deleteProductThumbnailError }
          }

          const { data, error } = await supabase
            .storage
            .from('products')
            .list(productId, {
              limit: 100,
              offset: 0,
              sortBy: { column: 'name', order: 'asc' },
            })

          return { data, error }
        })
        .then(async ({ data: listProductVariantFoldersData, error: listProductVariantFoldersError }) => {
          if (listProductVariantFoldersError) {
            return { data: listProductVariantFoldersData, error: listProductVariantFoldersError }
          }

          let response = { data: null, error: null }
          const productVariantIds = listProductVariantFoldersData.map((row) => row.name)
          for await (const productVariantId of productVariantIds) {
            const { data, error } = await supabase
              .storage
              .from('products')
              .list(`${productId}/${productVariantId}`, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
              })
              .then(async ({ data: listProductVariantImagesData, error: listProductVariantImagesError }) => {
                if (listProductVariantImagesError) {
                  return { data: listProductVariantImagesData, error: listProductVariantImagesError }
                }

                const productVariantImages = listProductVariantImagesData.map((row) => `${productId}/${productVariantId}/${row.name}`)
                const { data, error } = await supabase
                  .storage
                  .from('products')
                  .remove(productVariantImages)

                return { data, error }
              })

            response.data = data
            response.error = error
          }

          return response
        })

      return { data, error }
    })

  return { data, error }
}
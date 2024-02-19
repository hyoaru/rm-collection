import deleteProductVariantImages from "@services/admin/operations/deleteProductVariantImages"
import addProductVariantImages from "@services/admin/operations/addProductVariantImages"

type UpdateProductVariantImagesParams = {
  images: FileList
  productId: string
  variantId: string
}

export default async function updateProductVariantImages({ images, productId, variantId }: UpdateProductVariantImagesParams) {
  const { data, error } = await deleteProductVariantImages({
    product: { id: productId },
    productVariant: { id: variantId }
  })
    .then(async ({ data: deleteProductData, error: deleteProductError }) => {
      if (deleteProductError) {
        return { data: deleteProductData, error: deleteProductError }
      }

      const { data, error } = await addProductVariantImages({
        images: images,
        product: { id: productId },
        productVariant: { id: variantId }
      })

      return { data, error }
    })

  return { data, error }
}
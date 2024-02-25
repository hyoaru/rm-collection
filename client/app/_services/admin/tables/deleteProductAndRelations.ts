import { Tables } from "@constants/base/database-types";
import deleteProductVariantImages from "@services/admin/shared/deleteProductVariantImages";
import getProductOngoingOrdersCount from "@services/admin/tables/getProductOngoingOrdersCount";
import deleteProduct from "@services/admin/tables/deleteProduct";
import deleteProductThumbnail from "@services/admin/shared/deleteProductThumbnail";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

export default async function deleteProductAndRelations(product: Tables<"products">) {

  const { data, error } = await getProductOngoingOrdersCount(product.id)
    .then(async ({ count: ongoingOrdersCount, error: ongoingOrdersError }) => {
      if (ongoingOrdersError || ongoingOrdersCount === null) {
        return { data: ongoingOrdersCount, error: ongoingOrdersError }
      }

      // Return error if product has ongoing orders
      if (ongoingOrdersCount > 0) {
        return {
          data: null,
          error: `Product has ${ongoingOrdersCount} ongoing orders.`
        }
      }

      const { data, error } = await deleteProduct(product.id)
      return { data, error }
    })
    .then(async ({ data: deleteProductData, error: deleteProductError }) => {
      if (deleteProductError || !deleteProductData) {
        return { data: deleteProductData, error: deleteProductError }
      }

      
      // Delete related product variant images
      const response: { data: any; error: any; } = { data: null, error: null }
      if (typeof deleteProductData === 'object' && deleteProductData?.product_variants?.[0]) {
        for await (const productVariant of deleteProductData.product_variants) {
          const { data, error } = await deleteProductVariantImages({
            productId: deleteProductData.id,
            variantId: productVariant.id
          })
          
          response.data = data
          response.error = error
        }
      }
      
      response.data = deleteProductData
      return response
    })
    .then(async ({ data: deleteProductData, error: deleteProductVariantImagesError }) => {
      if (deleteProductVariantImagesError) {
        return { data: deleteProductData, error: deleteProductVariantImagesError }
      }

      // Delete product thumbnail
      const { error } = await deleteProductThumbnail(product.id)
      return { data: deleteProductData, error }
    })


  return { data, error: processErrorToCrossSideSafe(error) }
}

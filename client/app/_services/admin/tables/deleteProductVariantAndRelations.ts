import { Tables } from "@constants/base/database-types";
import deleteProductVariantImages from "@services/admin/shared/deleteProductVariantImages";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import getProductVariantOngoingOrdersCount from "@services/admin/tables/getProductVariantOngoingOrdersCount";
import deleteProductVariant from "@services/admin/tables/deleteProductVariant";
import logAdminAction from "../shared/logAdminAction";

export default async function deleteProductVariantAndRelations(productVariant: Tables<"product_variants">) {
  const { data, error } = await getProductVariantOngoingOrdersCount(productVariant.id)
    .then(async ({ count: ongoingOrdersCount, error: ongoingOrdersError }) => {
      if (ongoingOrdersError || ongoingOrdersCount === null) {
        return { data: ongoingOrdersCount, error: ongoingOrdersError };
      }

      // Return error if product variant has ongoing orders
      if (ongoingOrdersCount > 0) {
        return {
          data: null,
          error: `Product variant has ${ongoingOrdersCount} ongoing orders.`,
        };
      }

      const { data, error } = await deleteProductVariant(productVariant.id);
      return { data, error };
    })
    .then(async ({ data: deleteProductVariantData, error: deleteProductVariantError }) => {
      if (deleteProductVariantError || !deleteProductVariantData) {
        return { data: deleteProductVariantData, error: deleteProductVariantError };
      }

      // Delete related product variant images
      const response: { data: any; error: any } = { data: null, error: null };
      if (typeof deleteProductVariantData === "object") {
        const { data, error } = await deleteProductVariantImages({
          productId: deleteProductVariantData.product_id,
          variantId: productVariant.id,
        });

        response.data = data;
        response.error = error;
      }

      response.data = deleteProductVariantData;
      return response;
    })
    .then(async ({ data: deleteProductVariantData, error: deleteProductVariantImagesError }) => {
      if (deleteProductVariantImagesError || !deleteProductVariantData) {
        return { data: deleteProductVariantData, error: deleteProductVariantImagesError };
      }

      await logAdminAction({
        action: "delete product variant",
        details: JSON.stringify(productVariant),
      });

      return { data: deleteProductVariantData, error: deleteProductVariantImagesError };
    });

  return { data, error: processErrorToCrossSideSafe(error) };
}

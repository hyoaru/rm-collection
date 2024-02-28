import { Tables } from "@constants/base/database-types";
import setProductVariantVisibility from "@services/admin/tables/setProductVariantVisibility";
import logAdminAction from "@services/admin/shared/logAdminAction";

export default async function hideProductVariant(productVariant: Tables<"product_variants">) {
  const { data, error } = await setProductVariantVisibility({
    variantId: productVariant.id,
    isVisible: false,
  })
  .then(async ({ data, error }) => {
    if (error || !data) {
      return { data, error };
    }

    const details = {
      isVisible: false,
      productVariant,
    };

    await logAdminAction({
      action: "hide product variant",
      details: JSON.stringify(details),
    });

    return { data, error };
  });

  return { data, error };
}

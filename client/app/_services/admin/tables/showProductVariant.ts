import { Tables } from "@constants/base/database-types";
import setProductVariantVisibility from "@services/admin/tables/setProductVariantVisibility";
import logAdminAction from "@services/admin/shared/logAdminAction";

export default async function showProductVariant(productVariant: Tables<"product_variants">) {
  const { data, error } = await setProductVariantVisibility({
    variantId: productVariant.id,
    isVisible: true,
  }).then(async ({ data, error }) => {
    if (error || !data) {
      return { data, error };
    }

    const details = {
      isVisible: true,
      productVariant,
    };

    await logAdminAction({
      action: "show product variant",
      details: JSON.stringify(details),
    });

    return { data, error };
  });

  return { data, error };
}

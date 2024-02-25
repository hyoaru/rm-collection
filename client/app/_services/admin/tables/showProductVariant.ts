import { Tables } from "@constants/base/database-types";
import setProductVariantVisibility from "@services/admin/tables/setProductVariantVisibility";

export default async function showProductVariant(productVariant: Tables<"product_variants">) {
  const { data, error } = await setProductVariantVisibility({
    variantId: productVariant.id,
    isVisible: true,
  });

  return { data, error };
}

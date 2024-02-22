import { queryOptions } from "@tanstack/react-query";
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl";

// App imports
import getAllProducts from "@services/shared/getAllProducts";
import getProductVariantsByProduct from "@services/shared/getProductVariantsByProduct";

export function queryProductThumbnail(productId: string) {
  return queryOptions({
    queryKey: ["product-thumbnail", { product: { id: productId } }],
    queryFn: () => getProductThumbnailPublicUrl({ productId: productId }),
  });
}

export function queryAllProducts() {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
}

export function queryProductVariantsByProduct({
  productId,
  visibility = "all",
  isEnabled = true
}: {
  productId: string | null;
  visibility?: "all" | "displayed" | "hidden";
  isEnabled?: boolean
}) {
  return queryOptions({
    queryKey: ["product_variants", {
      productId: productId,
      visibility: visibility
    }],
    queryFn: () => getProductVariantsByProduct({ productId: productId ?? '', visibility: visibility }),
    enabled: isEnabled
  });
}

import { queryOptions } from "@tanstack/react-query";
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl";

// App imports
import getAllProducts from "@services/shared/getAllProducts";

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

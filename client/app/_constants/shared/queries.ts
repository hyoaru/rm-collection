import { queryOptions } from "@tanstack/react-query";
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl";

// App imports
import getAllProducts from "@services/shared/getAllProducts";
import getProductVariantsByProduct from "@services/shared/getProductVariantsByProduct";
import getAllProductVariants from "@services/shared/getAllProductVariants";

export function queryProductThumbnail(productId: string) {
  return queryOptions({
    queryKey: ["product-thumbnail", { product: { id: productId } }],
    queryFn: () => getProductThumbnailPublicUrl({ productId: productId }),
  });
}

export function queryAllProducts() {
  return queryOptions({
    queryKey: ["products"],
    queryFn: async () => await getAllProducts(),
  });
}

export function queryAllProductVariants(){
  return queryOptions({
    queryKey: ['product_variants'],
    queryFn: async () => await getAllProductVariants()
  })
}

export function queryProductVariantsByProduct({
  productId,
  isEnabled = true
}: {
  productId: string;
  isEnabled?: boolean
}) {
  return queryOptions({
    queryKey: ["product_variants", { productId: productId }],
    queryFn: async () => await getProductVariantsByProduct({ productId: productId }),
  });
}

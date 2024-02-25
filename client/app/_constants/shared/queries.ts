import { queryOptions } from "@tanstack/react-query";

// App imports
import getProductVariantsByProduct from "@services/shared/getProductVariantsByProduct";
import getAllProductVariants from "@services/shared/getAllProductVariants";
import getProducts from "@services/shared/getProducts";
import { ProductCategoryType } from "@constants/base/types";

export function queryAllProducts() {
  return queryOptions({
    queryKey: ["products"],
    queryFn: async () => await getProducts({ category: "all" }),
  });
}

export function queryProducts({ category }: { category: ProductCategoryType }) {
  return queryOptions({
    queryKey: ["products", { category: category }],
    queryFn: async () => await getProducts({ category: category }),
  });
}

export function queryAllProductVariants() {
  return queryOptions({
    queryKey: ["product_variants"],
    queryFn: async () => await getAllProductVariants(),
  });
}

export function queryProductVariantsByProduct({
  productId,
  isEnabled = true,
}: {
  productId: string;
  isEnabled?: boolean;
}) {
  return queryOptions({
    queryKey: ["product_variants", { productId: productId }],
    queryFn: async () => await getProductVariantsByProduct({ productId: productId }),
  });
}

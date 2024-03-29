import { queryOptions } from "@tanstack/react-query";

// App imports
import getProductVariantsByProduct from "@services/shared/getProductVariantsByProduct";
import getProductVariants from "@services/shared/getProductVariants";
import getProducts from "@services/shared/getProducts";
import { ProductCategoryType, ProductVariantVisibilityType } from "@constants/base/types";
import getAllOrderStatus from "@services/shared/getAllOrderStatus";
import getProductById from "@services/shared/getProductById";
import getCart from "@services/shared/getCart";
import getOrdersByGroup from "@/app/_services/shared/getOrdersByGroup";

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
    queryFn: async () => await getProductVariants({ visibility: "all" }),
  });
}

export function queryProductVariantsByProduct({ productId }: { productId: string }) {
  return queryOptions({
    queryKey: ["product_variants", { productId: productId }],
    queryFn: async () => await getProductVariantsByProduct({ productId: productId }),
  });
}

export function queryProductVariants({ visibility }: { visibility: ProductVariantVisibilityType }) {
  return queryOptions({
    queryKey: ["product_variants", { visibility: visibility }],
    queryFn: async () => await getProductVariants({ visibility: visibility }),
  });
}

export function queryAllOrderStatus() {
  return queryOptions({
    queryKey: ["order_status"],
    queryFn: async () => await getAllOrderStatus(),
  });
}

export function queryProductById(productId: string) {
  return queryOptions({
    queryKey: ["products", { productId: productId }],
    queryFn: () => getProductById(productId),
  });
}

export function queryCart() {
  return queryOptions({
    queryKey: ["cart"],
    queryFn: getCart,
  });
}

export function queryOrdersByGroup(orderGroup: string, isEnabled?: boolean) {
  return queryOptions({
    queryKey: ["orders", { order_group: orderGroup }],
    queryFn: () => getOrdersByGroup(orderGroup),
    enabled: isEnabled ?? true
  });
}

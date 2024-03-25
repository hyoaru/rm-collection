import { queryOptions } from "@tanstack/react-query";
import getLatestProducts from "@services/index/getLatestProducts";
import getDiscountedProducts from "@services/index/getDiscountedProducts";

export function queryLatestProducts(){
  return queryOptions({
    queryKey: ['products', 'product_variants', 'latest-products'],
    queryFn: getLatestProducts
  })
}

export function queryDiscountedProducts(){
  return queryOptions({
    queryKey: ['products', 'product_variants', 'discounted-products'],
    queryFn: getDiscountedProducts
  })
}

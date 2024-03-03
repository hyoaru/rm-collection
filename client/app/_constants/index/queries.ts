import { queryOptions } from "@tanstack/react-query";
import getLatestProducts from "@services/index/getLatestProducts";

export function queryLatestProducts(){
  return queryOptions({
    queryKey: ['products', 'product_variants', 'latest-products'],
    queryFn: getLatestProducts
  })
}

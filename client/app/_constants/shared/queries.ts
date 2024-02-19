import { queryOptions } from "@tanstack/react-query";

// App imports
import getAllProducts from "@services/shared/getAllProducts";

export function queryAllProducts(){
  return queryOptions({
    queryKey: ['products'],
    queryFn: getAllProducts
  })
}
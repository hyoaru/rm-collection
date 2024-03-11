import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";

// App imports
import getCollectionPaginated from "@services/collection/getCollectionPaginated";
import { ProductCategoryType } from "@constants/base/types";
import getRandomProductsByProductId from "@/app/_services/collection/getRandomProductsByProductId";

type QueryCollectionInfiniteParams = {
  category: ProductCategoryType;
};

export function queryCollectionInfinite({ category }: QueryCollectionInfiniteParams) {
  return infiniteQueryOptions({
    queryKey: ["products", { category: category }],
    queryFn: ({ pageParam }) => getCollectionPaginated({ pageParam: pageParam, category: category }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.endPage) {
        return lastPage.page + 1;
      }
    },
  });
}

export function queryRandomProductsByProductId(productId: string) {
  return queryOptions({
    queryKey: ["products", { randomByProductId: productId }],
    queryFn: () => getRandomProductsByProductId(productId),
  });
}

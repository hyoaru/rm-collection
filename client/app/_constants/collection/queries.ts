import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";

// App imports
import getCollectionPaginated from "@services/collection/getCollectionPaginated";
import { ProductCategoryType } from "@constants/base/types";

type QueryCollectionInfiniteParams = {
  category: ProductCategoryType;
};

export function queryCollectionInfinite({ category }: QueryCollectionInfiniteParams) {
  return infiniteQueryOptions({
    queryKey: ["collection", { category: category }],
    queryFn: ({ pageParam }) => getCollectionPaginated({ pageParam: pageParam, category: category }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.endPage) {
        return lastPage.page + 1;
      }
    },
  });
}

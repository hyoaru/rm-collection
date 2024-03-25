import { infiniteQueryOptions } from "@tanstack/react-query";

// App imports
import getOrdersPaginated from "@services/orders/getOrdersPaginated";

type QueryOrdersByStatusParams = {
  userId: string;
};

export function queryOrdersInfinite({ userId }: QueryOrdersByStatusParams) {
  return infiniteQueryOptions({
    queryKey: ["orders", { user_id: userId }],
    queryFn: ({ pageParam }) =>
      getOrdersPaginated({
        pageParam: pageParam,
        userId: userId,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.endPage) {
        return lastPage.page + 1;
      }
    },
  });
}

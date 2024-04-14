import React from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// App imports
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import ProductView from "@components/collection/product/ProductView";
import { queryProductById } from "@constants/shared/queries";
import { queryRandomProductsByProductId } from "@constants/collection/queries";

type ProductViewParams = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id: productId } }: ProductViewParams) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryProductById(productId));
  await queryClient.prefetchQuery(queryRandomProductsByProductId(productId));

  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductView productId={productId} authenticatedUser={authenticatedUser} />
      </HydrationBoundary>
    </>
  );
}

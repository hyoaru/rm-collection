import React from "react";
import getQueryClient from "@services/shared/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// App imports
import InfiniteProductsFeed from "@components/collection/shared/InfiniteProductsFeed";
import { queryCollectionInfinite } from "@constants/collection/queries";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(queryCollectionInfinite({category: 'ring'}));

  const breadcrumbs = [
    { label: "Collection", link: "/collection" },
    { label: "Rings", link: "/collection/rings" },
  ];

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InfiniteProductsFeed category="ring" breadcrumbs={breadcrumbs} />
      </HydrationBoundary>
    </>
  );
}

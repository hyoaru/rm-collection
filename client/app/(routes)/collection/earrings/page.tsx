import React from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// App imports
import InfiniteProductsFeed from "@components/collection/shared/InfiniteProductsFeed";
import { queryCollectionInfinite } from "@constants/collection/queries";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(queryCollectionInfinite({category: 'earring'}));

  const breadcrumbs = [
    { label: "Collection", link: "/collection" },
    { label: "Earrings", link: "/collection/earrings" },
  ];

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InfiniteProductsFeed category="earring" breadcrumbs={breadcrumbs} />
      </HydrationBoundary>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotateCw, TicketX } from "lucide-react";
import Link from "next/link";

// App imports
import { queryCollectionInfinite } from "@constants/collection/queries";
import { ProductCategoryType } from "@constants/base/types";
import ProductCard from "@components/collection/shared/ProductCard";
import { Skeleton } from "@components/ui/skeleton";
import { Button } from "@components/ui/button";
import CollectionHeader from "@components/collection/shared/CollectionHeader";

type InfiniteProductsFeedProps = {
  category: ProductCategoryType;
  breadcrumbs: {
    label: string;
    link: string;
  }[];
};

export default function InfiniteProductsFeed({ category, breadcrumbs }: InfiniteProductsFeedProps) {
  const [_, setState] = useState<any>();
  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery(
    queryCollectionInfinite({ category: category })
  );

  const collection = data?.pages
    .map((page) => page.data ?? [])
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue));

  function toggleProductsOrder() {
    if (!collection || !collection?.[0]) return
    collection.reverse();
    setState(performance.now());
  }

  return (
    <>
      <CollectionHeader
        toggleSortOrder={toggleProductsOrder}
        inStock={data?.pages?.[0].count ?? 0}
        breadcrumbs={breadcrumbs}
      />

      {isPending ? (
        <div className="columns-1 space-y-4 gap-x-4 my-4 sm:columns-2 lg:columns-3">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={`ProductSkeleton-${index}`}
                className="w-full break-inside-avoid-column rounded-xl"
                style={{ height: `250px` }}
              />
            ))}
        </div>
      ) : collection && collection.length > 0 ? (
        <InfiniteScroll
          className="py-4 px-1 md:px-0"
          dataLength={collection.length}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={
            <div className="flex justify-center my-12">
              <RotateCw size={30} className="animate-spin" />
            </div>
          }
          endMessage={
            <>
              <div className="flex justify-center my-12">
                <p className="text-xl opacity-50 font-semibold md:text-2xl">You have seen all products</p>
              </div>
            </>
          }
        >
          <div className="columns-1 space-y-4 gap-x-4 sm:columns-2 lg:columns-3">
            {collection &&
              collection.map((product) => (
                <ProductCard key={`Product-${product.id}`} product={product} classNames={{ base: "w-full" }} />
              ))}
          </div>
        </InfiniteScroll>
      ) : (
        <>
          <div className="flex flex-col items-center gap-6 my-12">
            <div className="flex flex-col items-center p-10 bg-secondary rounded-full">
              <TicketX size={150} className="opacity-30" />
            </div>
            <div className="text-center">
              <p className="text-xl opacity-50 font-semibold md:text-2xl">Oops! Looks like this section is empty</p>
              <p className="opacity-50 text-lg">Explore our collections instead</p>
            </div>
            <Link href={"/collection"}>
              <Button size={"lg"}>Browse collection</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

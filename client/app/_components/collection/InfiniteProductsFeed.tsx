"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotateCw } from "lucide-react";

// App imports
import { queryCollectionInfinite } from "@constants/collection/queries";
import { ProductCategoryType } from "@constants/base/types";
import ProductCard from "@components/index/ProductCard";
import { Skeleton } from "@components/ui/skeleton";

type InfiniteProductsFeedProps = {
  category: ProductCategoryType;
};

export default function InfiniteProductsFeed({ category }: InfiniteProductsFeedProps) {
  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery(queryCollectionInfinite({ category: category }));

  const collection = data?.pages
    .map((page) => page.data ?? [])
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue));

  if (isPending) {
    return (
      <>
        <div className="columns-1 space-y-4 gap-x-4 my-4 sm:columns-2 lg:columns-3">
          {Array(9).fill(0).map((_, index) => (
            <Skeleton 
              key={`ProductSkeleton-${index}`}
              className="w-full break-inside-avoid-column rounded-xl" 
              style={{height: `250px`}} 
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <InfiniteScroll
        className="py-4"
        dataLength={collection ? collection.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={
          <div className="flex justify-center my-12">
            <RotateCw size={30} className="animate-spin" />
          </div>
        }
        endMessage={
          <>
            {collection && (
              <div className="flex justify-center my-12">
                <p className="text-xl opacity-50 font-semibold md:text-2xl">You have seen all products</p>
              </div>
            )}
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
    </>
  );
}

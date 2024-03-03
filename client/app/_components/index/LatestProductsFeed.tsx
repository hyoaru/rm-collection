"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

// App imports
import { queryLatestProducts } from "@constants/index/queries";
import divideArrayToSubArrays from "@lib/divideArrayToSubArrays";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import ProductCard from "@components/index/ProductCard";
import { Skeleton } from "@components/ui/skeleton";

export default function LatestProductsFeed() {
  const { data: latestProducts, isFetching, isPending } = useQuery(queryLatestProducts());

  const dividedLatestProducts = divideArrayToSubArrays({
    array: latestProducts?.data ?? [],
    itemsPerSubArray: 2,
  });

  if (isPending || isFetching) {
    const productCardSkeletons = divideArrayToSubArrays({
      array: Array(10).fill(0),
      itemsPerSubArray: 2,
    });

    console.log(productCardSkeletons);

    return (
      <>
        <ScrollArea className="">
          <div className="flex w-max gap-2 py-14 sm:gap-4">
            {productCardSkeletons.map((skeletonGroup, skeletonGroupIndex) => {
              const indexToTarget = skeletonGroupIndex % 2 == 0 ? 1 : 0;

              return (
                <div className="flex flex-col gap-2 sm:gap-6" key={`LatestProduct-SkeletonGroup-${skeletonGroupIndex}`}>
                  {skeletonGroup.map((_, index) => {
                    return (
                      <Skeleton
                        key={`Skeleton-${skeletonGroupIndex}-${index}`}
                        className={`w-[300px] shadow-[rgba(137,_24,_31,_0.03)_0px_15px_45px] ${index == indexToTarget ? "h-[225px]" : "h-[250px]"}`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </>
    );
  }

  return (
    <>
      <ScrollArea className="">
        <div className="flex w-max gap-2 py-14 sm:gap-4">
          {latestProducts?.data &&
            dividedLatestProducts.map((productGroup, productGroupIndex) => {
              const indexToTarget = productGroupIndex % 2 == 0 ? 1 : 0;

              return (
                <div className="flex flex-col gap-2 sm:gap-6" key={`LatestProduct-ProductGroup-${productGroupIndex}`}>
                  {productGroup.map((product, productIndex) => {
                    return (
                      <ProductCard
                        key={`LatestProduct-${product.id}`}
                        product={product}
                        classNames={{
                          image: productIndex == indexToTarget ? "h-[150px]" : "h-[175px]",
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

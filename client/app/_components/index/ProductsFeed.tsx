"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

// App imports
import divideArrayToSubArrays from "@lib/divideArrayToSubArrays";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import ProductCard from "@components/collection/shared/ProductCard";
import { Skeleton } from "@components/ui/skeleton";
import { Tables } from "@constants/base/database-types";
import { TicketX } from "lucide-react";

type ProductType = Tables<"products"> & { product_variants: Tables<"product_variants">[] };

type ProductsFeedParams = {
  queryOptions: () => any;
};

export default function ProductsFeed({ queryOptions }: ProductsFeedParams) {
  const { data: products, isFetching, isPending } = useQuery(queryOptions());

  const dividedProducts = divideArrayToSubArrays({
    array: (products as any)?.data ?? [],
    itemsPerSubArray: 2,
  }) as ProductType[][];

  if (isPending || isFetching) {
    const productCardSkeletons = divideArrayToSubArrays({
      array: Array(10).fill(0),
      itemsPerSubArray: 2,
    });

    return (
      <>
        <ScrollArea className="">
          <div className="flex w-max gap-2 py-4 sm:gap-4 lg:py-12">
            {productCardSkeletons.map((skeletonGroup, skeletonGroupIndex) => {
              const indexToTarget = skeletonGroupIndex % 2 == 0 ? 1 : 0;

              return (
                <div className="flex flex-col gap-2 sm:gap-6" key={`ProductFeed-SkeletonGroup-${skeletonGroupIndex}`}>
                  {skeletonGroup.map((_, index) => {
                    return (
                      <Skeleton
                        key={`Skeleton-${skeletonGroupIndex}-${index}`}
                        className={`rounded-xl h-[225] w-[300px] sm:h-[500] sm:w-[375px] shadow-[rgba(137,_24,_31,_0.03)_0px_15px_45px] `}
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
    // <ScrollArea>
      <div className="flex gap-4">
        {(products as any).data.map((product: ProductType) => (
          <ProductCard key={`Product-${product.id}`} product={product} />
        ))}
      </div>
      // <ScrollBar orientation="horizontal" />
    // </ScrollArea>
  );

  return (
    <>
      {(products as any).data?.[0] ? (
        <>
          <ScrollArea className="">
            <div className="flex h-max w-max gap-2 sm:gap-4">
              {(products as any).data.length >= 5 ? (
                <>
                  {dividedProducts.map((productGroup, productGroupIndex) => {
                    const indexToTarget = productGroupIndex % 2 == 0 ? 1 : 0;

                    return (
                      <div className="flex flex-col gap-2 sm:gap-6" key={`ProductGroup-${productGroupIndex}`}>
                        {productGroup.map((product) => {
                          return <ProductCard key={`Product-${product.id}`} product={product} />;
                        })}
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {(products as any).data.map((product: ProductType) => (
                    <ProductCard key={`Product-${product.id}`} product={product} />
                  ))}
                </>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-6 my-12 opacity-50">
            <div className="flex flex-col items-center p-10 bg-secondary rounded-full">
              <TicketX size={150} className="opacity-30" />
            </div>
            <div className="text-center">
              <p className="text-xl opacity-50 font-semibold md:text-2xl">Oops! Looks like this section is empty</p>
              <p className="opacity-50 text-lg">Stay tuned for exciting updates to come!</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

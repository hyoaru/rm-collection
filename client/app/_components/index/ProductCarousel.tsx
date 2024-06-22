"use client";

import React from "react";
import { TicketX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// App imports
import ProductCard from "@components/collection/shared/ProductCard";
import { Skeleton } from "@components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@components/ui/carousel";
import { Tables } from "@constants/base/database-types";

type ProductType = Tables<"products"> & { product_variants: Tables<"product_variants">[] };

type ProductsCarouselParams = {
  queryOptions: () => any;
  category: String;
};

export default function ProductCarousel({ queryOptions, category }: ProductsCarouselParams) {
  const { data: products, isFetching, isPending } = useQuery(queryOptions());

  if (isPending || isFetching) {
    const productCardSkeletons = Array(10).fill(0);

    return (
      <Carousel>
        <div className="relative w-full h-full">
          <div className="absolute w-full inset-0 start-0">
            <CarouselPrevious className="rounded-md" />
          </div>
          <div className="absolute w-full inset-0 end-0">
            <CarouselNext className="rounded-md" />
          </div>
          <CarouselContent>
            {productCardSkeletons?.map((product, index) => (
              <CarouselItem className="basis-1/2 md:basis-1/3" key={`ProductCardSkeleton-${category}-${index}`}>
                <Skeleton className="rounded-md w-full h-[230px]" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    );
  }

  if (!(products as any)?.data?.[0]) {
    return (
      <div className="flex flex-col items-center gap-6 my-12 opacity-50">
        <div className="flex flex-col items-center p-10 bg-secondary rounded-full">
          <TicketX size={150} className="opacity-30" />
        </div>
        <div className="text-center">
          <p className="text-xl opacity-50 font-semibold md:text-2xl">Oops! Looks like this section is empty</p>
          <p className="opacity-50 text-lg">Stay tuned for exciting updates to come!</p>
        </div>
      </div>
    );
  }

  return (
    <Carousel>
      <div className="relative w-full h-full">
        <div className="hidden md:block z-10">
          <CarouselPrevious className="rounded-md" />
          <CarouselNext className="rounded-md" />
        </div>
        <CarouselContent>
          {(products as any)?.data?.map((product: ProductType) => (
            <CarouselItem className="basis-1/2 md:basis-1/3" key={`Product-${category}-${product.id}`}>
              <ProductCard product={product} classNames={{ image: "h-[230px]" }} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
}

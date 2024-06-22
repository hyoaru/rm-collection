"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TicketX } from "lucide-react";
import Link from "next/link";

// App imports
import { SectionHeader } from "@components/shared/SectionHeader";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { queryAllProducts } from "@constants/shared/queries";
import ProductCard from "@components/collection/shared/ProductCard";

export default function ProductSearchFeed() {
  const { data, isPending } = useQuery(queryAllProducts());
  const [_, setState] = useState<any>();
  const [keywordFilter, setKeywordFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("Ascending");

  const products = data?.data;
  const filteredProducts = useMemo(() => {
    let filteredProductsByKeyword =
      keywordFilter !== ""
        ? products?.filter((product) => {
            let stringToSearch = Object.values(product).join(" ").toLowerCase();
            product?.product_variants.forEach((productVariant) => {
              stringToSearch += Object.values(productVariant ?? {})
                .join(" ")
                .toLowerCase();
            });
            return stringToSearch.includes(keywordFilter);
          })
        : products;

    return filteredProductsByKeyword;
  }, [products, keywordFilter]);

  const toggleProductsSortOrder = useCallback(() => {
    products?.reverse();
    setState(performance.now());
  }, [products]);

  const onSortOrderClick = useCallback(() => {
    if (products ? products?.length > 0 : false) {
      setSortOrder((prevSortOrder) => (prevSortOrder === "Ascending" ? "Descending" : "Ascending"));
      toggleProductsSortOrder();
    }
  }, [products, toggleProductsSortOrder]);

  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Search product</SectionHeader.Title>
        <SectionHeader.Description>Filter products using any of its property</SectionHeader.Description>
      </SectionHeader>

      <div className="flex items-center gap-x-4 gap-y-2 flex-col lg:flex-row mb-6">
        <Input
          className={"w-full me-auto"}
          placeholder={"Filter by name, material, material property, etc"}
          onChange={(event) => setKeywordFilter(event.target.value)}
        />

        <div className="flex items-center gap-x-4 w-full lg:w-max">
          <Button variant={"secondary"} onClick={onSortOrderClick} className={"w-full lg:w-max"}>
            {`Sort order: ${sortOrder}`}
          </Button>
        </div>
      </div>

      {isPending ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={`ProductSkeleton-${index}`}
                className="w-full break-inside-avoid-column rounded-xl"
                style={{ height: `230px` }}
              />
            ))}
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductCard key={`Product-${product.id}`} product={product} classNames={{ image: "h-[230px]" }} />
            ))}
        </div>
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

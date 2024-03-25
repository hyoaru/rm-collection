"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RotateCw, TicketX } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

// App imports
import { queryOrdersInfinite } from "@constants/orders/queries";
import { Tables } from "@constants/base/database-types";
import { SectionHeader } from "@components/shared/SectionHeader";
import { Input } from "@components/ui/input";
import OrderStatusSelect from "@components/shared/OrderStatusSelect";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import OrderCard from "@components/orders/OrderCard";

type OrdersFeedProps = {
  authenticatedUser: Tables<"users">;
};

export default function OrdersFeed({ authenticatedUser }: OrdersFeedProps) {
  const { data, isPending, fetchNextPage, hasNextPage } = useInfiniteQuery(
    queryOrdersInfinite({ userId: authenticatedUser.id })
  );
  const [_, setState] = useState<any>();
  const [statusFilter, setStatusFilter] = useState("all");
  const [keywordFilter, setKeywordFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("Ascending");

  const orders = data?.pages
    .map((page) => page.data ?? [])
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue));

  const filteredOrders = useMemo(() => {
    let filteredOrdersByStatus =
      statusFilter !== "all" ? orders?.filter((order) => order?.order_status?.label === statusFilter) : orders;

    let filteredOrderByKeyword =
      keywordFilter !== ""
        ? filteredOrdersByStatus?.filter((order) => {
            let stringToSearch = Object.values(order).join(" ").toLowerCase();

            stringToSearch += Object.values(order?.product_variants ?? {})
              .join(" ")
              .toLowerCase();
            stringToSearch += Object.values(order?.product_variants?.products ?? {})
              .join(" ")
              .toLowerCase();
            stringToSearch += Object.values(order?.order_status ?? {})
              .join(" ")
              .toLowerCase();

            return stringToSearch.includes(keywordFilter);
          })
        : filteredOrdersByStatus;

    return filteredOrderByKeyword;
  }, [statusFilter, orders, keywordFilter]);

  const toggleOrdersSortOrder = useCallback(() => {
    orders?.reverse();
    setState(performance.now());
  }, [orders]);

  const onSortOrderClick = useCallback(() => {
    if (orders ? orders?.length > 0 : false) {
      setSortOrder((prevSortOrder) => (prevSortOrder === "Ascending" ? "Descending" : "Ascending"));
      toggleOrdersSortOrder();
    }
  }, [orders, sortOrder]);

  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Orders</SectionHeader.Title>
        <SectionHeader.Description>Overview information of all your purchase.</SectionHeader.Description>
      </SectionHeader>

      <div className="flex items-center gap-x-4 gap-y-2 flex-col lg:flex-row">
        <Input
          className={"w-full me-auto"}
          placeholder={"Filter by name, material, material property, etc"}
          onChange={(event) => setKeywordFilter(event.target.value)}
        />

        <div className="flex items-center gap-x-4 w-full lg:w-max">
          <div className="w-full">
            <OrderStatusSelect
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              classNames={{
                trigger: "w-full lg:w-max",
              }}
            />
          </div>

          <Button variant={"secondary"} onClick={onSortOrderClick} className={"w-full lg:w-max"}>
            {`Sort order: ${sortOrder}`}
          </Button>
        </div>
      </div>

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
      ) : filteredOrders && filteredOrders.length > 0 ? (
        <InfiniteScroll
          className="py-4"
          dataLength={filteredOrders.length}
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
                <p className="text-xl opacity-50 font-semibold md:text-2xl">You have seen all your orders</p>
              </div>
            </>
          }
        >
          <div className="columns-1 space-y-4 gap-x-4 sm:columns-2 lg:columns-3">
            {filteredOrders &&
              filteredOrders.map((order) => (
                <OrderCard key={`Order-${order.id}`} order={order} classNames={{ card: { base: "w-full" } }} />
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
              <p className="opacity-50 text-lg">Nothing to see here... yet!</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

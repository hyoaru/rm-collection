import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import getQueryClient from "@services/shared/getQueryClient";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import { queryAllOrderStatus } from "@constants/shared/queries";
import { queryAllOrders } from "@constants/admin/queries";
import OrdersTableFeed from "@components/admin/tables/OrdersTableFeed";

export default async function Page() {
  const authenticatedUser = await getUserStateServer();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryAllOrders());
  await queryClient.prefetchQuery(queryAllOrderStatus());

  return (
    <>
      <AdminSectionHeader
        category={"Table"}
        title={"Order list table"}
        description={"Comprehensive overview of orders and other relevant information."}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <OrdersTableFeed authenticatedUser={authenticatedUser} />
      </HydrationBoundary>
    </>
  );
}

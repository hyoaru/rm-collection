import React from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import ProductsTableFeed from "@components/admin/tables/ProductsTableFeed";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import { queryAllProducts} from "@constants/shared/queries";

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryAllProducts());
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <AdminSectionHeader
        category={"Table"}
        title={"Product list table"}
        description={"Comprehensive overview of product list and other relevant information."}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsTableFeed authenticatedUser={authenticatedUser} />
      </HydrationBoundary>
    </>
  );
}

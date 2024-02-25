import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import getQueryClient from "@services/shared/getQueryClient";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import { queryAllProductVariants } from "@constants/shared/queries";
import ProductVariantsTableFeed from "@components/admin/tables/ProductVariantsTableFeed";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryAllProductVariants());
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <AdminSectionHeader
        category={"Table"}
        title={"Product variant list table"}
        description={"Comprehensive overview of product variants and other relevant information."}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductVariantsTableFeed authenticatedUser={authenticatedUser} />
      </HydrationBoundary>
    </>
  );
}

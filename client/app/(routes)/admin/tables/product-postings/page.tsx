import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import getQueryClient from "@services/shared/getQueryClient";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import { queryProductVariants} from "@constants/shared/queries";
import ProductPostingsTableFeed from "@components/admin/tables/ProductPostingsTableFeed";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryProductVariants({visibility: "shown"}));
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <AdminSectionHeader
        category={"Table"}
        title={"Product posting list table"}
        description={"Comprehensive overview of visible product variants and other relevant information."}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductPostingsTableFeed authenticatedUser={authenticatedUser} />
      </HydrationBoundary>
    </>
  );
}

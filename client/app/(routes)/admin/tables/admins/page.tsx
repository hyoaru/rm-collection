import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import getQueryClient from "@services/shared/getQueryClient";
import { queryUsers } from "@constants/admin/queries";
import AdminsTableFeed from "@components/admin/tables/AdminsTableFeed";
import { getUserStateServer } from "@/app/_services/authentication/getUserStateServer";

export default async function page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryUsers({ role: "admin" }));
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <AdminSectionHeader
        category={"Table"}
        title={"Admin list table"}
        description={"Comprehensive overview of admin list and other relevant information."}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminsTableFeed authenticatedUser={authenticatedUser} />
      </HydrationBoundary>
    </>
  );
}

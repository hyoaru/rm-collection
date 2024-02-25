import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import getQueryClient from "@services/shared/getQueryClient";
import { queryUsers } from "@constants/admin/queries";
import UsersTableFeed from "@components/admin/tables/UsersTableFeed";
import { getUserStateServer } from "@/app/_services/authentication/getUserStateServer";

export default async function page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryUsers({ role: "user" }));
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <AdminSectionHeader
        category={"Table"}
        title={"User list table"}
        description={"Comprehensive overview of user list and other relevant information."}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersTableFeed authenticatedUser={authenticatedUser} />
      </HydrationBoundary>
    </>
  );
}

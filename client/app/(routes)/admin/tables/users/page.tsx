import React from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import { queryUsers } from "@constants/admin/queries";
import UsersTableFeed from "@components/admin/tables/users/UsersTableFeed";
import { getUserStateServer } from "@services/authentication/getUserStateServer";

export default async function page() {
  const queryClient = new QueryClient();
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

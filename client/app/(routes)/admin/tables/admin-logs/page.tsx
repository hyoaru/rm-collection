import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import getQueryClient from "@services/shared/getQueryClient";
import { queryAllAdminLogs } from "@constants/admin/queries";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import AdminLogsTableFeed from "@components/admin/tables/AdminLogsTableFeed";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryAllAdminLogs());
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <AdminSectionHeader
        category={"Table"}
        title={"Admin logs table"}
        description={"Comprehensive overview of admin logs and other relevant information."}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminLogsTableFeed authenticatedUser={authenticatedUser} />
      </HydrationBoundary>
    </>
  );
}

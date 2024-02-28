"use client";

import React from "react";

// App imports
import DataTable from "@components/admin/tables/shared/DataTable";
import { queryAllAdminLogs } from "@constants/admin/queries";
import { Tables } from "@constants/base/database-types";
import getAdminLogListCsv from "@services/admin/tables/getAdminLogListCsv";

type AdminLogsTableFeedProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function AdminLogsTableFeed({ authenticatedUser }: AdminLogsTableFeedProps) {
  const columnDefinition = [
    { accessorKey: "id" },
    { accessorFn: (row: any) => row.users?.id ?? "deleted-user", header: 'admin_id' },
    { accessorFn: (row: any) => row.users?.email, header: 'admin_email' },
    { accessorFn: (row: any) => `${row.users?.first_name} ${row.users?.last_name}`, header: 'admin_name' },
    { accessorFn: (row: any) => row.users?.role, header: 'admin_level' },
    { accessorKey: "action" },
    { accessorKey: "details" },
  ];

  return (
    <DataTable
      authenticatedUser={authenticatedUser}
      columnDefinition={columnDefinition}
      getListCsv={getAdminLogListCsv}
      tableName={"rmc-admin-log-list"}
      queryOptions={queryAllAdminLogs}
      queryKeys={[["admin_logs"]]}
    />
  );
}

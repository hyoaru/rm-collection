"use client";

import React from "react";

// App imports
import { BASE_ADMIN_ROLES as baseAdminRoles } from "@constants/admin/base";
import removeAdminAuthority from "@services/admin/tables/removeAdminAuthority";
import DataTable from "@components/admin/tables/shared/DataTable";
import { queryUsers } from "@constants/admin/queries";
import getAdminListCsv from "@services/admin/tables/getAdminListCsv";
import { Tables } from "@constants/base/database-types";

type AdminsTableFeedProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function AdminsTableFeed({ authenticatedUser }: AdminsTableFeedProps) {
  const rowActions = [
    {
      label: "Remove admin authority",
      onClick: removeAdminAuthority,
      isDestructive: true,
      adminRolesPermitted: baseAdminRoles.filter((role) => !["admin_tier_2"].includes(role)),
    },
  ];

  const columnDefinition = [
    { accessorKey: "id" },
    { accessorKey: "email" },
    { accessorKey: "first_name" },
    { accessorKey: "last_name" },
    { accessorKey: "role" },
  ];

  return (
    <DataTable
      authenticatedUser={authenticatedUser}
      columnDefinition={columnDefinition}
      rowActions={rowActions}
      getListCsv={getAdminListCsv}
      tableName={"rmc-admin-list"}
      queryOptions={() => queryUsers({role: 'admin'})}
      queryKeys={[["users", { role: "admin" }]]}
    />
  );
}

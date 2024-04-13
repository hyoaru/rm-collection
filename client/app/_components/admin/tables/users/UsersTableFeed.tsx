"use client";

import React from "react";

// App imports
import { BASE_ADMIN_ROLES as baseAdminRoles } from "@constants/admin/base";
import DataTable from "@components/admin/tables/shared/DataTable";
import { queryUsers } from "@constants/admin/queries";
import getUserListCsv from "@services/admin/tables/getUserListCsv";
import { Tables } from "@constants/base/database-types";
import deleteUser from "@services/admin/tables/deleteUser";

type UsersTableFeedProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function UsersTableFeed({ authenticatedUser }: UsersTableFeedProps) {
  const rowActions = [
    {
      label: "Delete user",
      onClick: deleteUser,
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
      getListCsv={getUserListCsv}
      tableName={"rmc-user-list"}
      queryOptions={() => queryUsers({role: 'user'})}
      queryKeys={[["users", { role: "user" }]]}
    />
  );
}

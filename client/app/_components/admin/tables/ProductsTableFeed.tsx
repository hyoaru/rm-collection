"use client";

import React from "react";

// App imports
import { BASE_ADMIN_ROLES as baseAdminRoles } from "@constants/admin/base";
import DataTable from "@components/admin/tables/shared/DataTable";
import { Tables } from "@constants/base/database-types";
import { queryAllProducts } from "@constants/shared/queries";
import getProductListCsv from "@services/admin/tables/getProductListCsv";
import deleteProductAndRelations from "@services/admin/tables/deleteProductAndRelations";

type ProductsTableFeedProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function ProductsTableFeed({ authenticatedUser }: ProductsTableFeedProps) {
  const rowActions = [
    {
      label: "Delete product",
      onClick: deleteProductAndRelations,
      isDestructive: true,
      adminRolesPermitted: baseAdminRoles.filter((role) => !["admin_tier_2"].includes(role)),
    },
  ];

  const columnDefinition = [
    { accessorKey: "id" },
    { accessorKey: "name" },
    { accessorKey: "category" },
    { accessorKey: "description" },
  ];

  return (
    <DataTable
      authenticatedUser={authenticatedUser}
      columnDefinition={columnDefinition}
      rowActions={rowActions}
      getListCsv={getProductListCsv}
      tableName={"rmc-product-list"}
      queryOptions={queryAllProducts}
      queryKeys={[["products"]]}
    />
  );
}

"use client";

import React from "react";

// App imports
import { BASE_ADMIN_ROLES as baseAdminRoles } from "@constants/admin/base";
import DataTable from "@components/admin/tables/shared/DataTable";
import { Tables } from "@constants/base/database-types";
import hideProductVariant from "@services/admin/tables/hideProductVariant";
import { queryProductVariants } from "@constants/shared/queries";
import deleteProductVariantAndRelations from "@services/admin/tables/deleteProductVariantAndRelations";
import getProductPostingListCsv from "@services/admin/tables/getProductPostingListCsv";

type ProductPostingsTableFeedProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function ProductPostingsTableFeed({ authenticatedUser }: ProductPostingsTableFeedProps) {
  const rowActions = [
    {
      label: "Delete product variant",
      onClick: deleteProductVariantAndRelations,
      isDestructive: true,
      adminRolesPermitted: baseAdminRoles.filter((role) => !["admin_tier_2"].includes(role)),
    },
    {
      label: "Hide from collections",
      onClick: hideProductVariant,
      isDestructive: false,
      adminRolesPermitted: baseAdminRoles,
    },
  ];

  const columnDefinition = [
    { accessorKey: "id" },
    { accessorKey: "product_id" },
    { accessorKey: "material" },
    { accessorKey: "material_property" },
    { accessorKey: "size" },
    { accessorKey: "quantity" },
    { accessorKey: "price" },
    { accessorKey: "discount_rate" },
    { accessorKey: "is_displayed" },
  ];

  return (
    <DataTable
      authenticatedUser={authenticatedUser}
      columnDefinition={columnDefinition}
      rowActions={rowActions}
      getListCsv={getProductPostingListCsv}
      tableName={"rmc-product-postings-list"}
      queryOptions={() => queryProductVariants({visibility: "shown"})}
      queryKeys={[["product_variants"], ["product_variants", {visibility: "shown"}]]}
    />
  );
}

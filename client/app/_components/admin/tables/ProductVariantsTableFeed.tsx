"use client";

import React from "react";

// App imports
import { BASE_ADMIN_ROLES as baseAdminRoles } from "@constants/admin/base";
import DataTable from "@components/admin/tables/shared/DataTable";
import { Tables } from "@constants/base/database-types";
import hideProductVariant from "@services/admin/tables/hideProductVariant";
import { queryAllProductVariants } from "@constants/shared/queries";
import deleteProductVariantAndRelations from "@services/admin/tables/deleteProductVariantAndRelations";
import showProductVariant from "@services/admin/tables/showProductVariant";
import getProductVariantListCsv from "@services/admin/tables/getProductVariantListCsv";

type ProductPostingsTableFeedProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function ProductVariantsTableFeed({ authenticatedUser }: ProductPostingsTableFeedProps) {
  const rowActions = [
    {
      label: "Delete product variant",
      onClick: deleteProductVariantAndRelations,
      isDestructive: true,
      adminRolesPermitted: baseAdminRoles.filter((role) => !["admin_tier_2"].includes(role)),
    },
    {
      label: "Show on collections",
      onClick: showProductVariant,
      isDestructive: false,
      adminRolesPermitted: baseAdminRoles,
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
      getListCsv={getProductVariantListCsv}
      tableName={"rmc-product-variants-list"}
      queryOptions={queryAllProductVariants}
      queryKeys={[["product_variants"]]}
    />
  );
}

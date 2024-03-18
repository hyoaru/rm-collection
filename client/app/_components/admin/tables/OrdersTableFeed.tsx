"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

// App imports
import { BASE_ADMIN_ROLES as baseAdminRoles } from "@constants/admin/base";
import OrdersTable from "@components/admin/tables/OrdersTable";
import { Tables } from "@constants/base/database-types";
import { formatTimestampTable } from "@lib/formatTimestamp";
import setOrderStatusAdmin from "@services/admin/tables/setOrderStatusAdmin";
import { Button } from "@components/ui/button";
import DataTableRowAction from "@components/admin/tables/shared/DataTableRowAction";
import getOrderListCsv from "@services/admin/tables/getOrderListCsv";

type OrdersTableProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function OrdersTableFeed({ authenticatedUser }: OrdersTableProps) {
  const rowActions = [
    {
      label: "Order: pending",
      onClick: (order: Tables<"orders">) => setOrderStatusAdmin({ order: order, status: "pending" }),
      isDestructive: false,
      adminRolesPermitted: baseAdminRoles
    },
    {
      label: "Order: to-ship",
      onClick: (order: Tables<"orders">) => setOrderStatusAdmin({ order: order, status: "to-ship" }),
      isDestructive: false,
      adminRolesPermitted: baseAdminRoles
    },
    {
      label: "Order: to-receive",
      onClick: (order: Tables<"orders">) => setOrderStatusAdmin({ order: order, status: "to-receive" }),
      isDestructive: false,
      adminRolesPermitted: baseAdminRoles
    },
    {
      label: "Order: cancel",
      onClick: (order: Tables<"orders">) => setOrderStatusAdmin({ order: order, status: "cancelled-by-management" }),
      isDestructive: true,
      adminRolesPermitted: baseAdminRoles
    }
  ]

  const columnDefinition: any[] = [
    { accessorKey: 'id' },
    { accessorKey: 'product_variant_id' },
    { accessorFn: (row: any) => row.users?.email, header: 'email' },
    { accessorFn: (row: any) => row.product_variants?.products.name, header: 'product_name' },
    { accessorFn: (row: any) => row.product_variants?.material, header: 'variant_material' },
    { accessorKey: 'quantity' },
    { accessorKey: 'price', header: 'price_sold_at' },
    { accessorFn: (row: any) => `${row.discount_rate}%`, header: 'discount_rate_sold_at' },
    { accessorKey: 'total_price', header: 'total_price_sold_at' },
    { accessorFn: (row: any) => row.order_status.label, header: 'status' },
    { accessorFn: (row: any) => row.orders_shipping.receiver_email, header: 'receiver_email' },
    { accessorFn: (row: any) => `${row.orders_shipping.receiver_first_name} ${row.orders_shipping.receiver_last_name}`, header: 'receiver_name' },
    { accessorFn: (row: any) => row.orders_shipping.receiver_phone_number, header: 'receiver_phone_number' },
    { accessorFn: (row: any) => `${row.orders_shipping.shipping_country}\n${row.orders_shipping.shipping_address}\n${row.orders_shipping.shipping_zip_code}`, header: 'shipping_address' },
    { accessorFn: (row: any) => formatTimestampTable(row.created_at), header: 'created_at' },
    { accessorFn: (row: any) => formatTimestampTable(row.created_at), header: 'updated_at' },
  ];

  const queryKeys = [['orders'], ["product_variants"], ["product_variants", { visibility: "shown" }]]

  columnDefinition.push({
    id: 'actions', 
    accessorFn: (row: any) => row, 
    header: '',
    cell: (info: any) => (<>
      {!['cancelled-by-user', 'cancelled-by-management'].includes(info.getValue().order_status.label)
        ? <>
          <DataTableRowAction
            rowActions={rowActions}
            data={info.getValue()}
            queryKeys={queryKeys}
            authenticatedUser={authenticatedUser}
          />
        </>
        : <>
          <Button variant={'ghost'} className={'h-8 w-8 p-0'} disabled>
            <MoreHorizontal className="h-4 w-4 text-red-600" />
          </Button>
        </>
      }
    </>)
  })

  return (
    <OrdersTable
      columnDefinition={columnDefinition}
      getListCsv={getOrderListCsv}
      tableName={"rmc-order-list"}
      queryKeys={queryKeys}
    />
  );
}

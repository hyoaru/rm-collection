import React from "react";

// App imports
import { DropdownMenuContent, DropdownMenuLabel } from "@components/ui/dropdown-menu";
import OrderStatusActionItem from "@components/shared/OrderStatusActionItem";
import setOrderGroupStatus from "@services/orders/setOrderGroupStatus";
import { OrderType } from "@constants/shared/types";

type OrderStatusActionsDropdownContentProps = {
  order: OrderType;
  queryKeys: any[][];
};

export default function OrderStatusActionsDropdownContent({
  order,
  queryKeys,
}: OrderStatusActionsDropdownContentProps) {
  return (
    <DropdownMenuContent align="end" side="top">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {["to_receive"].includes(order.order_status?.label!) && (
        <OrderStatusActionItem 
          label={"Order: complete"}
          queryKeys={queryKeys} 
          action={() => setOrderGroupStatus({ order: order, status: "completed" })}
        />
      )}
      {['pending', 'to_ship'].includes(order.order_status?.label!) && (
        <OrderStatusActionItem
          label={"Order: cancel"}
          action={() => setOrderGroupStatus({ order: order, status: "cancelled_by_user" })}
          queryKeys={queryKeys}
          isDestructive={true}
        />
      )}
    </DropdownMenuContent>
  );
}

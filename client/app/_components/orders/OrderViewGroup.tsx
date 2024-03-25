import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// App imports
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { Button } from "@components/ui/button";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { OrderType } from "@constants/shared/types";
import { queryOrdersByGroup } from "@constants/shared/queries";
import { default as OrderItem } from "@components/shared/OrderReceiptItem";
import { Skeleton } from "@components/ui/skeleton";
import MultipleOrderReceiptDialogContent from "@components/shared/MultipleOrderReceiptDialogContent";
import OrderViewGroupActionItem from "@components/orders/OrderViewGroupActionItem";
import setOrderGroupStatus from "@services/orders/setOrderGroupStatus";
import { Tables } from "@constants/base/database-types";

type OrderGroup = OrderType[] | null;

type OrderViewGroupProps = {
  order: OrderType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrderViewGroup({ order: row, isOpen, setIsOpen }: OrderViewGroupProps) {
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const { data: orderGroup, isPending } = useQuery(queryOrdersByGroup(row?.order_group, isOpen));
  const isOrderCancelled = ["cancelled-by-user", "cancelled-by-management"].includes(row?.order_status?.label!);
  const isOrderCompleted = row.order_status?.label === 'completed'

  const queryKeys = [
    ["orders"],
    ["orders_shipping"],
    ["products"],
    ["product_variants"],
    ["orders", { order_group: row.order_group }],
  ];

  const rowActions = [
    {
      label: "Order: received order",
      onClick: (order: Tables<"orders">) => setOrderGroupStatus({ order: order, status: "completed" }),
      isDisplayed: row.order_status?.label === "to-receive",
      isDestructive: false,
    },
    {
      label: "Order: cancel order",
      onClick: (order: Tables<"orders">) => setOrderGroupStatus({ order: order, status: "cancelled-by-user" }),
      isDisplayed: ["pending", "to-ship"].includes(row.order_status?.label ?? "-"),
      isDestructive: true,
    },
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"text-sm font-normal text-center"}>{`Order group #${row.order_group}`}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[300px] p-4 border rounded-xl">
            <div className="space-y-2">
              {isPending ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton className="rounded-lg w-full h-[75px]" key={`OrderItemSkeleton-${index}`} />
                  ))
              ) : (
                <>
                  {orderGroup?.data &&
                    orderGroup?.data?.map((order) => <OrderItem order={order} key={`OrderItem-${order.id}`} />)}
                </>
              )}
            </div>
            <ScrollBar />
          </ScrollArea>
          <DialogFooter>
            <div className="grid grid-cols-12 gap-4 w-full">
              <div className="col-span-8 ">
                <Button className="w-full" onClick={() => setIsReceiptModalOpen(true)}>
                  View receipt
                </Button>
              </div>
              <div className="col-span-4">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full" variant={"secondary"} disabled={isOrderCancelled || isOrderCompleted}>
                      Set order status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" side="top">
                    {!isOrderCancelled &&
                      rowActions?.map((rowAction) => (
                        <OrderViewGroupActionItem
                          key={`OrderViewGroupActionItem-${rowAction.label}`}
                          rowAction={rowAction}
                          queryKeys={queryKeys}
                          data={row}
                        />
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {orderGroup?.data && (
        <Dialog open={isReceiptModalOpen} onOpenChange={setIsReceiptModalOpen}>
          <MultipleOrderReceiptDialogContent orders={orderGroup?.data as OrderGroup} />
        </Dialog>
      )}
    </>
  );
}

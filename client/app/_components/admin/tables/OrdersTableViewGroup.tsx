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
import { Tables } from "@constants/base/database-types";
import { DataTableRowActionType } from "@constants/admin/types";
import SetOrderStatusActionItem from "@components/admin/tables/SetOrderStatusActionItem";

type OrderGroup = OrderType[] | null;

type OrdersTableViewGroupProps = {
  order: OrderType;
  rowActions: DataTableRowActionType[];
  authenticatedUser: Tables<"users">;
  queryKeys: any[][];
};

export default function OrdersTableViewGroup({
  queryKeys,
  authenticatedUser,
  rowActions,
  order: row,
}: OrdersTableViewGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: orderGroup, isPending } = useQuery(queryOrdersByGroup(row?.order_group, isOpen));
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const isOrderCancelled = ['cancelled-by-user', 'cancelled-by-management'].includes(row?.order_status?.label!)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"}>View group</Button>
        </DialogTrigger>
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
                    <Button className="w-full" variant={"secondary"} disabled={isOrderCancelled}>
                      Set order status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {!isOrderCancelled && rowActions?.map((rowAction) => (
                      <SetOrderStatusActionItem
                        key={`SetOrderStatusActionItem-${rowAction.label}`}
                        authenticatedUser={authenticatedUser!}
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

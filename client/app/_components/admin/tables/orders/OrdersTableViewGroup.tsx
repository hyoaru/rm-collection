import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// App imports
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import OrderStatusActionsDropdownContent from "@components/admin/tables/orders/OrderStatusActionsDropdownContent";
import MultipleOrderReceiptDialogContent from "@components/shared/MultipleOrderReceiptDialogContent";
import { querySyncOrderBillingMayaPaymentStatus } from "@constants/shared/billing/queries";
import { DropdownMenu, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { default as OrderItem } from "@components/shared/OrderReceiptItem";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { queryOrdersByGroup } from "@constants/shared/queries";
import { Tables } from "@constants/base/database-types";
import { OrderType } from "@constants/shared/types";
import { Skeleton } from "@components/ui/skeleton";
import { Button } from "@components/ui/button";

type OrderGroup = OrderType[] | null;

type OrdersTableViewGroupProps = {
  order: OrderType;
  authenticatedUser: Tables<"users">;
  queryKeys: any[][];
};

export default function OrdersTableViewGroup({
  queryKeys,
  authenticatedUser,
  order: row,
}: OrdersTableViewGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const isOrderCancelled = ["cancelled-by-user", "cancelled-by-management"].includes(row?.order_status?.label!);

  const { data: orderGroup, isPending } = useQuery(queryOrdersByGroup({
    orderGroup: row?.order_group, 
    isEnabled: isOpen
  }));

  useQuery(querySyncOrderBillingMayaPaymentStatus({
    order: orderGroup?.data?.[0]!,
    isEnabled: orderGroup ? true : false
  }));

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
                  {!isOrderCancelled && (
                    <OrderStatusActionsDropdownContent
                      order={row}
                      queryKeys={queryKeys}
                      authenticatedUser={authenticatedUser}
                    />
                  )}
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

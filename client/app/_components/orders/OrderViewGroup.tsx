import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// App imports
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@components/ui/dialog";
import MultipleOrderReceiptDialogContent from "@components/shared/MultipleOrderReceiptDialogContent";
import OrderStatusActionsDropdownContent from "@components/orders/OrderStatusActionsDropdownContent";
import { querySyncOrderBillingMayaPaymentStatus } from "@constants/shared/billing/queries";
import { DropdownMenu, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { default as OrderItem } from "@components/shared/OrderReceiptItem";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { queryOrdersByGroup } from "@constants/shared/queries";
import { OrderType } from "@constants/shared/types";
import { Skeleton } from "@components/ui/skeleton";
import { Button } from "@components/ui/button";


type OrderGroup = OrderType[] | null;

type OrderViewGroupProps = {
  order: OrderType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrderViewGroup({ order: row, isOpen, setIsOpen }: OrderViewGroupProps) {
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const isOrderCancelled = ["cancelled-by-user", "cancelled-by-management"].includes(row?.order_status?.label!);
  const isOrderCompleted = row.order_status?.label === "completed";
  
  const { data: orderGroup, isPending } = useQuery(queryOrdersByGroup({
    orderGroup: row?.order_group,
    isEnabled: isOpen,
  }));

  useQuery(querySyncOrderBillingMayaPaymentStatus({
    order: orderGroup?.data?.[0]!,
    isEnabled: orderGroup ? true : false
  }));
  
  const queryKeys = [
    ["orders"],
    ["orders_shipping"],
    ["products"],
    ["product_variants"],
    ["orders", { order_group: row.order_group }],
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
                  <OrderStatusActionsDropdownContent order={row} queryKeys={queryKeys} />
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

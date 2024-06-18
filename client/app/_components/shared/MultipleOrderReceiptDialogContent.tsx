"use client";

import React from "react";
import { Check, X, LoaderCircle } from "lucide-react";

// App imports
import { OrderReceiptDialogContent } from "@components/shared/OrderReceiptDialogContent";
import createMayaCheckout from "@services/shared/createMayaCheckout";
import OrderReceiptItem from "@components/shared/OrderReceiptItem";
import { useToast } from "@components/ui/use-toast";
import { OrderType } from "@constants/shared/types";
import { Button } from "@components/ui/button";
import { DialogContent } from "@components/ui/dialog";
import { Skeleton } from "@components/ui/skeleton";

type MultipleOrderReceiptDialogContentProps = {
  orders: OrderType[] | null;
  isLoading?: boolean;
};

export default function MultipleOrderReceiptDialogContent({
  orders,
  isLoading,
}: MultipleOrderReceiptDialogContentProps) {
  const totalCost = orders?.reduce((accumulator, currentOrder) => accumulator + (currentOrder.total_price ?? 0), 0);
  const { toast } = useToast();

  if (isLoading) {
    return (
      <DialogContent>
        <div className="relative">
          <div className="absolute w-full h-full z-10">
            <div className="h-full w-full flex justify-center items-center">
              <div className="w-8/12 sm:w-6/12 mx-auto flex flex-col gap-2 items-center bg-background rounded-lg p-5">
                <LoaderCircle size={50} className="animate-spin text-primary" />
                <div className="">
                  <p className="text-primary text-sm text-center font-semibold">Processing order.</p>
                  <p className="text-primary text-sm text-center">This might take a while.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="w-10/12 h-[1rem]" />
            <Skeleton className="w-8/12 h-[2rem]" />
            <Skeleton className="w-9/12 h-[0.5rem]" />
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Skeleton className="w-full h-[3rem] rounded-xl" />
            <Skeleton className="w-full h-[3rem] rounded-xl" />
            <Skeleton className="w-full h-[3rem] rounded-xl" />
            <Skeleton className="w-full h-[3rem] rounded-xl" />
          </div>
          <Skeleton className="mt-4 w-full h-[6rem] rounded-xl" />
          <div className="flex flex-col items center gap-2">
            <Skeleton className="mt-4 w-full h-[2.5rem] rounded-xl" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-10/12 h-[2.5rem] rounded-xl" />
              <Skeleton className="w-2/12 h-[2.5rem] rounded-xl" />
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }

  async function proceedToPayment() {
    if (!orders) return;

    await createMayaCheckout({ orders: orders }).then(({ data, error }) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error has occured.",
          description: "Please try again later.",
        });
      } else {
        toast({
          title: "Payment session created.",
          description: "Redirecting to payment gateway.",
        });

        window.open(data?.redirectUrl, "_blank");
      }
    });
  }

  return (
    <OrderReceiptDialogContent orderGroup={orders?.[0].order_group ?? "-"}>
      <OrderReceiptDialogContent.BodyHeader>
        <>
          {`Order ${orders?.[0].order_status?.label.toLowerCase().replaceAll("_", " ")} `}
          {orders?.[0].status_id! <= 1 ? (
            <X className="inline align-middle p-1 bg-red-600 rounded-full text-background" />
          ) : (
            <Check className="inline align-middle p-1 bg-green-600 rounded-full text-background" />
          )}
        </>
      </OrderReceiptDialogContent.BodyHeader>
      <OrderReceiptDialogContent.Body user={orders?.[0].users} ordersShipping={orders?.[0].orders_shipping!}>
        {orders && orders.map((order) => <OrderReceiptItem order={order} key={`OrderItem-${order.id}`} />)}
      </OrderReceiptDialogContent.Body>
      <OrderReceiptDialogContent.BodyFooter
        subtotal={totalCost ?? 0}
        totalCost={totalCost ?? 0}
        deliveryFee={"Quoted after order"}
      />
      {orders?.[0] && ["pending"].includes(orders?.[0].order_status?.label!) && (
        <>
          <Button
            type="button"
            variant={"outline"}
            className="w-full mt-4 text-primary font-bold hover:text-primary"
            onClick={proceedToPayment}
          >
            Proceed with payment
          </Button>
        </>
      )}
    </OrderReceiptDialogContent>
  );
}

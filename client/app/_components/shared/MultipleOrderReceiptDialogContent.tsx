"use client";

import React from "react";
import { Check, X } from "lucide-react";

// App imports
import { OrderReceiptDialogContent } from "@components/shared/OrderReceiptDialogContent";
import createMayaCheckout from "@services/shared/createMayaCheckout";
import OrderReceiptItem from "@components/shared/OrderReceiptItem";
import { useToast } from "@components/ui/use-toast";
import { OrderType } from "@constants/shared/types";
import { Button } from "@components/ui/button";

type MultipleOrderReceiptDialogContentProps = {
  orders: OrderType[] | null;
};

export default function MultipleOrderReceiptDialogContent({ orders }: MultipleOrderReceiptDialogContentProps) {
  const totalCost = orders?.reduce((accumulator, currentOrder) => accumulator + (currentOrder.total_price ?? 0), 0);
  const { toast } = useToast();

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

        window.open(data?.redirectUrl, '_blank')
      }
    });
  }

  return (
    <OrderReceiptDialogContent orderGroup={orders?.[0].order_group ?? "-"}>
      <OrderReceiptDialogContent.BodyHeader>
        <>
          {`Order ${orders?.[0].order_status?.label.toLowerCase().replaceAll("-", " ")} `}
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

"use client";

import React from "react";
import { Check, X } from "lucide-react";

// App imports
import { OrderReceiptDialogContent } from "@components/shared/OrderReceiptDialogContent";
import OrderReceiptItem from "@components/shared/OrderReceiptItem";
import { OrderType } from "@constants/shared/types";

type MultipleOrderReceiptDialogContentProps = {
  orders: OrderType[] | null;
};

export default function MultipleOrderReceiptDialogContent({ orders }: MultipleOrderReceiptDialogContentProps) {
  const totalCost = orders?.reduce((accumulator, currentOrder) => accumulator + (currentOrder.total_price ?? 0), 0);

  return (
    <OrderReceiptDialogContent userId={orders?.[0].user_id ?? "deleted-user"}>
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
    </OrderReceiptDialogContent>
  );
}

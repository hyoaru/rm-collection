import { QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

// App imports
import syncOrderBillingMayaPaymentStatus from "@services/shared/syncOrderBillingMayaPaymentStatus";
import getOrdersByGroupServer from "@services/shared/getOrdersByGroupServer";
import { OrderType } from "@constants/shared/types";
import { Button } from "@components/ui/button";

export default async function page({ searchParams }: { searchParams?: { orderGroup: string } }) {
  const orderGroup = searchParams?.orderGroup;
  const queryClient = new QueryClient();

  if (!orderGroup) {
    return notFound();
  }

  await getOrdersByGroupServer(orderGroup).then(async ({ data, error }) => {
    if (data) {
      await syncOrderBillingMayaPaymentStatus({ order: data[0] as OrderType });
      await queryClient.invalidateQueries({ queryKey: ["orders", "orders_billing", "orders_shipping"] });
    }
  });

  return (
    <div className="md:container mx-auto px-2 md:px-4 mt-6 sm:mt-14 mb-8">
      <X className="p-1 w-[100px] h-[100px] bg-gray-600 rounded-full mx-auto md:w-[100px] md:h-[100px] text-background" />
      <p className="text-3xl text-primary capitalize font-bold text-center mt-6 lg:text-4xl">Billing Cancelled</p>
      <div className="mx-auto sm:w-8/12 md:w-5/12 mt-4">
        <p className="text-center text-sm md:text-base">
          Your order billing process was cancelled. We were unable to process your payment successfully. Please click
          the `Proceed with payment` button again in your order receipt to make a new transaction.
        </p>
      </div>
      <div className="w-max mx-auto mt-10">
        <Link href={"/orders"}>
          <Button variant={"secondary"} size={"lg"}>
            Go to orders
          </Button>
        </Link>
      </div>
    </div>
  );
}

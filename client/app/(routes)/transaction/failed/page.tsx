import { QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

// App imports
import syncOrderBillingMayaPaymentStatus from "@services/shared/syncOrderBillingMayaPaymentStatus";
import { Button } from "@components/ui/button";

export default async function page({ searchParams }: { searchParams?: { id: string; checkoutId: string } }) {
  const orderBillingId = searchParams?.id;
  const orderBillingCheckoutId = searchParams?.checkoutId;
  const queryClient = new QueryClient();

  if (!orderBillingId || !orderBillingCheckoutId) {
    return notFound();
  }

  await syncOrderBillingMayaPaymentStatus({ id: orderBillingId, checkoutId: orderBillingCheckoutId });
  await queryClient.invalidateQueries({ queryKey: ["orders", "orders_billing", "orders_shipping"] });

  return (
    <div className="md:container mx-auto px-2 md:px-4 mt-6 sm:mt-14 mb-8">
      <X className="p-1 w-[100px] h-[100px] bg-red-600 rounded-full mx-auto md:w-[100px] md:h-[100px] text-background" />
      <p className="text-3xl text-primary capitalize font-bold text-center mt-6 lg:text-4xl">Billing Failed</p>
      <div className="mx-auto sm:w-8/12 md:w-5/12 mt-4">
        <p className="text-center text-sm md:text-base">
        We&apos;re excited to process your order and prepare it for shipment. 
        However, we encountered a billing issue while processing your payment. 
        Please click the `Proceed with payment` button again in your order receipt to make a new transaction.
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

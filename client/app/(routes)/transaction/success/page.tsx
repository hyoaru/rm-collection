import { QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
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
      <Check className="p-1 w-[100px] h-[100px] bg-green-600 rounded-full mx-auto md:w-[100px] md:h-[100px] text-background" />
      <p className="text-3xl text-primary capitalize font-bold text-center mt-6 lg:text-4xl">Purchase Successful</p>
      <div className="mx-auto sm:w-8/12 md:w-5/12 mt-4">
        <p className="text-center text-sm md:text-base">
          Thank you for shopping with us. We are processing your order and are getting it ready to be shipped. We will
          notify you once it's on the way.
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

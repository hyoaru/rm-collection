"use client";

import { User, Lock } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

// App imports
import { DropdownMenuContent } from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { Tables } from "@constants/base/database-types";
import CartItem from "@components/shared/CartItem";
import { queryCart } from "@constants/shared/queries";
import { Skeleton } from "@components/ui/skeleton";

type CartItemType = Tables<"cart"> & {
  product_variants: Tables<"product_variants"> & {
    products: Tables<"products">;
  };
};

export default function MainNavEndCartDropdownContent() {
  const { data: cart, isPending } = useQuery(queryCart());

  if (isPending) {
    return (
      <>
        <DropdownMenuContent side={"bottom"} align={"end"} className={"w-screen sm:w-[23rem] "}>
          <Skeleton className="w-full h-[15rem]" />
        </DropdownMenuContent>
      </>
    );
  }

  return (
    <>
      <DropdownMenuContent side={"bottom"} align={"end"} className={"w-screen sm:w-[23rem] "}>
        <div className="p-2">
          {!cart?.data?.[0] ? (
            <>
              <h1 className="text-center font-bold text-xl text-muted-foreground p-5">No items yet</h1>
            </>
          ) : (
            <>
              <ScrollArea className={"h-[20rem]"}>
                {cart?.data &&
                  cart.data.map((cartItem) => {
                    return <CartItem key={`CartItem-${cartItem.id}`} cartItem={cartItem as CartItemType} />;
                  })}
              </ScrollArea>
              <div className="flex justify-center py-3">
                <Link href={"/checkout"} className="">
                  <Button size={"sm"}>Proceed to checkout</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </>
  );
}

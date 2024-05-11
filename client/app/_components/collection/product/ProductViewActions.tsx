"use client";

import React, { useState } from "react";

// App imports
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";
import { Tables } from "@constants/base/database-types";
import useAddToCart from "@hooks/collection/useAddToCart";

type ProductViewActionsProps = {
  product: Tables<"products">;
  productVariant: Tables<"product_variants">;
  authenticatedUser: Tables<"users">;
};

export default function ProductViewActions({ product, productVariant, authenticatedUser }: ProductViewActionsProps) {
  const [orderQuantity, setOrderQuantity] = useState(productVariant.quantity > 0 ? 1 : 0);
  const isOutOfStock = productVariant.quantity <= 0;
  const addToCartMutation = useAddToCart();
  const { toast } = useToast();

  function onOrderQuantityIncrease() {
    if (orderQuantity >= productVariant.quantity) return;
    setOrderQuantity((previousOrderQuantity) => previousOrderQuantity + 1);
  }

  function onOrderQuantityDecrease() {
    if (orderQuantity <= 1) return;
    setOrderQuantity((previousOrderQuantity) => previousOrderQuantity - 1);
  }

  async function onAddToCart() {
    await addToCartMutation
      .mutateAsync({
        userId: authenticatedUser.id,
        variantId: productVariant.id,
        quantity: orderQuantity,
      })
      .then(async ({ error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: error?.message ?? "Please try again later.",
          });
        } else {
          toast({
            title: `${product.name} ${productVariant.material}-${productVariant.material_property} added to cart.`,
          });
        }
      });
  }

  return (
    <>
      <div className="flex items-center">
        <p className="me-auto font-semibold">Quantity</p>
        <div className="flex items-center gap-x-6">
          <Button size={"sm"} variant={"secondary"} onClick={onOrderQuantityDecrease}>
            -
          </Button>
          <p className="font-semibold">{orderQuantity}</p>
          <Button size={"sm"} variant={"secondary"} onClick={onOrderQuantityIncrease}>
            +
          </Button>
        </div>
      </div>
      <Button
        size={"lg"}
        className={"w-full"}
        onClick={onAddToCart}
        disabled={addToCartMutation.isPending || isOutOfStock}
      >
        {isOutOfStock ? "Out of stock" : `₱ ${productVariant.discounted_price!.toLocaleString()} ・ Add to cart`}
      </Button>
    </>
  );
}

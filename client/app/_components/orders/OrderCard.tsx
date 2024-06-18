import React, { useState } from "react";
import { Menu } from "lucide-react";

// App imports
import { ProductCard as BaseProductCard } from "@components/shared/ProductCard";
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl";
import { cn } from "@lib/utils";
import { OrderType } from "@constants/shared/types";
import { Badge } from "@components/ui/badge";
import OrderViewGroup from "@components/orders/OrderViewGroup";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";

type OrderCardProps = {
  order: OrderType;
  classNames?: {
    card: {
      image?: string;
      base?: string;
    };
  };
};

export default function OrderCard({ order, classNames }: OrderCardProps) {
  const thumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: order.product_variants?.product_id ?? "" });
  const [isGroupViewOpen, setIsGroupViewOpen] = useState(false);

  return (
    <>
      <div className="relative break-inside-avoid-column">
        <div className="absolute top-2 right-2 z-10 md:top-3 md:right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-secondary p-2 rounded-lg group/trigger">
                <Menu
                  size={20}
                  className="transition-all duration-300 ease-in-out group-hover/trigger:text-background"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsGroupViewOpen(true)}>View order group</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <BaseProductCard
          productId={order.product_variants?.product_id ?? "-"}
          className={cn(
            "bg-white bg-opacity-5 shadow-[rgba(137,_24,_31,_0.03)_0px_3px_11px] transition-all duration-500 ease-in-out hover:scale-105 hover:bg-opacity-100 md:shadow-[rgba(137,_24,_31,_0.05)_0px_7px_22px]",
            classNames?.card.base
          )}
        >
          <BaseProductCard.Image src={thumbnailPublicUrl} classNames={{ image: classNames?.card.image }} />
          <BaseProductCard.Subtext className="normal-case">{`${order.product_variants?.material} - ${order.product_variants?.material_property}`}</BaseProductCard.Subtext>
          <div className="flex items-center">
            <BaseProductCard.Title className="w-max me-auto">
              {`${order.product_variants?.products?.name}`}
            </BaseProductCard.Title>
            <Badge variant={"secondary"}>{`# ${order.quantity}`}</Badge>
          </div>
          <BaseProductCard.PriceGroup
            price={order.price}
            discountRate={order.discount_rate}
            discountedPrice={order.discounted_price!}
          />
        </BaseProductCard>
      </div>

      <OrderViewGroup order={order} isOpen={isGroupViewOpen} setIsOpen={setIsGroupViewOpen} />
    </>
  );
}

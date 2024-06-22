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
        <div className="absolute p-3 z-10">
          <p className="px-2 py-1 bg-secondary text-primary font-bold w-max text-xs rounded-md">{order.discount_rate}% off</p>
        </div>
        <div className="absolute top-0 right-0 z-10 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="transition-all duration-300 ease-in-out bg-secondary p-2 rounded-md group/trigger">
                <Menu
                  size={19}
                  className="transition-all duration-300 ease-in-out text-primary group-hover/trigger:text-primary"
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
            "h-full bg-transparent",
            classNames?.card.base
          )}
        >
          <BaseProductCard.Image src={thumbnailPublicUrl} classNames={{ image: classNames?.card.image }} />
          <div className="mt-2">
            <div className="grid grid-cols-12">
              <div className="col-span-9">
                <BaseProductCard.Title className="me-auto">
                  {`${order.product_variants?.products?.name}`}
                </BaseProductCard.Title>
              </div>
              <div className="col-span-3 items-center flex justify-end">
                <p className="rounded-md w-max border py-[0.1rem] text-xs px-2" >{`# ${order.quantity}`}</p>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center">
              <div className="col-span-9">
                <BaseProductCard.Subtext className="normal-case w-max me-auto">{`${order.product_variants?.material} - ${order.product_variants?.material_property}`}</BaseProductCard.Subtext>
              </div>
              <div className="col-span-3 items-center flex justify-end">
                <p className="rounded-md border py-[0.1rem] text-xs px-2">{`₱ ${order.discounted_price?.toLocaleString()}`}</p>
              </div>
            </div>
            
          </div>
        </BaseProductCard>
      </div>

      <OrderViewGroup order={order} isOpen={isGroupViewOpen} setIsOpen={setIsGroupViewOpen} />
    </>
  );
}

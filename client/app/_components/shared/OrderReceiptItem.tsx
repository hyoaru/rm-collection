import React from "react";
import Image from "next/image";

// App imports
import { OrderType } from "@constants/shared/types";
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl";

type OrderReceiptItemProps = {
  order: OrderType | null;
};

export default function OrderReceiptItem({ order }: OrderReceiptItemProps) {
  const productThumbnailPublicUrl = getProductThumbnailPublicUrl({
    productId: order?.product_variants?.products?.id ?? "-",
  });

  return (
    <div className="col-span-12 grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <Image
          width={100}
          height={100}
          src={productThumbnailPublicUrl}
          className="object-cover rounded-lg h-full"
          alt=""
        />
      </div>
      <div className="col-span-9">
        <div className="flex h-full w-full">
          <div className="my-auto">
            <p className="text-xs text-muted-foreground">{`Order #${order?.id}`}</p>
            <p className="font-semibold text-sm">{order?.product_variants?.products?.name ?? "deleted-product"}</p>
            <p className="text-xs">
              {order?.quantity} unit - {order?.product_variants?.material}-{order?.product_variants?.material_property}{" "}
              : {order?.product_variants?.size}
            </p>
            <div className="flex items-center gap-x-2">
              <p className="text-xs">{`₱ ${order?.price.toLocaleString()}`}</p>
              <p className="text-xs">{`${order?.discount_rate}% off`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

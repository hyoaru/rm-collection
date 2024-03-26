import React from "react";
import dayjs from "dayjs";

// App imports
import { ProductCard as BaseProductCard } from "@components/shared/ProductCard";
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl";
import { Tables } from "@constants/base/database-types";
import { cn } from "@lib/utils";

type ProductCardProps = {
  product: Tables<"products"> & { product_variants: Tables<"product_variants">[] };
  classNames?: { image?: string; base?: string };
};

export default function ProductCard({ product, classNames }: ProductCardProps) {
  const thumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: product.id });
  const formattedDate = dayjs(product.created_at).format("MMM YYYY");
  const productVariantsWithDiscountedPricesSorted = product.product_variants.sort((x, y) => x.discounted_price! - y.discounted_price!);
  const lowestDiscountedProductVariant = productVariantsWithDiscountedPricesSorted[0];

  return (
    <BaseProductCard
      productId={product.id}
      className={cn(
        "bg-white bg-opacity-5 shadow-[rgba(137,_24,_31,_0.03)_0px_3px_11px] transition-all duration-500 ease-in-out hover:scale-105 hover:bg-opacity-100 md:shadow-[rgba(137,_24,_31,_0.05)_0px_7px_22px]",
        classNames?.base
      )}
    >
      <BaseProductCard.Image src={thumbnailPublicUrl} classNames={{ image: classNames?.image }} />
      <BaseProductCard.Subtext>{`${product.category} ・ ${formattedDate}`}</BaseProductCard.Subtext>
      <BaseProductCard.Title>{product.name}</BaseProductCard.Title>
      <BaseProductCard.PriceGroup
        price={lowestDiscountedProductVariant.price}
        discountRate={lowestDiscountedProductVariant.discount_rate}
        discountedPrice={lowestDiscountedProductVariant.discounted_price!}
      />
    </BaseProductCard>
  );
}

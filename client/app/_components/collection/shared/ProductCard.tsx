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
      className={cn( "h-full z-20 bg-transparent", classNames?.base )}
    >
      <div className="relative w-full">
        {lowestDiscountedProductVariant.discount_rate > 0 && (
          <div className="absolute w-full p-3 z-10">
            <p className="px-2 py-1 bg-secondary text-primary font-bold w-max text-xs rounded-md">Sale {lowestDiscountedProductVariant.discount_rate}% off</p>
          </div>
        )}
        <BaseProductCard.Image src={thumbnailPublicUrl} classNames={{ base: classNames?.image }} />
      </div>
      {/* <BaseProductCard.Subtext>{`${product.category} ・ ${formattedDate}`}</BaseProductCard.Subtext> */}
      <div className="grid items-center grid-cols-12 mt-2">
        <div className="col-span-6 lg:col-span-7 xl:col-span-8">
          <BaseProductCard.Title >{product.name}</BaseProductCard.Title>
        </div>
        <div className="col-span-6 lg:col-span-5 xl:col-span-4 items-center flex justify-end">
          <BaseProductCard.PriceGroup
            price={lowestDiscountedProductVariant.price}
            discountRate={lowestDiscountedProductVariant.discount_rate}
            discountedPrice={lowestDiscountedProductVariant.discounted_price!}
          />
        </div>
      </div>
    </BaseProductCard>
  );
}

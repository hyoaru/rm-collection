import React, { HTMLAttributes } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// App imports
import { cn } from "@lib/utils";
import { Badge } from "@components/ui/badge";

type ProductCardProps = HTMLAttributes<HTMLDivElement> & { productId: string };

type ProductCardImageProps = {
  src: string | StaticImageData;
  classNames?: {
    base?: string;
    image?: string;
  };
};

type ProductCardTitleProps = HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

type ProductCardSubtextProps = HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

type ProductCardPriceGroupProps = {
  price: number;
  discountRate: number;
  discountedPrice?: number;
};

export const ProductCard = ({ children, className, productId }: ProductCardProps) => {
  return (
    <Link href={`/collection/product/${productId}`} className="block">
      <div
        className={cn(
          "rounded-md break-inside-avoid-column",
          className
        )}
      >
        {children}
      </div>
    </Link>
  );
};

const ProductCardImage = ({ src, classNames }: ProductCardImageProps) => {
  return (
    <div className={cn("rounded-md overflow-hidden ", classNames?.base)}>
      <Image
        className={cn("object-cover w-full h-full transition-all duration-500 ease-in-out hover:scale-105", classNames?.image)}
        width={800}
        height={800}
        src={src}
        alt=""
      />
    </div>
  );
};

const ProductCardTitle = ({ children, className }: ProductCardTitleProps) => {
  return <p className={cn("font-semibold text-sm md:text-lg break-words w-full capitalize text-primary", className)}>{children}</p>;
};

const ProductCardSubtext = ({ children, className }: ProductCardSubtextProps) => {
  return <p className={cn("opacity-50 text-xs md:text-sm capitalize", className)}>{children}</p>;
};

const ProductCardPriceGroup = ({
  price,
  discountRate,
  discountedPrice,
}: ProductCardPriceGroupProps) => {
  return (
    <>
    <div className="flex gap-2 items-center opacity-50">
      <p className="font-semibold text-sm md:text-base">{"₱"} {discountedPrice?.toLocaleString()}</p>
      {discountRate > 0 && (
        <p className="text-xs line-through">{"₱"} {price?.toLocaleString()}</p>
      )}
    </div>
    </>
  );
};

ProductCard.Image = ProductCardImage;
ProductCard.Title = ProductCardTitle;
ProductCard.Subtext = ProductCardSubtext;
ProductCard.PriceGroup = ProductCardPriceGroup;
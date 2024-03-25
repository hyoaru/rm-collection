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
          "rounded-xl p-3 w-[300px] bg-white break-inside-avoid-column transition-all duration-500 ease-in-out md:p-5 hover:scale-105 ",
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
    <div className={cn("rounded-xl w-full overflow-hidden ", classNames?.base)}>
      <Image
        className={cn("object-cover w-full transition-all duration-500 ease-in-out hover:scale-105", classNames?.image)}
        width={800}
        height={800}
        src={src}
        alt=""
      />
    </div>
  );
};

const ProductCardTitle = ({ children, className }: ProductCardTitleProps) => {
  return <p className={cn("font-bold text-primary text-lg break-words w-full capitalize sm:text-xl", className)}>{children}</p>;
};

const ProductCardSubtext = ({ children, className }: ProductCardSubtextProps) => {
  return <p className={cn("opacity-50 text-sm mt-3 capitalize", className)}>{children}</p>;
};

const ProductCardPriceGroup = ({
  price,
  discountRate,
  discountedPrice,
}: ProductCardPriceGroupProps) => {
  return (
    <>
      <div className="grid grid-cols-12 items-center mt-1">
        <div className="col-span-6 flex gap-2 opacity-50 text-sm">
          {discountRate > 0 && (
            <>
              <p className="">{`${discountRate}% off`}</p>
              <p className="line-through">
                {"₱"} {price.toLocaleString()}
              </p>
            </>
          )}
        </div>
        <div className="col-span-6 flex">
          <Badge className="ms-auto" variant="secondary">
            {"₱"} {discountedPrice?.toLocaleString()}
          </Badge>
        </div>
      </div>
    </>
  );
};

ProductCard.Image = ProductCardImage;
ProductCard.Title = ProductCardTitle;
ProductCard.Subtext = ProductCardSubtext;
ProductCard.PriceGroup = ProductCardPriceGroup;
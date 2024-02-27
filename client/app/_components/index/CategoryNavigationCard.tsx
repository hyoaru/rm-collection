import React, { HTMLAttributes } from "react";
import Image from "next/image";

// App imports
import { cn } from "@lib/utils";

type CategoryNavigationCardProps = {
  imageSrc: string;
  label: string;
  classNames?: {
    base?: HTMLAttributes<HTMLDivElement>['className'];
    image?: HTMLAttributes<HTMLDivElement>['className'];
  };
};

export default function CategoryNavigationCard({ imageSrc, label, classNames }: CategoryNavigationCardProps) {
  return (
    <>
      <div className={cn("relative overflow-hidden rounded-xl", classNames?.base)}>
        <div className="absolute bottom-0 ms-4 mb-4 z-10 md:mb-6">
          <p className="text-lg font-bold text-background sm:text-xl lg:text-2xl">{label}</p>
        </div>
        <Image
          className={cn("object-cover hover:duration-500 hover:transition-all hover:ease-in-out hover:scale-105 hover:blur-[2px]", classNames?.image)}
          src={imageSrc}
          height={400}
          width={250}
          alt=""
        />
      </div>
    </>
  );
}

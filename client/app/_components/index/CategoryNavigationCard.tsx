import React, { HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";

// App imports
import { cn } from "@lib/utils";

type CategoryNavigationCardProps = {
  imageSrc: string;
  label: string;
  link: string;
  classNames?: {
    base?: HTMLAttributes<HTMLDivElement>["className"];
    image?: HTMLAttributes<HTMLDivElement>["className"];
  };
};

export default function CategoryNavigationCard({ imageSrc, label, classNames, link }: CategoryNavigationCardProps) {
  return (
    <>
      <Link href={link} className={cn(classNames?.base, "overflow-hidden rounded-xl shadow-[rgba(137,_24,_31,_0.03)_0px_3px_11px] hover:scale-[1.025] duration-500 transition-all ease-in-out md:shadow-[rgba(137,_24,_31,_0.05)_0px_7px_22px]")}>
        <div className={"relative overflow-hidden rounded-xl h-full"}>
          <div className="absolute bottom-0 ms-4 mb-4 z-10 md:mb-6">
            <p className="text-lg font-bold text-background sm:text-xl lg:text-2xl">{label}</p>
          </div>
          <Image
            className={cn("object-cover duration-500 transition-all ease-in-out hover:scale-105 ", classNames?.image)}
            src={imageSrc}
            height={800}
            width={800}
            alt=""
          />
        </div>
      </Link>
    </>
  );
}

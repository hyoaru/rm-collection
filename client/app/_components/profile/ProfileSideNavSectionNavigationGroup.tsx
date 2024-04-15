"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftOpen } from "lucide-react";

// App imports
import { cn } from "@lib/utils";

type ProfileSideNavSectionNavigationGroupProps = {
  sectionTitle: string;
  navigations: {
    pathName: string;
    name: string;
  }[];
};

export default function ProfileSideNavSectionNavigationGroup({
  sectionTitle,
  navigations,
}: ProfileSideNavSectionNavigationGroupProps) {
  const pathname = usePathname()
  
  return (
    <>
      <div className="px-5 flex flex-row overflow-x-auto rounded-lg sm:flex-col xl:pl-8 xl:pr-10">
        <small className="mb-3 text-primary-foreground text-lg font-bold capitalize hidden sm:flex sm:items-center sm:gap-2">
          <PanelLeftOpen size={20} strokeWidth={2} />
          {sectionTitle}
        </small>
        <div className="flex flex-col gap-2">
          {navigations.map((navigation) => {
            const isLinkActive = pathname == navigation.pathName

              return (
                <Link
                  key={`SideNavExpandedNavigation-${navigation.name}`}
                  href={navigation.pathName}
                  className={cn(
                    "text-primary-foreground text-sm p-1 px-3 rounded-lg border flex gap-2 items-center hover:bg-secondary hover:text-primary transition-all duration-500 ease-in-out",
                    isLinkActive && "bg-secondary text-primary"
                  )}
                >
                  {navigation.name}
                </Link>
              );
          })}
        </div>
      </div>
    </>
  );
}

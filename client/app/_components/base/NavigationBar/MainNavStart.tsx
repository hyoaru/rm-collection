import React from "react";
import Link from "next/link";
import { AlignLeft, Search } from "lucide-react";

// App imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { Button } from "@components/ui/button";
import { MAIN_NAVIGATION as navigation } from "@constants/base/constants";

export default function MainNavStart() {
  return (
    <>
      <div id="main-nav-start" className="flex justify-start items-center w-1/6 md:w-2/6 xl:w-1/3">
        <div id="main-nav-start-expanded" className="hidden lg:flex">
          {navigation.map((nav, index) => (
            <Link href={nav.link} key={`MainNavStartLinkExpanded-${index}`} className="">
              <Button variant={"ghost"} className={"px-3 text-sm lg:px-[0.35rem] xl:px-2"}>
                {nav.name}
              </Button>
            </Link>
          ))}
        </div>

        <div id="main-nav-start-collapsed" className="flex items-center lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-1 sm:p-3" variant={"ghost"}>
                <AlignLeft size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={"bottom"} align={"start"}>
              <DropdownMenuItem className="p-0">
                <Link href={'/collection/search'} className="p-1 px-2 w-full font-semibold">
                  Search
                </Link>
              </DropdownMenuItem>
              {navigation.map((nav, index) => (
                <DropdownMenuItem key={`MainNavStartLinkCollapsed-${index}`} className="p-0">
                  <Link href={nav.link} className="w-full font-light p-1 px-2">
                    {nav.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

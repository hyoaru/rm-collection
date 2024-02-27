"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, User, Lock, ChevronDown, Search } from "lucide-react";

// App imports
import { DropdownMenu, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import MainNavEndUserDropdownContent from "./MainNavEndUserDropdownContent";
import MainNavEndCartDropdownContent from "./MainNavEndCartDropdownContent";
import { Tables } from "@constants/base/database-types";

type MainNavEndProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function MainNavEnd({ authenticatedUser }: MainNavEndProps) {
  return (
    <>
      <div id="main-nav-end" className="flex justify-end items-center w-1/6 md:w-2/6 xl:w-1/3">
        <div id="main-nav-end-expanded" className="hidden lg:flex items-center">
          <Link href={"/collection/search"} className="">
            <Button variant={"ghost"} className={"flex gap-x-2 items-center px-3 text-sm lg:px-[0.35rem] xl:px-2"}>
              <Search size={20} className="text-primary" />
              Search
            </Button>
          </Link>

          {authenticatedUser ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className={"relative lg:px-[0.35rem] xl:px-2"}>
                    <div className="flex items-center gap-x-2">
                      <ShoppingCart size={20} className="text-primary" />
                      Cart
                    </div>
                    <div className="absolute bg-primary text-primary-foreground px-1 rounded-full right-0 top-0 text-[9px]">
                      {/* {cart?.data?.length} */}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndCartDropdownContent
                  authenticatedUser={authenticatedUser}
                  // cart={cart}
                />
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="flex items-center gap-x-2 lg:px-[0.35rem] xl:px-2">
                    <User size={20} className="text-primary" />
                    <span className="font-bold flex items-center capitalize">
                      {authenticatedUser.first_name} <ChevronDown size={20} className="text-primary" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndUserDropdownContent authenticatedUser={authenticatedUser} />
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href={"/auth/sign-in"} className="">
                <Button variant={"ghost"} className={"flex items-center gap-x-2 lg:px-[0.35rem] xl:px-2"}>
                  <User size={20} className="text-primary" />
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>

        <div id="main-nav-end-collapsed" className="flex lg:hidden">
          {authenticatedUser ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className={"p-1 relative sm:p-3"}>
                    <ShoppingCart size={20} className="text-primary" />
                    <div className="absolute bg-primary text-primary-foreground px-1 rounded-full right-0 top-0 text-[9px]">
                      {/* {cart?.data?.length} */}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndCartDropdownContent
                  authenticatedUser={authenticatedUser}
                  // cart={cart}
                />
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className={"p-1 sm:p-3"}>
                    <span>
                      <User size={20} className="text-primary" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndUserDropdownContent authenticatedUser={authenticatedUser} />
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant={"ghost"} className={"p-1 sm:p-3"}>
                <Link href={"/auth/sign-in"}>
                  <User size={20} className="text-primary" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

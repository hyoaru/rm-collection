"use client"

import { ShoppingCart, User, Lock, ChevronDown } from "lucide-react"
import React from "react"
import Link from "next/link"

// App imports
import { DropdownMenu, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { Button } from "@components/ui/button"
import MainNavEndUserDropdownContent from "./MainNavEndUserDropdownContent"
import MainNavEndCartDropdownContent from "./MainNavEndCartDropdownContent"
import { Tables } from "@constants/base/database-types"

type MainNavEndProps = {
  authenticatedUser: Tables<'users'> | null
}

export default function MainNavEnd({ authenticatedUser }: MainNavEndProps) {
  return (
    <>
      <div id="main-nav-end" className="flex justify-end items-center w-1/6 xl:w-1/3">
        <div id="main-nav-end-expanded" className="hidden xl:flex items-center">
          <Button variant={'link'} className={'px-2 text-xs'}>
            <Link href={"/collection/search"} className="uppercase font-light">Search</Link>
          </Button>

          {authenticatedUser
            ? <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'link'} className={'text-xs uppercase font-light relative px-4 h-max'}>
                    Cart
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
                  <div className="p-2 text-sm cursor-pointer">
                    <span className="font-bold flex items-center">
                      {authenticatedUser.email} <ChevronDown size={17} />
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <MainNavEndUserDropdownContent authenticatedUser={authenticatedUser} />
              </DropdownMenu>
            </>
            : <>
              <Button variant={'link'} className={'px-2 text-xs'}>
                <Link href={"/auth/sign-in"} className="uppercase font-light">Login</Link>
              </Button>
            </>}
        </div>

        <div id="main-nav-end-collapsed" className="flex xl:hidden">
          {authenticatedUser
            ? <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'link'} className={'px-2 text-xs uppercase font-light relative'}>
                    <ShoppingCart size={17} />
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
                  <Button variant={'ghost'} className={'px-1'}>
                    <span><User size={17} /></span>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndUserDropdownContent authenticatedUser={authenticatedUser} />
              </DropdownMenu>
            </>
            : <>
              <Button variant={'ghost'} className={'px-1'}>
                <Link href={'/auth/sign-in'}><User size={17} /></Link>
              </Button>
            </>}
        </div>
      </div>
    </>
  )
}
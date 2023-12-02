"use client"

import { ShoppingCart, User, Lock, ChevronDown } from "lucide-react"
import React from "react"
import Link from "next/link"

// App imports
import { DropdownMenu, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { useUserSignOut } from "@hooks/authentication/useUserSignOut"
import { Button } from "@components/ui/button"
import { useToast } from "@components/ui/use-toast"
import MainNavEndDropdownContent from "@components/base/MainNavEndDropdownContent"

export default function MainNavEnd(props) {
  const { userStateAuth, userStateGeneral } = props
  const { userSignOut } = useUserSignOut()
  const { toast } = useToast()

  async function onUserSignOut() {
    await userSignOut()
      .then(({ error }) => {
        if (!error) {
          toast({
            title: "Signing out",
            description: "Please wait shortly"
          })
        } else {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        }
      })

    window.location.reload()
  }

  return (
    <>
      <div id="main-nav-end" className="flex justify-end items-center w-1/6 xl:w-1/3">
        <div id="main-nav-end-expanded" className="hidden xl:flex">
          <Button variant={'link'} className={'px-2 text-xs'}>
            <Link href={"/collection/search"} className="uppercase font-light">Search</Link>
          </Button>
          <Button variant={'link'} className={'px-2 text-xs'}>
            <Link href={"/"} className="uppercase font-light">Cart</Link>
          </Button>

          {(userStateAuth && userStateGeneral)
            ? <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 text-sm cursor-pointer">
                    <span className="font-bold flex items-center">
                      {userStateGeneral.email} <ChevronDown size={17} />
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <MainNavEndDropdownContent
                  userStateAuth={userStateAuth}
                  userStateGeneral={userStateGeneral}
                  onUserSignOut={onUserSignOut}
                />
              </DropdownMenu>
            </>
            : <>
              <Button variant={'link'} className={'px-2 text-xs'}>
                <Link href={"/auth/sign-in"} className="uppercase font-light">Login</Link>
              </Button>
            </>}
        </div>

        <div id="main-nav-end-collapsed" className="flex xl:hidden">
          <Button variant={'ghost'} className={'px-1'}>
            <Link href={"/"} className=""><ShoppingCart size={17} /></Link>
          </Button>
          {(userStateAuth && userStateGeneral)
            ? <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'ghost'} className={'px-1'}>
                    <span><User size={17} /></span>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndDropdownContent
                  userStateAuth={userStateAuth}
                  userStateGeneral={userStateGeneral}
                  onUserSignOut={onUserSignOut}
                />
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

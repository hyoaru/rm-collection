"use client"

import React from "react"

// App imports
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { useUserSignOut } from "@/app/_hooks/authentication/useUserSignOut"
import { ShoppingCart, User, Lock, ChevronDown } from "lucide-react"
import { Button } from "@components/ui/button"
import Link from "next/link"
import { useToast } from "../ui/use-toast"

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
            description: "Redirecting to homepage"
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
          <Button variant={'link'} className={'px-2'}>
            <Link href={"/"} className="uppercase font-light">Search</Link>
          </Button>
          <Button variant={'link'} className={'px-2'}>
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
                <DropdownMenuContent side={'bottom'} align={'end'}>
                  <DropdownMenuLabel className={'flex gap-2 items-center'}>
                    <span className="text-muted-foreground font-light capitalize flex items-center gap-2">
                      {userStateGeneral.role === 'user' ? <User size={17} /> : <Lock size={17} />} {userStateGeneral.role}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={'/account'} className="w-full font-light">Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span onClick={onUserSignOut} className="font-light w-full cursor-pointer">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
            : <>
              <Button variant={'link'} className={'px-2'}>
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
                <DropdownMenuContent side={'bottom'} align={'end'}>
                  <DropdownMenuLabel className={'flex gap-2 items-center'}>
                    <span className="text-muted-foreground font-light capitalize flex items-center gap-2">
                      {userStateGeneral.role === 'user' ? <User size={17} /> : <Lock size={17} />} {userStateGeneral.role}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={'/account'} className="w-full font-light">Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span onClick={onUserSignOut} className="font-light w-full cursor-pointer">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
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

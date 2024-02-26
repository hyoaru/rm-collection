"use client"

import { User, Lock } from "lucide-react"
import Link from "next/link"
import React from 'react'

// App imports
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@components/ui/dropdown-menu"

import { useToast } from "@components/ui/use-toast"
import { useUserSignOut } from "@hooks/authentication/useUserSignOut"
import { Tables } from "@constants/base/database-types"

type MainNavEndUserDropdownContentProps = {
  authenticatedUser: Tables<'users'> | null
}

export default function MainNavEndUserDropdownContent({ authenticatedUser }: MainNavEndUserDropdownContentProps) {
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
      <DropdownMenuContent side={'bottom'} align={'end'} className={'w-40'}>
        <DropdownMenuLabel className={'flex gap-2 items-center'}>
          <span className="text-muted-foreground font-light capitalize flex items-center gap-2">
            {authenticatedUser?.role === 'user' ? <User size={17} /> : <Lock size={17} />}
            {authenticatedUser?.role.replaceAll("_", " ")}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {authenticatedUser?.role !== "user" && <>
          <DropdownMenuItem>
            <Link href={'/admin'} className="w-full font-light">Admin</Link>
          </DropdownMenuItem>
        </>}
        <DropdownMenuItem>
          <Link href={'/orders'} className="w-full font-light">Orders</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href={'/profile'} className="w-full font-light">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <span onClick={onUserSignOut} className="font-light w-full cursor-pointer">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  )
}
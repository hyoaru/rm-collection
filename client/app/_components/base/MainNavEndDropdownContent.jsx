"use client"

import { User, Lock } from "lucide-react"
import Link from "next/link"
import React from 'react'

// App imports
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@components/ui/dropdown-menu"


export default function MainNavEndDropdownContent(props) {
  const { userStateGeneral, userStateAuth, onUserSignOut } = props

  return (
    <>
      <DropdownMenuContent side={'bottom'} align={'end'} className={'w-40'}>
        <DropdownMenuLabel className={'flex gap-2 items-center'}>
          <span className="text-muted-foreground font-light capitalize flex items-center gap-2">
            {userStateGeneral.role === 'user' ? <User size={15} /> : <Lock size={15} />}
            {userStateGeneral.role.replace("_", " ")}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userStateGeneral.role !== "user" && <>
          <DropdownMenuItem>
            <Link href={'/admin'} className="w-full font-light">Admin</Link>
          </DropdownMenuItem>
        </>}
        <DropdownMenuItem>
          <Link href={'/account'} className="w-full font-light">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span onClick={onUserSignOut} className="font-light w-full cursor-pointer">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  )
}

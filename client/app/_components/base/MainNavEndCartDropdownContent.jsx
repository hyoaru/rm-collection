"use client"

import { User, Lock } from "lucide-react"
import Link from "next/link"
import React from 'react'

// App imports
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@components/ui/dropdown-menu"
import { Button } from "@components/ui/button"
import { ScrollArea } from "@components/ui/scroll-area"
import CartContentItem from "./CartContentItem"


export default function MainNavEndCartDropdownContent(props) {
  const { userStateGeneral, userStateAuth, onUserSignOut } = props

  return (
    <>
      <DropdownMenuContent side={'bottom'} align={'end'} className={'w-screen sm:w-[23rem] '}>
        <div className="p-2">
          <ScrollArea className={'h-[20rem]'}>
            <CartContentItem />
            <CartContentItem />
            <CartContentItem />
            <CartContentItem />
          </ScrollArea>
          <div className="flex py-3">
            <Button size={'sm'} className={'mx-auto'}>Proceed to checkout</Button>
          </div>
        </div>
      </DropdownMenuContent>
    </>
  )
}

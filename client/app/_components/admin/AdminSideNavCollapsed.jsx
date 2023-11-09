"use client"

import React, { useState } from 'react'

import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { useRouter } from 'next/navigation'

export default function AdminSideNavCollapsed(props) {
  const { navigationOperations, navigationTables } = props
  const router = useRouter()

  function onNavigationChange(link) {
    console.log(link)
    router.push(link)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Select onValueChange={onNavigationChange}>
          <SelectTrigger className="w-full">
            <span>Operations</span>
          </SelectTrigger>
          <SelectContent>
            {navigationOperations.map((navigationOperation, index) => (
              <SelectItem value={navigationOperation.link} key={`AdminSideNavCollapsedNavigationOperation-${navigationOperation.name}`}>
                {navigationOperation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onNavigationChange}>
          <SelectTrigger className="w-full">
            <span>Tables</span>
          </SelectTrigger>
          <SelectContent>
            {navigationTables.map((navigationTable, index) => (
              <SelectItem value={navigationTable.link} key={`AdminSideNavCollapsedNavigationTable-${navigationTable.name}`}>
                {navigationTable.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

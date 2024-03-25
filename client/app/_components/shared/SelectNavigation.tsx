"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

// App imports
import { Select, SelectContent, SelectItem, SelectTrigger } from "@components/ui/select"

type SelectNavigationProps = {
  label: string;
  navigations: {
    pathName: string;
    name: string
  }[]
}

export default function SelectNavigation({label, navigations}: SelectNavigationProps) {
  const router = useRouter()

  function onNavigationChange(path: string) {
    router.push(path)
  }

  return (
    <Select onValueChange={onNavigationChange}>
      <SelectTrigger className="w-full bg-secondary">
        <span className='capitalize'>{label}</span>
      </SelectTrigger>
      <SelectContent>
        {navigations.map((navigation) => (
          <SelectItem
            value={navigation.pathName}
            key={`SideNavCollapsedNavigation-${navigation.pathName}`}
          >
            {navigation.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

// App imports
import { Select, SelectContent, SelectItem, SelectTrigger } from "@components/ui/select"

export default function SelectNavigation(props) {
  const { navigations, label } = props
  const router = useRouter()

  function onNavigationChange(path) {
    router.push(path)
  }
  return (
    <Select onValueChange={onNavigationChange}>
      <SelectTrigger className="w-full">
        <span className='capitalize'>{label}</span>
      </SelectTrigger>
      <SelectContent>
        {navigations.map((navigation, index) => (
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

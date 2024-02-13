"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

// App imports
import { Select, SelectContent, SelectItem, SelectTrigger } from "@components/ui/select"

export default function AdminSelectNavigation(props) {
  const { navigations, label, userStateGeneral } = props
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
        {navigations.map((navigation, index) => {
          const isPermitted = navigation.adminRolesPermitted.includes(userStateGeneral?.role)

          if (isPermitted) {
            return (
              <SelectItem
                value={navigation.pathName}
                key={`SideNavCollapsedNavigation-${navigation.pathName}`}
              >
                {navigation.name}
              </SelectItem>
            )
          }
        })}
      </SelectContent>
    </Select>
  )
}

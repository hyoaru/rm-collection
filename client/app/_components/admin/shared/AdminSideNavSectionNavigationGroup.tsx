import React from 'react'
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'
import { Tables } from '@constants/base/database-types'
import { NavigationType } from '@constants/admin/types'

type AdminSideNavSectionNavigationGroupProps = {
  sectionTitle: string
  navigations: NavigationType[]
  authenticatedUser: Tables<'users'> | null
}

export default function AdminSideNavSectionGroup({ sectionTitle, navigations, authenticatedUser }: AdminSideNavSectionNavigationGroupProps) {
  return (
    <>
      <div className="border border-x-0 py-5 px-2 lg:px-5 pb-8 flex flex-row overflow-x-auto rounded-lg gap-2 sm:flex-col">
        <small className="text-center uppercase text-xs mb-1 text-muted-foreground hidden sm:block">{sectionTitle}</small>
        {navigations.map((navigation) => {
          const isPermitted = authenticatedUser ? navigation.adminRolesPermitted?.includes(authenticatedUser.role) : false

          if (isPermitted) {
            return (
              <Button key={`SideNavExpandedNavigation-${navigation.name}`} size={'sm'} variant={'secondary'}>
                <Link className='w-full' href={navigation.pathName}>{navigation.name}</Link>
              </Button>
            )
          }
        })}
      </div>
    </>
  )
}
import React from 'react'
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'

export default function SideNavSectionNavigationGroup(props) {
  const { navigations, label } = props
  return (
    <>
      <div className="border border-x-0 py-5 px-2 lg:px-5 pb-8 flex flex-row overflow-x-auto rounded-lg gap-2 sm:flex-col">
        <small className="text-center uppercase text-xs mb-1 text-muted-foreground hidden sm:block">{label}</small>
        {navigations.map((navigation, index) => (
          <Button key={`SideNavExpandedNavigation-${navigation.name}`} size={'sm'} variant={'secondary'}>
            <Link className='w-full' href={navigation.pathName}>{navigation.name}</Link>
          </Button>
        ))}
      </div>
    </>
  )
}

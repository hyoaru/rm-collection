import React from 'react'
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'

export default function Layout({ children }) {
  const ACCOUNT_BASE_PATH = '/account'
  const navigations = [
    { name: 'Account information', pathName: ACCOUNT_BASE_PATH },
    { name: 'Update information', pathName: `${ACCOUNT_BASE_PATH}/update-info` },
    { name: 'Change password', pathName: `${ACCOUNT_BASE_PATH}/change-password` },
    { name: 'Change email', pathName: `${ACCOUNT_BASE_PATH}/change-email` },
  ]

  return (
    <>
      <div className="md:container mx-auto px-4 mt-4 mb-8">
        <div className="grid grid-cols-12 gap-2 sm:gap-8">
          <div className="hidden col-span-12 sm:block sm:col-span-4 lg:col-span-3">
            <div className="flex flex-col gap-0 sm:gap-8 sticky top 20">
              <div className="border border-x-0 py-5 px-2 lg:px-5 pb-8 flex flex-row overflow-x-auto rounded-lg gap-2 sm:flex-col">
                <small className="text-center uppercase text-xs mb-1 text-muted-foreground hidden sm:block">Account</small>
                {navigations.map((navigation, index) => (
                  <Button key={`SideNavExpandedNavigation-${navigation.name}`} size={'sm'} variant={'secondary'}>
                    <Link className='w-full' href={navigation.pathName}>{navigation.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-8 lg:col-span-9">
          <div className="mb-4 rounded-lg px-2 py-5 lg:px-5">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

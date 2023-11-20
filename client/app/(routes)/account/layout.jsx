import React from 'react'
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'
import AccountSideNavSectionNavigationGroup from '@components/account/shared/AccountSideNavSectionNavigationGroup'
import SelectNavigation from '@components/shared/SelectNavigation'

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
          {/* Collapsed navigation */}
          <div className="col-span-12 block sm:hidden">
            <SelectNavigation
              navigations={navigations}
              label={'Account Settings'}
            />
          </div>

          {/* Expanded navigation */}
          <div className="hidden col-span-12 sm:block sm:col-span-4 lg:col-span-3">
            <div className="flex flex-col gap-0 sm:gap-8 sticky top 20">
              <AccountSideNavSectionNavigationGroup
                navigations={navigations}
                label={'account'}
              />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-8 lg:col-span-9">
            <div className="mb-4 rounded-lg px-2 py-5 lg:px-5">
              {children}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

import React from 'react'

// App imports
import AccountSideNavSectionNavigationGroup from '@components/shared/SideNavSectionNavigationGroup'
import SelectNavigation from '@components/shared/SelectNavigation'
import { NAVIGATIONS as navigations } from '@constants/profile/base'

export default function Layout({ children }) {
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

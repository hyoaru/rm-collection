import React from 'react'

// App imports
import { getUserStateServer } from '@services/authentication/getUserStateServer'
import { NAVIGATION_OPERATIONS, NAVIGATION_TABLES } from '@constants/admin/base'
import AdminSideNavSectionNavigationGroup from '@components/admin/shared/AdminSideNavSectionNavigationGroup'
import AdminSelectNavigation from '@components/admin/shared/AdminSelectNavigation'

export default async function Layout({ children }) {
  const { userStateGeneral } = await getUserStateServer()

  const navigationOperations = Array.from(Object.values(NAVIGATION_OPERATIONS))
  const navigationTables = Array.from(Object.values(NAVIGATION_TABLES))

  return (
    <>
      <div className="md:container mx-auto px-4 mt-4 mb-8">
        <div className="grid grid-cols-12 gap-2 sm:gap-8">

          {/* Admin side nav collapsed */}
          <div id="AdminSideNavCollapsed" className='col-span-12 block sm:hidden'>
            <div className="grid grid-cols-2 gap-4">
              <AdminSelectNavigation
                navigations={navigationOperations}
                label={'operations'}
                userStateGeneral={userStateGeneral}
              />
              <AdminSelectNavigation
                navigations={navigationTables}
                label={'tables'}
                userStateGeneral={userStateGeneral}
              />
            </div>
          </div>

          {/* Admin side nav expanded */}
          <div id='AdminSideNavExpanded' className="hidden col-span-12 sm:block sm:col-span-4 lg:col-span-3">
            <div className="flex flex-col gap-0 sm:gap-4 sticky top-16">
              <AdminSideNavSectionNavigationGroup
                sectionTitle={'operations'}
                navigations={navigationOperations}
                userStateGeneral={userStateGeneral}
              />
              <AdminSideNavSectionNavigationGroup
                sectionTitle={'tables'}
                navigations={navigationTables}
                userStateGeneral={userStateGeneral}
              />
            </div>
          </div>

          {/* Children */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-9">
            <div className="mb-4 rounded-lg border border-x-0 py-5 px-2 lg:px-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

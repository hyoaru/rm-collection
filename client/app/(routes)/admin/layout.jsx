import React from 'react'
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'
import AdminSideNavCollapsed from '@components/admin/AdminSideNavCollapsed'
import { getUserStateServer } from '@services/authentication/getUserStateServer'
import { NAVIGATION_OPERATIONS, NAVIGATION_TABLES } from '@constants/admin'
import AdminSideNavSection from '@components/admin/shared/AdminSideNavSection'

export default async function Layout({ children }) {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()

  const navigationOperations = Array.from(Object.values(NAVIGATION_OPERATIONS))
  const navigationTables = Array.from(Object.values(NAVIGATION_TABLES))

  return (
    <>
      <div className="md:container mx-auto px-4 mt-4 mb-8">
        <div className="grid grid-cols-12 gap-2 sm:gap-8">

          {/* Admin side nav collapsed */}
          <div id="AdminSideNavCollapsed" className='col-span-12 block sm:hidden'>
            <AdminSideNavCollapsed
              navigationOperations={navigationOperations}
              navigationTables={navigationTables}
            />
          </div>

          {/* Admin side nav expanded */}
          <div id='AdminSideNavExpanded' className="hidden col-span-12 sm:block sm:col-span-4 lg:col-span-3">
            <div className="flex flex-col gap-0 sm:gap-8 sticky top-20">
              <AdminSideNavSection
                sectionTitle={'operations'}
                navigations={navigationOperations}
                userStateGeneral={userStateGeneral}
              />
              <AdminSideNavSection
                sectionTitle={'tables'}
                navigations={navigationTables}
                userStateGeneral={userStateGeneral}
              />
            </div>
          </div>

          {/* Children */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-9">
            <div className="mb-4 rounded-lg px-2 py-5 lg:px-5 ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

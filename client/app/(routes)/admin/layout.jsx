import React from 'react'
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'
import AdminSideNavCollapsed from '@components/admin/AdminSideNavCollapsed'
import { getUserStateServer } from '@services/authentication/getUserStateServer'
import { NAVIGATION_OPERATIONS, NAVIGATION_TABLES } from '@constants/admin'

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
            <div className="flex flex-col gap-0 sm:gap-8">
              <div className="border border-x-0 py-5 px-2 lg:px-5 pb-8 flex flex-row overflow-x-auto rounded-lg gap-2 sm:flex-col">
                <small className="text-center uppercase text-xs mb-1 text-muted-foreground hidden sm:block">Operations</small>
                {navigationOperations.map((navigationOperation, index) => {
                  const isPermitted = navigationOperation.adminRolesPermitted.includes(userStateGeneral?.role)
                  if (isPermitted) {
                    return (
                      <Button key={`SideNavExpandedNavigationOperation-${index}`} size={'sm'} variant={'secondary'}>
                        <Link className='w-full' href={navigationOperation.pathName}>{navigationOperation.name}</Link>
                      </Button>
                    )
                  }
                })}
              </div>
              <div className="border border-x-0 py-5 px-2 lg:px-5 pb-8 flex flex-row overflow-x-auto rounded-lg gap-2 sm:flex-col">
                <small className="text-center text-muted-foreground uppercase text-xs mb-1 hidden sm:block">Tables</small>
                {navigationTables.map((navigationTable, index) => {
                  const isPermitted = navigationTable.adminRolesPermitted.includes(userStateGeneral?.role)
                  if (isPermitted) {
                    return (
                      <Button size={'sm'} variant={'secondary'} key={`SideNavExpandedNavigationTable-${index}`}>
                        <Link className='w-full' href={navigationTable.pathName}>{navigationTable.name}</Link>
                      </Button>
                    )
                  }
                })}
              </div>
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

import React from 'react'
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area"

export default function Layout({ children }) {
  const basePath = '/admin'
  const adminOperationsBasePath = `${basePath}/operations`
  const adminTablesBasePath = `${basePath}/tables`

  const navigationOperations = [
    { name: 'Add sub-admin', link: `${adminOperationsBasePath}/add-sub-admin` },
    { name: 'Add product', link: `${adminOperationsBasePath}/add-product` },
    { name: 'Add product variant', link: `${adminOperationsBasePath}/add-product` },
  ]
  const navigationTables = [
    { name: 'Admins', link: `${adminTablesBasePath}/admins` },
    { name: 'Users', link: `${adminTablesBasePath}/users` },
    { name: 'Products', link: `${adminTablesBasePath}/products` },
    { name: 'Product postings', link: `${adminTablesBasePath}/product-postings` },
    { name: 'Product variants', link: `${adminTablesBasePath}/product-variants` },
  ]

  return (
    <>
      <div className="md:container mx-auto px-4 mt-4 mb-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <div className="flex flex-col gap-0 sm:gap-2">
              <div className="sm:bg-primary p-3 flex flex-row overflow-x-auto rounded-lg gap-2 sm:flex-col">
                <small className="text-center uppercase text-xs mb-1 text-primary-foreground hidden sm:block">Operations</small>
                {navigationOperations.map((navigationOperation) => (
                  <Button size={'sm'} variant={'secondary'} >
                    <Link href={navigationOperation.link}>{navigationOperation.name}</Link>
                  </Button>
                ))}
              </div>
              <div className="sm:border sm:border-x-0 p-3 flex flex-row overflow-x-auto rounded-lg gap-2 sm:flex-col">
                <small className="text-center uppercase text-xs mb-1 hidden sm:block">Tables</small>
                {navigationTables.map((navigationTable) => (
                  <Button size={'sm'} >
                    <Link href={navigationTable.link}>{navigationTable.name}</Link>
                  </Button>
                ))}
              </div>

            </div>
          </div>
          <div className="col-span-12 sm:col-span-8 lg:col-span-10">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

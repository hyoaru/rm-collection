import React from 'react'
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query'

// App imports
import EditProductVariantForm from '@components/admin/operations/EditProductVariantForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import { queryAllProducts } from '@constants/shared/queries'

export default async function Page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queryAllProducts())
  
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Edit product variant'}
        description={'Check details about the product and other pertinent information.'}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditProductVariantForm />
      </HydrationBoundary>
    </>
  )
}
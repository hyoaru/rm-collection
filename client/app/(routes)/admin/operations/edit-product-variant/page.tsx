import React, { Suspense } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

// App imports
import EditProductVariantForm from '@components/admin/operations/EditProductVariantForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import { queryAllProducts, queryAllProductVariants } from '@constants/shared/queries'
import Loading from '@components/admin/shared/Loading'

export default async function Page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queryAllProducts())
  await queryClient.prefetchQuery(queryAllProductVariants())
  
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Edit product variant'}
        description={'Check details about the product and other pertinent information.'}
      />

      <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <EditProductVariantForm />
        </HydrationBoundary>
      </Suspense>
    </>
  )
}
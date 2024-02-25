import React, { Suspense } from 'react'

// App imports
import AddProductVariantForm from '@components/admin/operations/AddProductVariantForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { queryAllProducts } from '@constants/shared/queries'
import getQueryClient from '@services/shared/getQueryClient'
import Loading from '@components/admin/shared/Loading'

export default async function Page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryAllProducts())

  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Add product variant'}
        description={'Provide details about the product and other pertinent information.'}
      />

      <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AddProductVariantForm />
        </HydrationBoundary>
      </Suspense>
    </>
  )
}
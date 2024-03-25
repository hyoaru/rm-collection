import React, { Suspense } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

// App imports
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import { queryAllUsers } from '@constants/admin/queries'
import AddSubAdminForm from '@components/admin/operations/AddSubAdminForm'
import Loading from '@components/admin/shared/Loading'

export default async function Page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queryAllUsers())

  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Add sub admin'}
        description={'Check details about the user and other pertinent information.'}
      />

      <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AddSubAdminForm />
        </HydrationBoundary>
      </Suspense>
    </>
  )
}
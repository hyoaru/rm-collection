import React from 'react'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

// App imports
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import getQueryClient from '@services/shared/getQueryClient'
import { queryAllUsers } from '@constants/admin/queries'
import AddSubAdminForm from '@components/admin/operations/AddSubAdminForm'

export default async function Page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryAllUsers())

  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Add sub admin'}
        description={'Check details about the user and other pertinent information.'}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AddSubAdminForm />
      </HydrationBoundary>
    </>
  )
}
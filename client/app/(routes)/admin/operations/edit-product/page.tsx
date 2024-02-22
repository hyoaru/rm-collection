import React from 'react'

// App imports
import EditProductForm from '@components/admin/operations/EditProductForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { queryAllProducts } from '@constants/shared/queries'
import getQueryClient from '@services/shared/getQueryClient'

export default async function page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryAllProducts())

  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Edit product'}
        description={'Check details about the product and other pertinent information.'}
      />
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditProductForm />
      </HydrationBoundary>
    </>
  )
}
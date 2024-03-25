import React, { Suspense } from 'react'

// App imports
import AddProductForm from '@components/admin/operations/AddProductForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import Loading from '@components/admin/shared/Loading'

export default function page() {
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Add new product'}
        description={'Provide details about the product and other pertinent information.'}
      />
      <Suspense fallback={<Loading />}>
        <AddProductForm />
      </Suspense>
    </>
  )
}
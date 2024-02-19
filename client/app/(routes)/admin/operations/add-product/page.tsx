import Image from 'next/image'
import React from 'react'

// App imports
import AddProductForm from '@components/admin/operations/AddProductForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'

export default function page() {
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Add new product'}
        description={'Provide details about the product and other pertinent information.'}
      />
      <AddProductForm />
    </>
  )
}
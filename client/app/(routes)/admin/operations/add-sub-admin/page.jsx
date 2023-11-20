import React from 'react'

// App imports
import getUserList from '@services/admin/shared/getUserList'
import AddSubAdminForm from '@components/admin/operations/AddSubAdminForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'

export default async function Page() {
  const userList = await getUserList()
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Add sub admin'}
        description={'Check details about the user and other pertinent information.'}
      />
      <AddSubAdminForm userList={userList} />
    </>
  )
}

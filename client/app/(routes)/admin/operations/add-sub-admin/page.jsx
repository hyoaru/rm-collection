import React from 'react'

// App imports
import getUserList from '@services/admin/shared/getUserList'
import AddSubAdminForm from '@components/admin/operations/AddSubAdminForm'

export default async function Page() {
  const userList = await getUserList()
  return (<AddSubAdminForm userList={userList} />)
}

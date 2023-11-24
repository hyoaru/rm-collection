import React from 'react'
import AccountSectionHeader from '@components/account/shared/AccountSectionHeader'
import AccountUpdatePasswordForm from '@components/account/AccountUpdatePasswordForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  return (
    <>
      <AccountSectionHeader
        title={'Update password'}
        description={'Update the password of your account.'}
      />

      <AccountUpdatePasswordForm userStateGeneral={userStateGeneral} />
    </>
  )
}

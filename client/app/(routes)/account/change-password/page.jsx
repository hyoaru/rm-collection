import React from 'react'
import AccountSectionHeader from '@components/account/shared/AccountSectionHeader'
import AccountChangePasswordForm from '@components/account/AccountChangePasswordForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  return (
    <>
      <AccountSectionHeader
        title={'Change password'}
        description={'Change the password of your account.'}
      />

      <AccountChangePasswordForm userStateGeneral={userStateGeneral} />
    </>
  )
}

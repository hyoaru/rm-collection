import React from 'react'
import AccountSectionHeader from '@components/account/shared/AccountSectionHeader'
import AccountUpdateEmailForm from '@components/account/AccountUpdateEmailForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  
  return (
    <>
      <AccountSectionHeader
        title={'Update email'}
        description={'Update the email of your account.'}
      />

      <AccountUpdateEmailForm userStateGeneral={userStateGeneral} />
    </>
  )
}

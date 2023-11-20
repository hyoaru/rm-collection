import React from 'react'
import AccountSectionHeader from '@components/account/shared/AccountSectionHeader'
import AccountUpdateInformationForm from '@components/account/AccountUpdateInformationForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  return (
    <>
      <AccountSectionHeader
        title={'Account update information'}
        description={'Update information of your account and other relevant settings.'}
      />

      <AccountUpdateInformationForm userStateGeneral={userStateGeneral} />
    </>
  )
}

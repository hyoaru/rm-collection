import React from 'react'
import AccountSectionHeader from '@components/account/shared/AccountSectionHeader'
import AccountInformationForm from '@components/account/AccountInformationForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  return (
    <>
      <AccountSectionHeader
        title={'Account information'}
        description={'Overview information of your account and other relevant settings.'}
      />

      <AccountInformationForm userStateGeneral={userStateGeneral} />
    </>
  )
}

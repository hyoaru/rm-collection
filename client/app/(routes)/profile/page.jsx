import React from 'react'
import SectionHeader from '@components/shared/SectionHeader'
import AccountInformationForm from '@components/profile/account/AccountInformationForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  return (
    <>
      <SectionHeader
        title={'Account information'}
        description={'Overview information of your account and other relevant settings.'}
      />

      <AccountInformationForm userStateGeneral={userStateGeneral} />
    </>
  )
}

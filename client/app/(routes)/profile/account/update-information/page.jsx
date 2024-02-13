import React from 'react'
import SectionHeader from '@components/shared/SectionHeader'
import AccountUpdateInformationForm from '@components/profile/account/AccountUpdateInformationForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  return (
    <>
      <SectionHeader
        title={'Account update information'}
        description={'Update information of your account and other relevant settings.'}
      />

      <AccountUpdateInformationForm userStateGeneral={userStateGeneral} />
    </>
  )
}

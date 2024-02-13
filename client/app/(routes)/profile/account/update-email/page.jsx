import React from 'react'
import SectionHeader from '@components/shared/SectionHeader'
import AccountUpdateEmailForm from '@/app/_components/profile/account/AccountUpdateEmailForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral } = await getUserStateServer()
  
  return (
    <>
      <SectionHeader
        title={'Update email'}
        description={'Update the email of your account.'}
      />

      <AccountUpdateEmailForm userStateGeneral={userStateGeneral} />
    </>
  )
}

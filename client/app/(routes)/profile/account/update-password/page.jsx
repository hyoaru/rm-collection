import React from 'react'
import SectionHeader from '@components/shared/SectionHeader'
import AccountUpdatePasswordForm from '@/app/_components/profile/account/AccountUpdatePasswordForm'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()
  return (
    <>
      <SectionHeader
        title={'Update password'}
        description={'Update the password of your account.'}
      />

      <AccountUpdatePasswordForm userStateGeneral={userStateGeneral} />
    </>
  )
}

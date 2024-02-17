import React from 'react'

// App imports
import ForgotPasswordForm from "@components/auth/ForgotPasswordForm"

export default function Page() {
  return (
    <>
      <div className="text-center">
        <h4 className='text-3xl uppercase'>Recover your account</h4>
        <span className='text-sm font-light text-muted-foreground'>Enter your email to continue</span>
      </div>
      <div className="mt-5">
        <ForgotPasswordForm />
      </div>
    </>
  )
}
import React from 'react'

// App imports
import SignInForm from "@components/auth/SignInForm"

export default function Page() {
  return (
    <>
      <div className="text-center">
        <h4 className='text-3xl uppercase'>Welcome Back</h4>
        <span className='text-sm font-light text-muted-foreground'>Enter your details to continue</span>
      </div>
      <div className="mt-5">
        <SignInForm />
      </div>
    </>
  )
}
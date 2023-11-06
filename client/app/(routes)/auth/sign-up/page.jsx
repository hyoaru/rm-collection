import React from 'react'

// App imports
import SignUpForm from "@components/auth/SignUpForm"

export default function Page() {
  return (
    <>
      <div className="text-center">
        <h4 className='text-3xl'>Create an account</h4>
        <span className='text-sm font-light text-muted-foreground'>Enter your email below to create your account</span>
      </div>
      <div className="mt-5">
        <SignUpForm />
      </div>
    </>
  )
}

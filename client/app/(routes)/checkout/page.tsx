import React from 'react'

// App imports
import { getUserStateServer } from '@services/authentication/getUserStateServer'
import CheckoutForm from '@components/checkout/CheckoutForm'

export default async function Page() {
  const authenticatedUser = await getUserStateServer()

  return (
    <>
      <div className="md:container mx-auto px-4 mt-10 mb-8">
        <div className="grid grid-rows-1 gap-y-3 mb-8 justify-center text-center ">
          <div className="space-y-1">
            <h1 className="text-4xl capitalize font-bold text-primary sm:mt-0">Finalize purchase</h1>
            <p className="text-muted-foreground">Wrap up your purchase: confirm and complete</p>
          </div>
        </div>

        <CheckoutForm authenticatedUser={authenticatedUser!} />
      </div>
    </>
  )
}
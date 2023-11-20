import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useSendPasswordResetRequest() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function sendPasswordResetRequest(props) {
    const { email } = props
    setIsLoading(true)

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/account/change-password` }
    )

    setIsLoading(false)
    return { data, error }
  }

  return { sendPasswordResetRequest, isLoading }
}

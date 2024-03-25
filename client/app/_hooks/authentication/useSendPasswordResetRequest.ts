import { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'
import { ACCOUNT_BASE_PATH as accountBasePath } from '@constants/profile/base'

export default function useSendPasswordResetRequest() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function sendPasswordResetRequest({ email }: { email: string }) {
    setIsLoading(true)

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/${accountBasePath}/update-password` }
    )

    setIsLoading(false)
    return { data, error }
  }

  return { sendPasswordResetRequest, isLoading }
}
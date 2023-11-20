import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useResetPassword() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function resetPassword(props) {
    const { newPassword } = props
    setIsLoading(true)

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })

    setIsLoading(false)
    return { data, error }
  }

  return { resetPassword, isLoading }
}

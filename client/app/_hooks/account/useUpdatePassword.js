import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useUpdatePassword() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updatePassword(props) {
    const { newPassword } = props
    setIsLoading(true)

    const { data, error } = await supabase.auth.updateUser({ password: newPassword })
    window.location.reload()

    setIsLoading(false)
    return { data, error }
  }

  return { updatePassword, isLoading }
}

import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useUpdateEmail() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updateEmail(props) {
    const { newEmail } = props
    setIsLoading(true)

    const { data, error } = await supabase.auth.updateUser({ email: newEmail })

    setIsLoading(false)
    return { data, error }
  }

  return { updateEmail, isLoading }
}

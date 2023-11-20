import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useUpdateUserInformation() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updateUserInformation(props) {
    const { userId, firstName, lastName } = props

    setIsLoading(true)
    const { data, error } = await supabase
      .from('users')
      .update({ first_name: firstName, last_name: lastName })
      .eq('id', userId)
      .select()
    setIsLoading(false)

    return { data, error }
  }

  return { updateUserInformation, isLoading }
}

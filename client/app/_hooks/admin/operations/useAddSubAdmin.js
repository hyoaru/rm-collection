import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useAddSubAdmin() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function addSubAdmin(props) {
    const TABLE_NAME = 'users'
    const { userId } = props

    setIsLoading(true)

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({ role: 'admin_tier_2' })
      .eq('id', userId)
      .select()

    setIsLoading(false)

    return { data, error }
  }

  return { addSubAdmin, isLoading }
}

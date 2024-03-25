"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export async function getUserStateServer() {
  const supabase = getServerClient()
  const { data: { user: userStateAuth } } = await supabase.auth.getUser()

  if (!userStateAuth) {
    return null
  } else {
    const { data: userStateGeneral } = await supabase
      .from('users')
      .select("*")
      .eq('id', userStateAuth.id)
      .single()

    return userStateGeneral
  }
}
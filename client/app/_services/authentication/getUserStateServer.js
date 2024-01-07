"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export async function getUserStateServer() {
  const supabase = await getServerClient()
  const { data: { user: userStateAuth } } = await supabase.auth.getUser()
  let { data: userStateGeneral } = await supabase
    .from('users')
    .select("*")
    .eq('id', userStateAuth?.id)
    .single()

  return { userStateAuth, userStateGeneral }
}
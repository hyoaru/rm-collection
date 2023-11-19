"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export default async function removeAdminAuthority(userId) {
  const supabase = getServerClient()

  const { data: { user: userStateAuth } } = await supabase.auth.getUser()
  if (userId === userStateAuth.id) {
    return { error: { message: "Operation must be done by someone of higher authority." } }
  }

  const { data, error } = await supabase
    .from('users')
    .update({ role: 'user' })
    .eq('id', userId)
    .select()

  return { data, error }
}
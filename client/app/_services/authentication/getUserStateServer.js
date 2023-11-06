import { getServerClient } from "@services/supabase/getServerClient"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getUserStateServer() {
  const supabase = getServerClient()
  const { data: { user: userStateAuth } } = await supabase.auth.getUser()
  let { data: userStateGeneral } = await supabase
    .from('users')
    .select("*")
    .eq('id', userStateAuth?.id)
    .single()

  console.log(userStateAuth)

  return { userStateAuth, userStateGeneral }
}
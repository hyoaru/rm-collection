import { getServerClient } from "../supabase/getServerClient"

export async function getUserStateServer() {
  const supabase = getServerClient()
  const { data: { user } } = await supabase.auth.getUser()
}
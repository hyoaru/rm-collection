import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export function getBrowserClient() {
  const supabase = createClientComponentClient()
  return supabase
}
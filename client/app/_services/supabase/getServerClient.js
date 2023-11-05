import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export function getServerClient() {
  const supabase = createServerComponentClient({ cookies })
  return supabase
}
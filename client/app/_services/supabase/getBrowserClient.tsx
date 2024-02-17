import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@constants/base/database-types'

export function getBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
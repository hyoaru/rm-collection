import { useState } from "react";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

export function useUserSignOut() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getBrowserClient()

  async function userSignOut() {
    setIsLoading(true)
    const { error } = await supabase.auth.signOut()
    setIsLoading(false)
    return { error }
  }

  return { userSignOut, isLoading }
}
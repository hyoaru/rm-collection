import { useState } from "react";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

export function useUserMagicLinkSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getBrowserClient()

  async function userMagicLinkSignIn({ email }) {
    setIsLoading(true)
    let { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { shouldCreateUser: true }
    })

    setIsLoading(false)
    return { data, error }
  }

  return { userMagicLinkSignIn, isLoading }
}
import { useState } from "react";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

export function useUserMagicLinkSignIn() {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const supabase = getBrowserClient()

  async function userMagicLinkSignIn({ email }) {
    setIsLoading(true)
    setIsEmailSent(false)

    let { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { shouldCreateUser: true }
    })

    if (error) {
      setError(error)
    } else {
      setIsEmailSent(true)
    }

    setIsLoading(false)
  }

  return { userMagicLinkSignIn, isEmailSent, isLoading, error }
}
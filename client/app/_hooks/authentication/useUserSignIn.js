import { useState } from "react";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

export function useUserSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getBrowserClient()

  async function userSignIn({ email, password }) {
    setIsLoading(true)
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    setIsLoading(false)
    return { data, error }
  }

  return { userSignIn, isLoading }
}
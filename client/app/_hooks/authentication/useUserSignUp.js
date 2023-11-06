import { useState } from "react";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

export function useUserSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getBrowserClient()

  async function userSignUp({ email, password }) {
    setIsLoading(true)
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { emailRedirectTo: "http://127.0.0.1:3000/auth/sign-in" }
    })

    setIsLoading(false)
    return { data, error }
  }

  return { userSignUp, isLoading }
}
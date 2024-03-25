import { useState } from "react";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

type UserSignInProps = {
  email: string
  password: string
}

export function useUserSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getBrowserClient()

  async function userSignIn({ email, password } : UserSignInProps) {
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
import { useState } from "react";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

export function useUserSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getBrowserClient()

  async function userSignUp({ email, password, firstName, lastName }) {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in` }
    })
      .then(async ({ data: authSignUpData, error: authSignUpError }) => {
        if (authSignUpError) {
          return { data: authSignUpData, error: authSignUpError }
        }

        const { data, error } = await supabase
          .from('users')
          .update({ first_name: firstName, last_name: lastName })
          .eq('id', authSignUpData.user.id)
          .select()
          
        return { data, error }
      })

    setIsLoading(false)
    return { data, error }
  }

  return { userSignUp, isLoading }
}
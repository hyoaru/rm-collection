import { useState } from "react";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

type UserSignUpProps = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export function useUserSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getBrowserClient()

  async function userSignUp({ email, password, firstName, lastName }: UserSignUpProps) {
    setIsLoading(true)
    
    const { count, error: countError } = await supabase
      .from('users')
      .select(`*`, { count: 'exact', head: true })
      .eq('email', email)

    if (countError) {
      return { data: null, error: countError }
    }

    if (count! > 0) {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in`
        }
      })

      setIsLoading(false)
      return { data, error }
    }

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
          .eq('id', authSignUpData.user!.id)
          .select()

        return { data, error }
      })

    setIsLoading(false)
    return { data, error }
  }

  return { userSignUp, isLoading }
}
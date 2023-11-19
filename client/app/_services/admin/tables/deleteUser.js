"use server"

// App imports
import { getServerClient } from "@services/supabase/getServerClient"

export default async function deleteUser(userId) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)
    .then(async ({ data: deleteUserData, error: deleteUserError }) => {
      if (deleteUserError) {
        return { deleteUserData, deleteUserError }
      }
      
      const { data, error } = await supabase.auth.admin.deleteUser(userId)
      return { data, error }
    })

  return { data, error }
}
"use server"

import { getServerClient } from "@services/supabase/getServerClient"
import { ADMIN_ROLES } from "@constants/admin/base"

export default async function removeAdminAuthority(userId) {
  const supabase = getServerClient()

  const { data: { user: userStateAuth } } = await supabase.auth.getUser()
  let { data: userStateGeneral } = await supabase
    .from('users')
    .select("*")
    .eq('id', userStateAuth?.id)
    .single()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
    .then(async ({ data: getUserInfoData, error: getUserInfoError }) => {
      if (getUserInfoError) {
        return { data: getUserInfoData, error: getUserInfoError }
      }

      const currentAdminAuthorityPrecedencePosition = ADMIN_ROLES.findIndex((adminRole) => adminRole === userStateGeneral.role)
      const targetAdminAuthorityPrecedencePosition = ADMIN_ROLES.findIndex((adminRole) => adminRole === getUserInfoData.role)

      if (currentAdminAuthorityPrecedencePosition >= targetAdminAuthorityPrecedencePosition) {
        return {
          data: null,
          error: { message: "Operation must be done by someone of higher authority." }
        }
      }

      const { data, error } = await supabase
        .from('users')
        .update({ role: 'user' })
        .eq('id', userId)
        .select()

      return { data, error }
    })

  return { data, error }
}
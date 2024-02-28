"use server";

import { getServerClient } from "@services/supabase/getServerClient";

type LogAdminActionParams = {
  action: string;
  details: string
};

export default async function logAdminAction({ action, details }: LogAdminActionParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase.auth
    .getUser()
    .then(async ({ data: authenticatedUserData, error: authenticatedUserError }) => {
      if (authenticatedUserError || !authenticatedUserData) {
        return { data: authenticatedUserData, error: authenticatedUserError };
      }

      const { data, error } = await supabase
        .from("admin_logs")
        .insert({
          user_id: authenticatedUserData.user.id,
          action: action,
          details: details,
        })
        .select()
        .single();

      return { data, error };
    });

  return { data, error };
}

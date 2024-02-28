"use server";

import { Tables } from "@constants/base/database-types";
import { getServerClient } from "@services/supabase/getServerClient";
import logAdminAction from "@services/admin/shared/logAdminAction";

export default async function addSubAdmin(user: Tables<"users">) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("users")
    .update({ role: "admin_tier_2" })
    .eq("id", user.id)
    .select()
    .then(async ({ data, error }) => {
      if (error || !data) {
        return { data, error };
      }

      await logAdminAction({
        action: "add sub admin",
        details: JSON.stringify(user),
      });

      return { data, error };
    });

  return { data, error };
}

"use server";

import { getServerClient } from "@services/supabase/getServerClient";

export default async function addSubAdmin(userId: string) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("users")
    .update({ role: "admin_tier_2" })
    .eq('id', userId)
    .select()

  return { data, error }
}

import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getAdminLogs() {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("admin_logs")
    .select("*, users(*)")
    .order("created_at", { ascending: false });

  return { data, error };
}

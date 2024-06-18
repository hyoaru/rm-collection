import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getPendingOrderCount() {
  const supabase = getBrowserClient();

  const {
    data: { user: authenticatedUser },
  } = await supabase.auth.getUser();

  if (!authenticatedUser) {
    return { data: null, error: null };
  }

  const { count, error } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .eq('status_id', 2)
    .eq("user_id", authenticatedUser.id);

  return { count, error };
}

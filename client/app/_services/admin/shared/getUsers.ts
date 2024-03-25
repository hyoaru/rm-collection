import { getBrowserClient } from "@services/supabase/getBrowserClient";

type GetUsersParams = {
  role?: "all" | "user" | "admin" | "admin_tier_1" | "admin_tier_2";
};

export default async function getUsers({ role }: GetUsersParams) {
  const supabase = getBrowserClient();

  const query = supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: true });

  switch (role) {
    case "user":
      query.eq("role", "user");
      break;
    case "admin":
      query.neq("role", "user");
      break;
    case "admin_tier_1":
      query.eq("role", "admin_tier_1");
      break;
    case "admin_tier_2":
      query.eq("role", "admin_tier_2");
      break;
    default:
      break;
  }

  const { data, error } = await query;
  return { data, error };
}

import { queryOptions } from "@tanstack/react-query";

// App imports
import getUsers from "@services/admin/shared/getUsers";

export function queryAllUsers() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: async () => await getUsers({ role: "all" }),
  });
}

export function queryUsers({ role }: { role: "user" | "admin" | "admin_tier_1" | "admin_tier_2" }) {
  return queryOptions({
    queryKey: ["users", { role: role }],
    queryFn: async () => await getUsers({ role: role }),
  });
}

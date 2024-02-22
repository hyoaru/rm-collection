import { queryOptions } from "@tanstack/react-query";

// App imports
import getUsers from "@services/admin/shared/getUsers";

export function queryAllUsers() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: () => getUsers({ role: "all" }),
  });
}

export function queryUsers(role: "all" | "user" | "admin" | "admin_tier_1" | "admin_tier_2") {
  return queryOptions({
    queryKey: role === "all" ? ["users"] : ["users", { role: role }],
    queryFn: () => getUsers({ role: role }),
  });
}

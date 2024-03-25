import { useMutation, useQueryClient } from "@tanstack/react-query";
import addSubAdmin from "@services/admin/operations/addSubAdmin";

export function useAddSubAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSubAdmin,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["users", { role: "admin" }], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["users", { role: "user" }], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["admin_logs"], refetchType: "all" });
    },
  });
}

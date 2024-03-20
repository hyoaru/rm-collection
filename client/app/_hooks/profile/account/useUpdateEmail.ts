import { useMutation, useQueryClient } from "@tanstack/react-query";

// App imports
import updateEmail from "@services/profile/account/updateEmail";

export function useUpdateEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmail,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: "all",
      });
    },
  });
}

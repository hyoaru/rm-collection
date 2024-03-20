import { useMutation, useQueryClient } from "@tanstack/react-query";

// App imports
import updateUserInformation from "@services/profile/account/updateUserInformation";

export function useUpdateUserInformation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInformation,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: "all",
      });
    },
  });
}

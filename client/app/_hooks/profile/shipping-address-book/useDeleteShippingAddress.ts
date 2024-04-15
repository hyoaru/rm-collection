import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteShippingAddress from "@services/profile/shipping-address-book/deleteShippingAddress";

export default function useDeleteShippingAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteShippingAddress,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["shipping-address-book"], refetchType: "all" });
    },
  });
}

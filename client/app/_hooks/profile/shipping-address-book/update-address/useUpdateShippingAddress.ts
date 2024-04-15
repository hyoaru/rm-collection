import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateShippingAddress from "@services/profile/shipping-address-book/update-address/updateShippingAddress";

export default function useUpdateShippingAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShippingAddress,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["shipping-address-book"], refetchType: "all" });
    },
  });
}

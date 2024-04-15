import { useMutation, useQueryClient } from "@tanstack/react-query";
import addShippingAddress from "@services/profile/shipping-address-book/add-address/addShippingAddress";

export default function useAddShippingAddresss() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addShippingAddress,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["shipping-address-book"], refetchType: "all" });
    },
  });
}

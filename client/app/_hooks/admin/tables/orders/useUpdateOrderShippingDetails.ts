import { useMutation, useQueryClient } from "@tanstack/react-query";

// App imports
import { updateOrderShippingDetails } from "@services/admin/tables/updateOrderShippingDetails";

export function useUpdateOrderShippingDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderShippingDetails,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["orders"], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["orders_shipping"], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["product_variants"], refetchType: "all" });
    },
  });
}

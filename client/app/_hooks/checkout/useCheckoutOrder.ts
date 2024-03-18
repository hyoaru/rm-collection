import { useMutation, useQueryClient } from "@tanstack/react-query";
import checkoutOrder from "@services/checkout/checkoutOrder";

export function useCheckoutOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutOrder,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "product_variants", "products", "orders_shipping", "cart"],
        refetchType: "all",
      });
    },
  });
}

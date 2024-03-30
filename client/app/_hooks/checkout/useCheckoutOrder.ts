import { useMutation, useQueryClient } from "@tanstack/react-query";
import checkoutOrder from "@services/checkout/checkoutOrder";

export function useCheckoutOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutOrder,
    onSuccess: async () => {
      ["orders", "product_variants", "products", "orders_shipping", "cart"].forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: [queryKey],
          refetchType: "all",
        });
      })
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";

// App imports
import addProductWithVariant from "@services/admin/operations/addProductWithVariant";

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductWithVariant,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["products", "latest-products", "discounted-products"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({ queryKey: ["products", { category: "all" }], refetchType: "all" });
    },
  });
}

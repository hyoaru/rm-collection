import { useMutation, useQueryClient } from "@tanstack/react-query";
import addProductWithVariant from "@services/admin/operations/addProductWithVariant";

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductWithVariant,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"], refetchType: "all" });
    },
  });
}

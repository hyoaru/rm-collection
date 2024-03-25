import { useMutation, useQueryClient } from "@tanstack/react-query";
import addToCart from "@services/collection/addToCart";

export default function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" });
    },
  });
}

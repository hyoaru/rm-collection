import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProductWithThumbnail from "@services/admin/operations/updateProductWithThumbnail";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductWithThumbnail,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-thumbnail"] });
    },
  });
}

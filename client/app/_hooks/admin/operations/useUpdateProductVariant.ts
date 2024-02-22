import { useMutation, useQueryClient } from "@tanstack/react-query";

// App imports
import updateProductVariantWithImages from "@services/admin/operations/updateProductVariantWithImages";

export function useUpdateProductVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductVariantWithImages,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["product_variants"] });
    },
  });
}

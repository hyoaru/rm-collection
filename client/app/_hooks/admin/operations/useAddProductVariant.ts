import { useMutation, useQueryClient } from "@tanstack/react-query";
import addProductVariantWithImages from "@services/admin/operations/addProductVariantWithImages";
import { AsyncReturnType } from "@constants/shared/types";

export default function useAddProductVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductVariantWithImages,
    onSuccess: async (response: AsyncReturnType<typeof addProductVariantWithImages>) => {
      queryClient.invalidateQueries({ queryKey: ["product", response.data?.product_id], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: ["product_variants"], refetchType: 'all' });
    },
  });
}

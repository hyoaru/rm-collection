import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProductWithThumbnail from "@services/admin/operations/updateProductWithThumbnail";
import revalidateAllImages from "@/app/_services/shared/revalidateAllImages";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductWithThumbnail,
    onSuccess: async () => {
      await revalidateAllImages()
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-thumbnail"] });
    },
  });
}

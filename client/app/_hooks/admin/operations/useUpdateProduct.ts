import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// App imports
import { AsyncReturnType } from "@constants/shared/types";
import updateProductWithThumbnail from "@services/admin/operations/updateProductWithThumbnail";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductWithThumbnail,
    onSuccess: async (response: AsyncReturnType<typeof updateProductWithThumbnail>) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", response.data?.id] });
    },
  });
}

import * as z from "zod";
import { AsyncReturnType } from "@constants/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProductWithThumbnail from "@services/admin/operations/updateProductWithThumbnail";
import { ProductsResponseType, ProductResponseType } from "@constants/base/types";
import updateObjectValues from "@lib/updateObjectValues";

export function useUpdateProduct(formSchema: z.ZodObject<any>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductWithThumbnail,
    onMutate: async (response: z.infer<typeof formSchema>) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })
      await queryClient.cancelQueries({ queryKey: ['product'] })

      const previousProduct = queryClient.getQueryData(['product', response.id]) as ProductsResponseType
      const previousProducts = queryClient.getQueryData(['products']) as ProductsResponseType
      const productToUpdateIndex = previousProducts.data.findIndex((product) => product.id === response.id)
      const productToUpdate = previousProducts.data[productToUpdateIndex]
      const updatedProduct = updateObjectValues({itemToUpdate: productToUpdate, partiallyUpdatedItem: response})

      if (updatedProduct) {
        previousProducts.data[productToUpdateIndex] = updatedProduct
        queryClient.setQueryData(['products'], (old: ProductsResponseType | undefined) => ({
          data: [...previousProducts?.data],
          error: old?.error
        }))

        queryClient.setQueryData(['product', updatedProduct.id], (old: ProductResponseType | undefined) => ({
          data: updatedProduct,
          error: old?.error
        }))
      }

      return { previousProduct }
    },
    onSuccess: async (response: AsyncReturnType<typeof updateProductWithThumbnail>) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

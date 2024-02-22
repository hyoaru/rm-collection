import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// App imports
import { AsyncReturnType } from "@constants/shared/types";
import updateProductVariantWithImages from "@services/admin/operations/updateProductVariantWithImages";
import { ProductsResponseType, ProductResponseType } from "@constants/base/types";
import updateObjectValues from "@lib/updateObjectValues";

export function useUpdateProductVariant(formSchema: z.ZodObject<any>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductVariantWithImages,
    onMutate: async (response: z.infer<typeof formSchema>) => {
      // console.log(response)
      // await queryClient.cancelQueries({ queryKey: ['product_variants'] })

      // const previousProductVariant = queryClient.getQueryData(['product_variants']) as ProductsResponseType
      // const previousProducts = queryClient.getQueryData(['products']) as ProductsResponseType
      // const productToUpdateIndex = previousProducts.data.findIndex((product) => product.id === response.id)
      // const productToUpdate = previousProducts.data[productToUpdateIndex]
      // const updatedProduct = updateObjectValues({itemToUpdate: productToUpdate, partiallyUpdatedItem: response})

      // if (updatedProduct) {
      //   previousProducts.data[productToUpdateIndex] = updatedProduct
      //   queryClient.setQueryData(['products'], (old: ProductsResponseType | undefined) => ({
      //     data: [...previousProducts?.data],
      //     error: old?.error
      //   }))

      //   queryClient.setQueryData(['product', updatedProduct.id], (old: ProductResponseType | undefined) => ({
      //     data: updatedProduct,
      //     error: old?.error
      //   }))
      // }

      // return { previousProduct }
    },
    onSuccess: async (response: AsyncReturnType<typeof updateProductVariantWithImages>) => {
      queryClient.invalidateQueries({ queryKey: ["product_variants"] });
      // queryClient.invalidateQueries({ queryKey: ["product", response.data?.id] });
    },
  });
}

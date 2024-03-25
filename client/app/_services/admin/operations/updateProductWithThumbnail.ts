import updateProduct from "@services/admin/operations/updateProduct";
import updateProductThumbnail from "@services/admin/operations/updateProductThumbnail";
import logAdminAction from "../shared/logAdminAction";

type UpdateProductWithThumbnailParams = {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: FileList;
};

export default async function updateProductWithThumbnail({
  id,
  name,
  description,
  category,
  thumbnail,
}: UpdateProductWithThumbnailParams) {
  const { data, error } = await updateProduct({
    id: id,
    name: name,
    description: description,
    category: category,
  })
    .then(async ({ data: updateProductData, error: updateProductError }) => {
      if (updateProductError || !updateProductData) {
        return { data: updateProductData, error: updateProductError };
      }

      if (thumbnail) {
        const { error } = await updateProductThumbnail({
          productId: id,
          thumbnail: thumbnail,
        });

        return { data: updateProductData, error };
      }

      return { data: updateProductData, error: updateProductError };
    })
    .then(async ({ data: updateProductData, error: updateProductError }) => {
      if (updateProductError || !updateProductData) {
        return { data: updateProductData, error: updateProductError };
      }

      const details = {
        id,
        name,
        description,
        category,
        thumbnail: thumbnail?.[0]?.name,
      };

      await logAdminAction({
        action: "update product",
        details: JSON.stringify(details),
      });

      return { data: updateProductData, error: updateProductError };
    });

  return { data, error };
}

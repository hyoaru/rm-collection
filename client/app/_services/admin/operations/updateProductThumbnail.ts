import deleteProductThumbnail from "@services/admin/operations/deleteProductThumbnail";
import addProductThumbnail from "@services/admin/operations/addProductThumbnail";

type UpdateProductThumbnailParams = {
  thumbnail: FileList;
  productId: string;
};

export default async function updateProductThumbnail({ thumbnail, productId }: UpdateProductThumbnailParams) {
  const { data, error } = await deleteProductThumbnail(productId)
  .then(async ({ data: deleteProductThumbnailData, error: deleteProductThumbnailError }) => {
      if (deleteProductThumbnailError || !deleteProductThumbnailData) {
        return { data: deleteProductThumbnailData, error: deleteProductThumbnailError };
      }

      const { data, error } = await addProductThumbnail({
        thumbnail: thumbnail,
        productId: productId,
      });

      return { data, error };
    }
  );

  return { data, error };
}

import addProduct from "@services/admin/operations/addProduct";
import addProductThumbnail from "@services/admin/operations/addProductThumbnail";
import logAdminAction from "@services/admin/shared/logAdminAction";

type AddProductVariantImagesParams = {
  name: string;
  description: string;
  category: string;
  thumbnail: FileList;
  stockLocations: string[];
};

export default async function addProductWithThumbnail({
  name,
  description,
  category,
  thumbnail,
  stockLocations
}: AddProductVariantImagesParams) {
  const { data, error } = await addProduct({
    name: name,
    description: description,
    category: category,
    stockLocations: stockLocations,
  })
    .then(async ({ data: addProductData, error: addProductError }) => {
      if (addProductError || !addProductData) {
        return { data: addProductData, error: addProductError };
      }

      const { data, error } = await addProductThumbnail({
        productId: addProductData.id,
        thumbnail: thumbnail,
      });

      return { data: addProductData, error };
    })
    .then(async ({ data: addProductData, error: addProductThumbnailError }) => {
      if (addProductThumbnailError || !addProductData) {
        return { data: addProductData, error: addProductThumbnailError };
      }

      const details = {
        name: name,
        description: description,
        category: category,
        thumbnail: thumbnail[0].name,
        stock_locations: stockLocations,
      };

      await logAdminAction({
        action: "add product",
        details: JSON.stringify(details),
      });

      return { data: addProductData, error: addProductThumbnailError };
    });

  return { data, error };
}

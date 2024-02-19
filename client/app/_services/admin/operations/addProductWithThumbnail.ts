import addProduct from "@services/admin/operations/addProduct";
import addProductThumbnail from "@services/admin/operations/addProductThumbnail";

type AddProductVariantImagesParams = {
  name: string;
  description: string;
  category: string;
  thumbnail: FileList;
};

export default async function addProductWithThumbnail({
  name,
  description,
  category,
  thumbnail,
}: AddProductVariantImagesParams) {
  const { data, error } = await addProduct({
    name: name,
    description: description,
    category: category,
  }).then(async ({ data: addProductData, error: addProductError }) => {
    if (addProductError || !addProductData) {
      return { data: addProductData, error: addProductError };
    }

    const { data, error } = await addProductThumbnail({
      productId: addProductData.id,
      thumbnail: thumbnail,
    });

    return { data: addProductData, error };
  });

  return { data, error };
}

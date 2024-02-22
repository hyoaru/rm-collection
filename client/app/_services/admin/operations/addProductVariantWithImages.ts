import addProductVariant from "@services/admin/operations/addProductVariant";
import addProductVariantImages from "@services/admin/operations/addProductVariantImages";

type AddProductVariantImagesParams = {
  product: { id: string };
  productVariant: {
    material: string;
    materialProperty: string;
    size: string | null;
    quantity: number;
    price: number;
    discountRate: number;
    images: FileList;
  };
};

export default async function addProductVariantWithImages({ product, productVariant }: AddProductVariantImagesParams) {
  const { data, error } = await addProductVariant({
    product: { id: product.id },
    productVariant: {
      material: productVariant.material,
      materialProperty: productVariant.materialProperty,
      size: productVariant.size,
      quantity: productVariant.quantity,
      price: productVariant.price,
      discountRate: productVariant.discountRate,
    },
  }).then(async ({ data: addProductVariantData, error: addProductVariantError }) => {
    if (addProductVariantError || !addProductVariantData) {
      return { data: addProductVariantData, error: addProductVariantError };
    }

    const { data, error } = await addProductVariantImages({
      images: productVariant.images,
      product: { id: product.id },
      productVariant: { id: addProductVariantData.id },
    });

    return { data: addProductVariantData, error };
  });

  return { data, error };
}
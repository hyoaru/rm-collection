import addProductVariant from "@services/admin/operations/addProductVariant";
import addProductVariantImages from "@services/admin/operations/addProductVariantImages";
import logAdminAction from "@services/admin/shared/logAdminAction";

type AddProductVariantImagesParams = {
  product: { id: string };
  productVariant: {
    material: string;
    materialProperty: string;
    size: string | null;
    weight: string | null;
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
      weight: productVariant.weight,
      quantity: productVariant.quantity,
      price: productVariant.price,
      discountRate: productVariant.discountRate,
    },
  })
    .then(async ({ data: addProductVariantData, error: addProductVariantError }) => {
      if (addProductVariantError || !addProductVariantData) {
        return { data: addProductVariantData, error: addProductVariantError };
      }

      const { data, error } = await addProductVariantImages({
        images: productVariant.images,
        product: { id: product.id },
        productVariant: { id: addProductVariantData.id },
      });

      return { data: addProductVariantData, error };
    })
    .then(async ({ data: addProductVariantData, error: addProductVariantImagesError }) => {
      if (addProductVariantImagesError || !addProductVariantData) {
        return { data: addProductVariantData, error: addProductVariantImagesError };
      }

      const details = {
        product,
        productVariant: {
          ...productVariant,
          images: Array.from(productVariant.images).map((file) => file.name),
        },
      };

      await logAdminAction({
        action: "Add product variant",
        details: JSON.stringify(details),
      });

      return { data: addProductVariantData, error: addProductVariantImagesError };
    });

  return { data, error };
}

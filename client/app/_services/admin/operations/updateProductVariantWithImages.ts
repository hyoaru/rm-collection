import updateProductVariant from "@services/admin/operations/updateProductVariant";
import updateProductVariantImages from "@services/admin/operations/updateProductVariantImages";
import logAdminAction from "@services/admin/shared/logAdminAction";

type UpdateProductVariantWithImagesParams = {
  product: { id: string };
  productVariant: {
    id: string;
    material: string;
    materialProperty: string;
    size: string | null;
    weight: string | null;
    quantity: number;
    price: number;
    discountRate: number;
    images?: FileList;
  };
};

export default async function updateProductVariantWithImages({
  product,
  productVariant,
}: UpdateProductVariantWithImagesParams) {
  const { data, error } = await updateProductVariant({
    id: productVariant.id,
    material: productVariant.material,
    materialProperty: productVariant.materialProperty,
    size: productVariant.size,
    weight: productVariant.weight,
    quantity: productVariant.quantity,
    price: productVariant.price,
    discountRate: productVariant.discountRate,
  })
    .then(async ({ data: updateProductVariantData, error: updateProductVariantError }) => {
      if (updateProductVariantError || !updateProductVariantData) {
        return { data: updateProductVariantData, error: updateProductVariantError };
      }

      if (productVariant.images) {
        const { data, error } = await updateProductVariantImages({
          images: productVariant.images,
          productId: product.id,
          variantId: productVariant.id,
        });

        return { data: updateProductVariantData, error };
      }

      return { data: updateProductVariantData, error: updateProductVariantError };
    })
    .then(async ({ data: updateProductVariantData, error: updateProductVariantError }) => {
      if (updateProductVariantError || !updateProductVariantData) {
        return { data: updateProductVariantData, error: updateProductVariantError };
      }

      const details = {
        product,
        productVariant: {
          ...productVariant,
          images: productVariant?.images ? Array.from(productVariant.images).map((file) => file.name) : null,
        },
      };

      await logAdminAction({
        action: "update product variant",
        details: JSON.stringify(details),
      });

      return { data: updateProductVariantData, error: updateProductVariantError };
    });

  return { data, error };
}

import addProductVariantWithImages from "@services/admin/operations/addProductVariantWithImages";
import addProductWithThumbnail from "@services/admin/operations/addProductWithThumbnail";

type AddProductWithVariantParams = {
  product: {
    name: string;
    description: string;
    category: string;
    thumbnail: FileList;
  };
  productVariant: {
    material: string;
    materialProperty: string;
    quantity: number;
    price: number;
    discountRate: number;
    size: string | null;
    weight: string | null;
    images: FileList;
  };
};

export default async function addProductWithVariant({ product, productVariant }: AddProductWithVariantParams) {
  const { data, error } = await addProductWithThumbnail({
    name: product.name,
    description: product.description,
    category: product.category,
    thumbnail: product.thumbnail,
  })
    .then(async ({ data: addProductData, error: addProductError }) => {
      if (addProductError || !addProductData) {
        return { data: addProductData, error: addProductError };
      }

      const { data, error } = await addProductVariantWithImages({
        product: { id: addProductData.id },
        productVariant: {
          material: productVariant.material,
          materialProperty: productVariant.materialProperty,
          quantity: productVariant.quantity,
          price: productVariant.price,
          discountRate: productVariant.discountRate,
          size: productVariant.size,
          weight: productVariant.weight,
          images: productVariant.images,
        },
      });

      return { data, error };
    });

  return { data, error };
}

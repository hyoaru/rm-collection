import { getBrowserClient } from "@services/supabase/getBrowserClient";

type GetProductVariantImagesPublicUrlParams = {
  productId: string;
  variantId: string;
};

export default async function getProductVariantImagesPublicUrl({
  productId,
  variantId,
}: GetProductVariantImagesPublicUrlParams) {
  const BUCKET_NAME = 'products'
  const supabase = getBrowserClient();
  let productVariantImagesPublicUrl: string[] = [];

  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME)
    .list(`${productId}/${variantId}`, {
      limit: 4,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    })
    .then(async ({ data: imagesListData, error: imagesListError }) => {
      if (imagesListError) {
        return { data: imagesListData, error: imagesListError };
      }

      imagesListData.forEach((imageFile) => {
        const { data } = supabase
          .storage
          .from(BUCKET_NAME)
          .getPublicUrl(`${productId}/${variantId}/${imageFile?.name}`);

        const productVariantImagePublicUrl = data?.publicUrl;
        productVariantImagesPublicUrl.push(productVariantImagePublicUrl);
      });

      return { imagesListData, imagesListError };
    });

  return productVariantImagesPublicUrl;
}

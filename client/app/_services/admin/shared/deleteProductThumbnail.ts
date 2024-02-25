import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function deleteProductThumbnail(productId: string) {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .storage
    .from("products")
    .list(`${productId}/`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    })
    .then(async ({ data: imagesListData, error: imagesListError }) => {
      if (imagesListError || !imagesListData) {
        return { data: imagesListData, error: imagesListError };
      }

      const productThumbnail = imagesListData
        .filter((item) => item.id)
        .map((item) => `${productId}/${item.name}`);

      const { data, error } = await supabase
        .storage
        .from("products")
        .remove(productThumbnail);

      return { data, error };
    });

  return { data, error };
}

import { getBrowserClient } from "@services/supabase/getBrowserClient";
import NoImageFound from "@/public/no-image-found.png";

export default function getProductThumbnailPublicUrl({ productId }: { productId: string }) {
  const BUCKET_NAME = "products";
  const supabase = getBrowserClient();
  const { data } = supabase
    .storage
    .from(BUCKET_NAME)
    .getPublicUrl(`${productId}/thumbnail.jpeg`);

  const thumbnailPublicUrl = !productId ? NoImageFound : data?.publicUrl;
  return thumbnailPublicUrl;
}

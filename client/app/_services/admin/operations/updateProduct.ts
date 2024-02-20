"use server";

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

type UpdateProductParams = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export default async function updateProduct({ id, name, description, category }: UpdateProductParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("products")
    .update({ name: name, description: description, category: category })
    .eq("id", id)
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

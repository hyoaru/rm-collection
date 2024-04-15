"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

export default async function deleteShippingAddress(shippingAddressId: string) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("shipping_address_book")
    .delete()
    .eq("id", shippingAddressId)
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

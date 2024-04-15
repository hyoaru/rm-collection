import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getShippingAddressBookByUser(userId: string) {
  const supabase = getBrowserClient();

  const { data, error } = await supabase
    .from("shipping_address_book")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");

  return { data, error };
}

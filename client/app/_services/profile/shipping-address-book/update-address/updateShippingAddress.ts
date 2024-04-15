"use server";

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

type UpdateShippingAddressParams = {
  id: string;
  receiverEmail: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhoneNumber: string;
  shippingCountry: string;
  shippingAddress: string;
  shippingZipCode: string;
};

export default async function updateShippingAddress({
  id,
  receiverEmail,
  receiverFirstName,
  receiverLastName,
  receiverPhoneNumber,
  shippingCountry,
  shippingAddress,
  shippingZipCode,
}: UpdateShippingAddressParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("shipping_address_book")
    .update({
      receiver_email: receiverEmail,
      receiver_first_name: receiverFirstName,
      receiver_last_name: receiverLastName,
      receiver_phone_number: receiverPhoneNumber,
      shipping_country: shippingCountry,
      shipping_address: shippingAddress,
      shipping_zip_code: shippingZipCode,
    })
    .eq("id", id)
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

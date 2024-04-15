"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type AddShippingAddressParams = {
  userId: string;
  receiverEmail: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhoneNumber: string;
  shippingCountry: string;
  shippingAddress: string;
  shippingZipCode: string;
};

export default async function addShippingAddress({
  userId,
  receiverEmail,
  receiverFirstName,
  receiverLastName,
  receiverPhoneNumber,
  shippingCountry,
  shippingAddress,
  shippingZipCode,
}: AddShippingAddressParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("shipping_address_book")
    .insert({
      user_id: userId,
      receiver_email: receiverEmail,
      receiver_first_name: receiverFirstName,
      receiver_last_name: receiverLastName,
      receiver_phone_number: receiverPhoneNumber,
      shipping_country: shippingCountry,
      shipping_address: shippingAddress,
      shipping_zip_code: shippingZipCode,
    })
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

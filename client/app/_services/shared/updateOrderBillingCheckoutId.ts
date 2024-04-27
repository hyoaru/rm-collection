"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type UpdateOrderBillingCheckoutIdParams = {
  id: string;
  checkoutId: string;
};

export default async function updateOrderBillingCheckoutId({ id, checkoutId }: UpdateOrderBillingCheckoutIdParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders_billing")
    .update({ checkout_id: checkoutId })
    .eq("id", id)
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

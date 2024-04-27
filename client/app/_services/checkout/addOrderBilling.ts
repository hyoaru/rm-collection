"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

export default async function addOrderBilling() {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders_billing")
    .insert({})
    .select()
    .single()

  return { data, error: processErrorToCrossSideSafe(error) }
}

"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type SetOrderBillingStatusParams = {
  id: string;
  status: string;
};

export default async function setOrderBillingStatus({ id, status }: SetOrderBillingStatusParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders_billing")
    .update({ status: status })
    .eq("id", id)
    .select()
    .single();

  return { data, error: processErrorToCrossSideSafe(error) };
}

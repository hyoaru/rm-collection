"use server";

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

const orderStatusMap = {
  "cancelled_by_user": 0,
  "cancelled_by_management": 1,
  pending: 2,
  "to_ship": 3,
  "to_receive": 4,
  completed: 5,
} as const;

type ToShipOrderGroupByOrderBillingIdParams = {
  orderBillingId: string;
};

export default async function toShipOrderGroupByOrderBillingId({
  orderBillingId,
}: ToShipOrderGroupByOrderBillingIdParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status_id: orderStatusMap["to_ship"] })
    .eq("order_billing_id", orderBillingId)
    .select();

  return { data, error: processErrorToCrossSideSafe(error) };
}

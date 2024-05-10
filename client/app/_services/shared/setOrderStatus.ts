"use server";

import { Tables } from "@constants/base/database-types";
import { getServerClient } from "@services/supabase/getServerClient";

const orderStatusMap = {
  "cancelled_by_user": 0,
  "cancelled_by_management": 1,
  "pending": 2,
  "to_ship": 3,
  "to_receive": 4,
  "completed": 5,
} as const;

type SetOrderStatusParams = {
  order: Tables<'orders'>;
  status: keyof typeof orderStatusMap;
};

export default async function setOrderStatus({ order, status }: SetOrderStatusParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status_id: orderStatusMap[status] })
    .eq("id", order.id)
    .select()
    .single()

  return { data, error };
}

"use server";

import { Tables } from "@constants/base/database-types";
import { getServerClient } from "@services/supabase/getServerClient";
import logAdminAction from "@services/admin/shared/logAdminAction";

const orderStatusMap = {
  "cancelled-by-user": 0,
  "cancelled-by-management": 1,
  "pending": 2,
  "to-ship": 3,
  "to-receive": 4,
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
    .then(async ({data, error}) => {
      if (error || !data) {
        return {data, error}
      }
      
      await logAdminAction({
        action: "set order status",
        details: JSON.stringify({status, order})
      })
      
      return {data, error}
    })

  return { data, error };
}

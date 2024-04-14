"use server";

import { Tables } from "@constants/base/database-types";
import { getServerClient } from "@services/supabase/getServerClient";
import sendEmailOrderCancelledByUser from "@services/shared/email/sendEmailOrderCancelledByUser";
import cancelOrderGroup from "../shared/cancelOrderGroup";

const orderStatusMap = {
  "cancelled-by-user": 0,
  "cancelled-by-management": 1,
  pending: 2,
  "to-ship": 3,
  "to-receive": 4,
  completed: 5,
} as const;

type SetOrderGroupStatusParams = {
  order: Tables<"orders">;
  status: keyof typeof orderStatusMap;
};

export default async function setOrderGroupStatus({ order, status }: SetOrderGroupStatusParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status_id: orderStatusMap[status] })
    .eq("order_group", order.order_group)
    .select()
    .then(async ({ data: updateOrderGroupStatusData, error: updateOrderGroupStatusError }) => {
      if (updateOrderGroupStatusError || !updateOrderGroupStatusData) {
        return { data: updateOrderGroupStatusData, error: updateOrderGroupStatusError };
      }

      let response;
      if (status === "cancelled-by-user") {
        await sendEmailOrderCancelledByUser({ orderGroup: order.order_group });
        const { data, error } = await cancelOrderGroup(order.order_group);
        response = { data, error };
      }

      return { data: response!.data, error: response!.error };
    });

  return { data, error };
}

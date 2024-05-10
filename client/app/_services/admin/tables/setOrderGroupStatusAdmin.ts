"use server";

import { Tables } from "@constants/base/database-types";
import { getServerClient } from "@services/supabase/getServerClient";
import logAdminAction from "@services/admin/shared/logAdminAction";
import sendEmailOrderCancelledByManagement from "@services/shared/email/sendEmailOrderCancelledByManagement";
import sendEmailOrderToReceive from "@services/shared/email/sendEmailOrderToReceive";
import cancelOrderGroup from "@services/shared/cancelOrderGroup";

const orderStatusMap = {
  "cancelled_by_management": 1,
  pending: 2,
  "to_ship": 3,
  "to_receive": 4,
  completed: 5,
} as const;

type SetOrderGroupStatusParams = {
  order: Tables<"orders">;
  status: keyof typeof orderStatusMap;
};

export default async function setOrderGroupStatusAdmin({ order, status }: SetOrderGroupStatusParams) {
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

      await logAdminAction({
        action: "set order status",
        details: JSON.stringify({ status, order }),
      });

      let response;
      switch (status) {
        case "cancelled_by_management":
          await sendEmailOrderCancelledByManagement({ orderGroup: updateOrderGroupStatusData[0].order_group });
          const { data, error } = await cancelOrderGroup(order.order_group);
          response = { data, error };
          break;
        case "to_receive":
          await sendEmailOrderToReceive({ orderGroup: updateOrderGroupStatusData[0].order_group });
          break;
      }

      return { data: response?.data, error: response?.error };
    });

  return { data, error };
}

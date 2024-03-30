"use server";

import { Tables } from "@constants/base/database-types";
import { getServerClient } from "@services/supabase/getServerClient";
import logAdminAction from "@services/admin/shared/logAdminAction";
import sendEmailOrderCancelledByManagement from "@services/shared/email/sendEmailOrderCancelledByManagement";
import sendEmailOrderCancelledByUser from "@services/shared/email/sendEmailOrderCancelledByUser";
import sendEmailOrderToReceive from "@services/shared/email/sendEmailOrderToReceive";

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

export default async function setOrderGroupStatusAdmin({ order, status }: SetOrderGroupStatusParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status_id: orderStatusMap[status] })
    .eq("order_group", order.order_group)
    .select()
    .then(async ({ data, error }) => {
      if (error || !data) {
        return { data, error };
      }

      switch (status) {
        case "cancelled-by-user":
          await sendEmailOrderCancelledByUser({ orderGroup: data[0].order_group });
          break;
        case "cancelled-by-management":
          await sendEmailOrderCancelledByManagement({ orderGroup: data[0].order_group });
          break;
        case "to-receive":
          await sendEmailOrderToReceive({ orderGroup: data[0].order_group });
          break;
      }

      await logAdminAction({
        action: "set order status",
        details: JSON.stringify({ status, order }),
      });

      return { data, error };
    });

  return { data, error };
}

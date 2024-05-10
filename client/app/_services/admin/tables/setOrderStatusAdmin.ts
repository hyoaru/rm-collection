"use server";

import { Tables } from "@constants/base/database-types";
import { getServerClient } from "@services/supabase/getServerClient";
import logAdminAction from "@services/admin/shared/logAdminAction";
import setOrderStatus from "@services/shared/setOrderStatus";

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

export default async function setOrderStatusAdmin({ order, status }: SetOrderStatusParams) {
  const supabase = getServerClient();

  const { data, error } = await setOrderStatus({ order, status })
    .then(async ({ data, error }) => {
      if (error || !data) {
        return { data, error }
      }

      await logAdminAction({
        action: "set order status",
        details: JSON.stringify({ status, order })
      })

      return { data, error }
    })

  return { data, error };
}

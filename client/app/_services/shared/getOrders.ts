import { OrderStatusType } from "@constants/base/types";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

type GetOrdersParams = {
  orderStatus?: OrderStatusType;
  userId?: string;
};

export default async function getOrders({ orderStatus, userId }: GetOrdersParams) {
  const supabase = getBrowserClient();

  const query = supabase
    .from("orders")
    .select(`*, order_status(*)`)
    .order("created_at", { ascending: true });

  if (orderStatus) {
    switch (orderStatus) {
      case "all":
        break;
      default:
        query.eq('order_status.label', orderStatus)
        break;
    }
  }

  if (userId) {
    query.eq('user_id', userId)
  }

  const { data, error } = await query
  return { data, error }
}

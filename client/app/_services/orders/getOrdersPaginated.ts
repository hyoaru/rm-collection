import getPagination from "@lib/getPagination";
import { getBrowserClient } from "@services/supabase/getBrowserClient";

type GetOrdersPaginatedParams = {
  pageParam: number;
  userId: string
};

export default async function getOrdersPaginated({ pageParam: page = 0, userId }: GetOrdersPaginatedParams) {
  const supabase = getBrowserClient();
  const { from, to, itemsPerPage } = getPagination({ page: page });

  const { data, error, count } = await supabase
    .from("orders")
    .select(`*, users(*), order_status(*), product_variants(*, products(*)), orders_shipping(*)`, { count: "exact" })
    .eq('user_id', userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  const endPage = Math.ceil((count ?? itemsPerPage) / itemsPerPage) - 1;
  return { data, error, count, page: page, endPage };
}

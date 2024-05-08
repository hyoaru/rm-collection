"use server";

import getMayaPaymentStatus from "@services/shared/getMayaPaymentStatus";
import setOrderBillingStatus from "@services/shared/setOrderBillingStatus";
import getMayaServiceStatus from "@services/shared/getMayaServiceStatus";
import { OrderType } from "@constants/shared/types";
import setOrderGroupStatus from "@services/orders/setOrderGroupStatus";
import { Tables } from "@constants/base/database-types";

type SyncOrderGroupBillingMayaPaymentStatusParams = {
  order: OrderType;
};

export default async function syncOrderGroupBillingMayaPaymentStatus({
  order,
}: SyncOrderGroupBillingMayaPaymentStatusParams) {
  let response;

  const mayaServiceStatus = await getMayaServiceStatus();
  if (mayaServiceStatus.error) {
    response = { data: null, error: mayaServiceStatus.error };
    return response;
  }

  const checkoutId = order.orders_billing?.checkout_id;
  const isTransactionCompleted = order.orders_billing?.status === "success";
  if (!checkoutId || isTransactionCompleted) {
    response = { data: null, error: null };
    return response;
  }

  response = await getMayaPaymentStatus({ checkoutId: checkoutId }).then(
    async ({ data: paymentStatusData, error: paymentStatusError }) => {
      if (!paymentStatusData || paymentStatusError) {
        return { data: paymentStatusData, error: paymentStatusError };
      }

      let syncOrderBillingResponse;
      switch (paymentStatusData.status.toLowerCase()) {
        case "payment_success":
          syncOrderBillingResponse = await setOrderBillingStatus({ id: order.order_billing_id, status: "success" });
          await setOrderGroupStatus({ order: order as Tables<"orders">, status: "to-ship" });
          break;
        case "payment_failed":
          syncOrderBillingResponse = await setOrderBillingStatus({ id: order.order_billing_id, status: "failed" });
          break;
        case "payment_cancelled":
          syncOrderBillingResponse = await setOrderBillingStatus({ id: order.order_billing_id, status: "cancelled" });
          break;
        default:
          break;
      }

      return syncOrderBillingResponse;
    }
  );

  return { data: response?.data, error: response?.error };
}

"use server";

import getMayaPaymentStatus from "@services/shared/getMayaPaymentStatus";
import setOrderBillingStatus from "@services/shared/setOrderBillingStatus";
import getMayaServiceStatus from "@services/shared/getMayaServiceStatus";
import toShipOrderGroupByOrderBillingId from "./toShipOrderGroupByOrderBillingId";

type SyncOrderBillingMayaPaymentStatusParams = {
  id: string;
  checkoutId: string;
};

export default async function syncOrderBillingMayaPaymentStatus({
  id,
  checkoutId,
}: SyncOrderBillingMayaPaymentStatusParams) {
  let response;

  const mayaServiceStatus = await getMayaServiceStatus();
  if (mayaServiceStatus.error) {
    response = { data: null, error: mayaServiceStatus.error };
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
          syncOrderBillingResponse = await setOrderBillingStatus({ id: id, status: "success" });
          await toShipOrderGroupByOrderBillingId({ orderBillingId: id });
          break;
        case "payment_failed":
          syncOrderBillingResponse = await setOrderBillingStatus({ id: id, status: "failed" });
          break;
        case "payment_cancelled":
          syncOrderBillingResponse = await setOrderBillingStatus({ id: id, status: "cancelled" });
          break;
        default:
          break;
      }

      return syncOrderBillingResponse;
    }
  );

  return { data: response?.data, error: response?.error };
}

"use server";

import getMayaPaymentStatus from "@services/shared/getMayaPaymentStatus";
import setOrderBillingStatus from "@services/shared/setOrderBillingStatus";

type SyncOrderBillingMayaPaymentStatusParams = {
  id: string;
  checkoutId: string;
};

export default async function syncOrderBillingMayaPaymentStatus({
  id,
  checkoutId,
}: SyncOrderBillingMayaPaymentStatusParams) {
  const { data, error } = await getMayaPaymentStatus({ checkoutId: checkoutId }).then(
    async ({ data: paymentStatusData, error: paymentStatusError }) => {
      if (!paymentStatusData || paymentStatusError) {
        return { data: paymentStatusData, error: paymentStatusError };
      }
      let response;

      switch (paymentStatusData.status.toLowerCase()) {
        case "payment_success":
          response = await setOrderBillingStatus({ id: id, status: "success" });
          break;
        case "payment_failed":
          response = await setOrderBillingStatus({ id: id, status: "failed" });
          break;
        case "payment_cancelled":
          response = await setOrderBillingStatus({ id: id, status: "cancelled" });
          break;
        default:
          break;
      }

      return { data: response?.data, error: response?.error };
    }
  );

  return { data, error };
}

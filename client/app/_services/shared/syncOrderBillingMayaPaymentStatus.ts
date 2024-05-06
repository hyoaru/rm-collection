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

      const { data, error } = await setOrderBillingStatus({ id: id, status: paymentStatusData.status.toLowerCase() });

      return { data, error };
    }
  );

  return { data, error };
}

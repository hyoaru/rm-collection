import { queryOptions } from "@tanstack/react-query";

// App imports
import syncOrderBillingMayaPaymentStatus from "@services/shared/syncOrderBillingMayaPaymentStatus";
import { OrderType } from "@constants/shared/types";

export function querySyncOrderBillingMayaPaymentStatus({ order, isEnabled }: { order: OrderType, isEnabled?: boolean }) {
  return queryOptions({
    queryKey: ["orders", "orders_billing", "orders_shipping"],
    queryFn: () => syncOrderBillingMayaPaymentStatus({ order: order }),
    enabled: isEnabled ?? true
  });
}

"use server";

import sendEmail from "@services/shared/email/sendEmail";
import OrderPending from "@components/shared/email/OrderPending";
import getOrdersByGroupServer from "@services/shared/getOrdersByGroupServer";

type SendEmailOrderPendingParams = {
  orderGroup: string;
};

export default async function sendEmailOrderPending({ orderGroup }: SendEmailOrderPendingParams) {
  const { data, error } = await getOrdersByGroupServer(orderGroup).then(
    async ({ data: ordersData, error: ordersError }) => {
      if (ordersError || !ordersData) {
        return { data: ordersData, error: ordersError };
      }

      const { data, error } = await sendEmail({
        targetEmail: `${ordersData[0].users?.email}, ${ordersData[0].orders_shipping?.receiver_email}`,
        subject: "Order being processed",
        html: OrderPending({ orders: ordersData }),
      });

      return { data, error };
    }
  );

  return { data, error };
}

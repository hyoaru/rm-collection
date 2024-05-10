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

      const buyerEmail = ordersData[0].users?.email
      const receiverEmail = ordersData[0].orders_shipping?.receiver_email

      const { data, error } = await sendEmail({
        targetEmail: buyerEmail === receiverEmail ? `${buyerEmail}` : `${buyerEmail}, ${receiverEmail}`,
        subject: "Order being processed",
        html: OrderPending({ orders: ordersData }),
      });

      return { data, error };
    }
  );

  return { data, error };
}

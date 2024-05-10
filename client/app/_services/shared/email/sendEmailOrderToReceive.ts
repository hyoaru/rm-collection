"use server";

import sendEmail from "@services/shared/email/sendEmail";
import OrderToReceive from "@components/shared/email/OrderToReceive";
import getOrdersByGroupServer from "@services/shared/getOrdersByGroupServer";

type SendEmailOrderToReceiveParams = {
  orderGroup: string;
};

export default async function sendEmailOrderToReceive({ orderGroup }: SendEmailOrderToReceiveParams) {
  const { data, error } = await getOrdersByGroupServer(orderGroup).then(
    async ({ data: ordersData, error: ordersError }) => {
      if (ordersError || !ordersData) {
        return { data: ordersData, error: ordersError };
      }

      const buyerEmail = ordersData[0].users?.email
      const receiverEmail = ordersData[0].orders_shipping?.receiver_email

      const { data, error } = await sendEmail({
        targetEmail: buyerEmail === receiverEmail ? `${buyerEmail}` : `${buyerEmail}, ${receiverEmail}`,
        subject: "Order to receive",
        html: OrderToReceive({ orders: ordersData }),
      });

      return { data, error };
    }
  );

  return { data, error };
}

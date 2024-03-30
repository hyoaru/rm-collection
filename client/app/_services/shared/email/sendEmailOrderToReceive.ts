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

      const { data, error } = await sendEmail({
        targetEmail: `${ordersData[0].users?.email}, ${ordersData[0].orders_shipping?.receiver_email}`,
        subject: "Order to receive",
        html: OrderToReceive({ orders: ordersData }),
      });

      return { data, error };
    }
  );

  return { data, error };
}

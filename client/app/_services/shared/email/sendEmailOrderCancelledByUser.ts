"use server";

import sendEmail from "@services/shared/email/sendEmail";
import OrderCancelledByUser from "@components/shared/email/OrderCancelledByUser";
import getOrdersByGroupServer from "@services/shared/getOrdersByGroupServer";

type SendEmailOrderCancelledByUserParams = {
  orderGroup: string;
};

export default async function sendEmailOrderCancelledByUser({ orderGroup }: SendEmailOrderCancelledByUserParams) {
  const { data, error } = await getOrdersByGroupServer(orderGroup).then(
    async ({ data: ordersData, error: ordersError }) => {
      if (ordersError || !ordersData) {
        return { data: ordersData, error: ordersError };
      }

      const { data, error } = await sendEmail({
        targetEmail: `${ordersData[0].users?.email}, ${ordersData[0].orders_shipping?.receiver_email}`,
        subject: "Order cancelled by user",
        html: OrderCancelledByUser({ orders: ordersData }),
      });

      return { data, error };
    }
  );

  return { data, error };
}

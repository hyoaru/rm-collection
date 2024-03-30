"use server";

import sendEmail from "@services/shared/email/sendEmail";
import OrderCancelledByManagement from "@components/shared/email/OrderCancelledByManagement";
import getOrdersByGroupServer from "@services/shared/getOrdersByGroupServer";

type SendEmailOrderCancelledByManagementParams = {
  orderGroup: string;
};

export default async function sendEmailOrderCancelledByManagement({ orderGroup }: SendEmailOrderCancelledByManagementParams) {
  const { data, error } = await getOrdersByGroupServer(orderGroup).then(
    async ({ data: ordersData, error: ordersError }) => {
      if (ordersError || !ordersData) {
        return { data: ordersData, error: ordersError };
      }

      const { data, error } = await sendEmail({
        targetEmail: `${ordersData[0].users?.email}, ${ordersData[0].orders_shipping?.receiver_email}`,
        subject: "Order cancelled by management",
        html: OrderCancelledByManagement({ orders: ordersData }),
      });

      return { data, error };
    }
  );

  return { data, error };
}

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

      const buyerEmail = ordersData[0].users?.email
      const receiverEmail = ordersData[0].orders_shipping?.receiver_email

      const { data, error } = await sendEmail({
        targetEmail: buyerEmail === receiverEmail ? `${buyerEmail}` : `${buyerEmail}, ${receiverEmail}`,
        subject: "Order cancelled by management",
        html: OrderCancelledByManagement({ orders: ordersData }),
      });

      return { data, error };
    }
  );

  return { data, error };
}

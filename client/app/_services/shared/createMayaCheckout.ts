"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// App imports
import updateOrderBillingCheckoutId from "@services/shared/updateOrderBillingCheckoutId";
import { OrderType } from "@constants/shared/types";

dayjs.extend(utc);

type CreateMayaCheckoutParams = {
  orders: OrderType[];
};

type CreateCheckoutResponse = {
  checkoutId: string;
  redirectUrl: string;
};

type CreateMayaCheckoutResponse = {
  data: CreateCheckoutResponse | null;
  error: any;
};

export default async function createMayaCheckout({ orders }: CreateMayaCheckoutParams) {
  const API_END_POINT = "checkout/v1/checkouts";
  const API_BASE_URL = process.env.NEXT_PUBLIC_MAYA_BASE_URL;
  const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_MAYA_PUBLIC_API_KEY;
  const CHECKOUT_URL = process.env.NEXT_PUBLIC_MAYA_CHECKOUT_URL;
  const CHECKOUT_END_POINT = "v2/checkout";
  const encodedAuthorization = btoa(`${PUBLIC_API_KEY}:${PUBLIC_API_KEY}`);

  const response: CreateMayaCheckoutResponse = {
    data: null,
    error: null,
  };

  const orderBillingTransaction = orders[0].orders_billing;
  const billingTransactionDateLastUpdated = orderBillingTransaction?.updated_at;
  const isMayaCheckoutSessionExpired = dayjs() > dayjs(billingTransactionDateLastUpdated).add(30, "minute").utc();
  const isCheckoutSessionCreated = orderBillingTransaction?.checkout_id ? true : false;
  
  if (orderBillingTransaction?.status === "pending" && isCheckoutSessionCreated && !isMayaCheckoutSessionExpired) {
    response.data = {
      checkoutId: orderBillingTransaction.checkout_id!,
      redirectUrl: `${CHECKOUT_URL}/${CHECKOUT_END_POINT}?id=${orderBillingTransaction.checkout_id}`,
    };

    return response;
  }

  const totalAmount = orders.reduce((accumulator, currentOrder) => accumulator + currentOrder.total_price!, 0);
  const totalDiscount = orders.reduce(
    (accumulator, currentOrder) => accumulator + currentOrder.discounted_price! * currentOrder.quantity,
    0
  );

  const requestBody = JSON.stringify({
    buyer: {
      firstName: orders[0].users?.first_name,
      lastName: orders[0].users?.last_name,
    },
    totalAmount: {
      currency: "PHP",
      value: totalAmount,
      discount: totalDiscount,
      serviceCharge: 0,
      shippingFee: 0,
      tax: 0,
      subTotal: totalAmount,
    },
    items: orders.map((order) => {
      return {
        name: order.product_variants?.products?.name,
        quantity: order.quantity,
        totalAmount: {
          value: order.total_price,
          discount: order.discount_rate * order.quantity,
          serviceCharge: 0,
          shippingFee: 0,
          tax: 0,
          subTotal: order.total_price,
        },
      };
    }),
    redirectUrl: {
      success: `${process.env.NEXT_PUBLIC_BASE_URL}/transaction/success?id=${orderBillingTransaction?.id}&checkoutId=${orderBillingTransaction?.checkout_id}`,
      failure: `${process.env.NEXT_PUBLIC_BASE_URL}/transaction/failed?id=${orderBillingTransaction?.id}&checkoutId=${orderBillingTransaction?.checkout_id}`,
      cancel: `${process.env.NEXT_PUBLIC_BASE_URL}/transaction/cancelled?id=${orderBillingTransaction?.id}&checkoutId=${orderBillingTransaction?.checkout_id}`,
    },
    requestReferenceNumber: orderBillingTransaction?.request_reference_id,
  });

  await fetch(`${API_BASE_URL}/${API_END_POINT}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Basic ${encodedAuthorization}`,
    },
    body: requestBody,
  })
    .then((res) => res.json())
    .then(async (res: CreateCheckoutResponse) => {
      const { data, error } = await updateOrderBillingCheckoutId({
        id: orders[0].order_billing_id,
        checkoutId: res.checkoutId,
      });

      if (!error) {
        response.data = res;
      } else {
        return response;
      }
    })
    .catch((error) => (response.error = error));

  return response;
}

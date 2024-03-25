"use server";

import { Tables } from "@constants/base/database-types";
import addOrderShipping from "@services/checkout/addOrderShipping";
import addOrder from "@services/checkout/addOrder";
import { OrderType } from "@constants/shared/types";
import updateProductVariantAvailability from "@services/checkout/updateProductVariantAvailability";
import deleteCartItem from "@services/checkout/deleteCartItem";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

type CartItemType = Tables<"cart"> & {
  product_variants: Tables<"product_variants"> & {
    products: Tables<"products"> | null;
  } | null;
};

type CheckoutOrderParams = {
  cartItems: CartItemType[];
  order: {
    userId: string;
    orderGroup: string;
    receiverEmail: string;
    receiverFirstName: string;
    receiverLastName: string;
    receiverPhoneNumber: string;
    shippingCountry: string;
    shippingAddress: string;
    shippingZipCode: string;
  };
};

export default async function checkoutOrder({ cartItems, order }: CheckoutOrderParams) {
  const orderList: OrderType[] = [];
  const response: { data: typeof orderList | null; error: any } = { data: null, error: null };

  const { data: orderShippingData, error: orderShippingError } = await addOrderShipping({
    userId: order.userId,
    receiverEmail: order.receiverEmail,
    receiverFirstName: order.receiverFirstName,
    receiverLastName: order.receiverLastName,
    receiverPhoneNumber: order.receiverPhoneNumber,
    shippingCountry: order.shippingCountry,
    shippingAddress: order.shippingAddress,
    shippingZipCode: order.shippingZipCode,
  });

  if (orderShippingError || !orderShippingData) {
    response.error = orderShippingError;
    return response;
  }

  for await (const cartItem of cartItems) {
    const { data, error } = await addOrder({
      userId: order.userId,
      orderShippingId: orderShippingData.id,
      productVariantId: cartItem.product_variant_id,
      quantity: cartItem.quantity,
      price: cartItem.product_variants?.price!,
      discountRate: cartItem.product_variants?.discount_rate!,
      orderGroup: order.orderGroup,
    })
      .then(async ({ data: addOrderData, error: addOrderError }) => {
        if (addOrderError || !addOrderData) {
          return { data: addOrderData, error: addOrderError };
        }

        const productVariantQuantityAfterCheckout = cartItem?.product_variants?.quantity! - cartItem.quantity;
        const productVariantVisibilityAfterCheckout = productVariantQuantityAfterCheckout > 0;

        const { error } = await updateProductVariantAvailability({
          quantity: productVariantQuantityAfterCheckout,
          isDisplayed: productVariantVisibilityAfterCheckout,
          productVariantId: cartItem?.product_variant_id,
        });

        return { data: addOrderData, error };
      })
      .then(async ({ data: addOrderData, error: updateProductVariantError }) => {
        if (updateProductVariantError || !addOrderData) {
          return { data: addOrderData, error: updateProductVariantError };
        }

        const { error } = await deleteCartItem(cartItem.id);

        return { data: addOrderData, error };
      });

    if (data) {
      orderList.push(data);
      response.data = orderList
      response.error = processErrorToCrossSideSafe(error);
    }
  }

  return response;
}

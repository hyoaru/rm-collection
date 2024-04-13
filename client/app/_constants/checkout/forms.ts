import * as z from "zod"

// App imports
import { ORDERS_SHIPPING_BASE_FORM_SCHEMA } from "@constants/base/forms"

export const ADD_ORDER_FORM_SCHEMA = z.object({
  shippingAddress: ORDERS_SHIPPING_BASE_FORM_SCHEMA.shippingAddress,
  receiverEmail: ORDERS_SHIPPING_BASE_FORM_SCHEMA.receiverEmail,
  receiverFirstName: ORDERS_SHIPPING_BASE_FORM_SCHEMA.receiverFirstName,
  receiverLastName: ORDERS_SHIPPING_BASE_FORM_SCHEMA.receiverLastName,
  shippingZipCode: ORDERS_SHIPPING_BASE_FORM_SCHEMA.shippingZipCode,
  receiverPhoneNumber: ORDERS_SHIPPING_BASE_FORM_SCHEMA.receiverPhoneNumber
})
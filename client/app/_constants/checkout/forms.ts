import * as z from "zod"

// App imports
import { ORDERS_BASE_FORM_SCHEMA } from "@constants/base/forms"

export const ADD_ORDER_FORM_SCHEMA = z.object({
  shippingAddress: ORDERS_BASE_FORM_SCHEMA.shippingAddress,
  receiverEmail: ORDERS_BASE_FORM_SCHEMA.receiverEmail,
  receiverFirstName: ORDERS_BASE_FORM_SCHEMA.receiverFirstName,
  receiverLastName: ORDERS_BASE_FORM_SCHEMA.receiverLastName,
  shippingZipCode: ORDERS_BASE_FORM_SCHEMA.shippingZipCode,
  receiverPhoneNumber: ORDERS_BASE_FORM_SCHEMA.receiverPhoneNumber
})
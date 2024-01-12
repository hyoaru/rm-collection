import * as z from "zod"

// App imports
import { ORDERS_BASE_FORM_SCHEMA } from "@constants/shared/forms"

export const ADD_ORDER_FORM_SCHEMA = z.object({
  firstName: ORDERS_BASE_FORM_SCHEMA.firstName,
  lastName: ORDERS_BASE_FORM_SCHEMA.lastName,
  email: ORDERS_BASE_FORM_SCHEMA.email,
  shippingAddress: ORDERS_BASE_FORM_SCHEMA.shippingAddress,
})
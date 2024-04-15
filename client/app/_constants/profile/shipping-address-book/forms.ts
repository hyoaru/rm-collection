import * as z from "zod"

// App imports
import { SHIPPING_ADDRESS_BOOK_BASE_FORM_SCHEMA } from "@constants/base/forms"

export const ADD_SHIPPING_ADDRESS_FORM_SCHEMA = z.object({
  shippingAddress: SHIPPING_ADDRESS_BOOK_BASE_FORM_SCHEMA.shippingAddress,
  receiverEmail: SHIPPING_ADDRESS_BOOK_BASE_FORM_SCHEMA.receiverEmail,
  receiverFirstName: SHIPPING_ADDRESS_BOOK_BASE_FORM_SCHEMA.receiverFirstName,
  receiverLastName: SHIPPING_ADDRESS_BOOK_BASE_FORM_SCHEMA.receiverLastName,
  shippingZipCode: SHIPPING_ADDRESS_BOOK_BASE_FORM_SCHEMA.shippingZipCode,
  receiverPhoneNumber: SHIPPING_ADDRESS_BOOK_BASE_FORM_SCHEMA.receiverPhoneNumber
})
import * as z from "zod"
import { isValidPhoneNumber } from "react-phone-number-input";

export const MAX_FILE_SIZE_IN_MB = 5 * 1000000

export const PRODUCTS_BASE_FORM_SCHEMA = {
  name: z.string().trim().min(4).max(70),
  category: z.string().refine((value) => value?.length !== 0, `Category is required`),
  description: z.string().trim().min(10).max(800),
  thumbnail: z.any()
    .refine((files) => files?.length !== 0, `Thumbnail is required`)
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE_IN_MB, `Max image size is 5MB.`),
}

export const PRODUCT_VARIANTS_BASE_FORM_SCHEMA = {
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  discountRate: z.coerce.number().min(0).max(100),
  material: z.string().trim().min(4).max(50),
  materialProperty: z.string().trim().min(2).max(50),
  size: z.string().trim().optional().nullable().default(null).transform(val => val == '' ? null : val),
  weight: z.string().trim().optional().nullable().default(null).transform(val => val == '' ? null : val),
  images: z.any()
    .refine((files) => Array.from(files)?.length !== 0, `Images is required`)
    .refine((files) => Array.from(files)?.length <= 4, `You can only select up to 4 images`)
    .refine((files) => Array.from(files)?.every((file: any) => file?.size <= MAX_FILE_SIZE_IN_MB), `Max image size is 5MB`),
}

export const USERS_BASE_FORM_SCHEMA = {
  email: z.string().trim().toLowerCase().email().min(8),
  password: z.string().trim().min(8).max(40),
  confirmPassword: z.string().trim().min(8).max(40),
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
}

export const ORDERS_SHIPPING_BASE_FORM_SCHEMA = {
  receiverEmail: z.string().trim().toLowerCase().email().min(8),
  receiverFirstName: z.string().trim().min(2).max(100),
  receiverLastName: z.string().trim().min(2).max(100),
  receiverPhoneNumber: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  shippingAddress: z.string().trim().min(10).max(400),
  shippingZipCode: z.string().trim().min(2).max(50),
  shippingCourier: z.string().trim().min(2),
  shippingTrackingId: z.string().trim().min(4),
  shippingFee: z.coerce.number(),
}

export const SHIPPING_ADDRESS_BOOK_BASE_FORM_SCHEMA = {
  receiverEmail: z.string().trim().toLowerCase().email().min(8),
  receiverFirstName: z.string().trim().min(2).max(100),
  receiverLastName: z.string().trim().min(2).max(100),
  receiverPhoneNumber: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  shippingAddress: z.string().trim().min(10).max(400),
  shippingZipCode: z.string().trim().min(2).max(50),
}
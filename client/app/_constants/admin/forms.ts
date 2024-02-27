import * as z from "zod"

// App imports
import { 
  PRODUCTS_BASE_FORM_SCHEMA, 
  PRODUCT_VARIANTS_BASE_FORM_SCHEMA, 
  USERS_BASE_FORM_SCHEMA, 
  MAX_FILE_SIZE_IN_MB 
} from "@constants/base/forms"

export const ADD_PRODUCT_FORM_SCHEMA = z.object({
  name: PRODUCTS_BASE_FORM_SCHEMA.name,
  category: PRODUCTS_BASE_FORM_SCHEMA.category,
  description: PRODUCTS_BASE_FORM_SCHEMA.description,
  quantity: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.quantity,
  price: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.price,
  discountRate: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.discountRate,
  material: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.material,
  materialProperty: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.materialProperty,
  size: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.size,
  weight: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.weight,
  thumbnail: PRODUCTS_BASE_FORM_SCHEMA.thumbnail,
  images: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.images,
})

export const ADD_PRODUCT_VARIANT_FORM_SCHEMA = z.object({
  name: PRODUCTS_BASE_FORM_SCHEMA.name,
  category: PRODUCTS_BASE_FORM_SCHEMA.category,
  description: PRODUCTS_BASE_FORM_SCHEMA.description,
  quantity: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.quantity,
  price: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.price,
  discountRate: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.discountRate,
  material: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.material,
  materialProperty: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.materialProperty,
  size: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.size,
  weight: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.weight,
  images: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.images,
})

export const EDIT_PRODUCT_FORM_SCHEMA = z.object({
  name: PRODUCTS_BASE_FORM_SCHEMA.name,
  category: PRODUCTS_BASE_FORM_SCHEMA.category,
  description: PRODUCTS_BASE_FORM_SCHEMA.description,
  thumbnail: z.any()
    .refine((files) => {
      if (files.length === 0) { return true }
      return files[0]?.size <= MAX_FILE_SIZE_IN_MB
    }, `Max image size is 5MB.`),
})

export const EDIT_PRODUCT_VARIANT_FORM_SCHEMA = z.object({
  name: PRODUCTS_BASE_FORM_SCHEMA.name,
  category: PRODUCTS_BASE_FORM_SCHEMA.category,
  description: PRODUCTS_BASE_FORM_SCHEMA.description,
  quantity: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.quantity,
  price: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.price,
  discountRate: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.discountRate,
  material: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.material,
  materialProperty: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.materialProperty,
  size: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.size,
  weight: PRODUCT_VARIANTS_BASE_FORM_SCHEMA.weight,
  images: z.any()
    .refine((files) => {
      if (files.length === 0) { return true }
      return Array.from(files)?.length <= 4
    }, `You can only select up to 4 images`)
    .refine((files) => {
      if (files.length === 0) { return true }
      return files[0]?.size <= MAX_FILE_SIZE_IN_MB
    }, `Max image size is 5MB.`),
})

export const ADD_SUB_ADMIN_FORM_SCHEMA = z.object({
  id: z.string(),
  email: USERS_BASE_FORM_SCHEMA.email,
  firstName: USERS_BASE_FORM_SCHEMA.firstName,
  lastName: USERS_BASE_FORM_SCHEMA.lastName,
  role: z.string(),
})
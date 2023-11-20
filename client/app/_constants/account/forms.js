import * as z from "zod"

// App imports
import { USERS_BASE_FORM_SCHEMA } from "@constants/shared/forms"

export const ACCOUNT_INFORMATION_FORM = z.object({
  id: z.string(),
  firstName: USERS_BASE_FORM_SCHEMA.firstName,
  lastName: USERS_BASE_FORM_SCHEMA.lastName,
  email: USERS_BASE_FORM_SCHEMA.email,
})

export const ACCOUNT_UPDATE_INFORMATION_FORM = z.object({
  id: z.string(),
  firstName: USERS_BASE_FORM_SCHEMA.firstName,
  lastName: USERS_BASE_FORM_SCHEMA.lastName,
  email: USERS_BASE_FORM_SCHEMA.email
})
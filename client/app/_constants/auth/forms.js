import * as z from "zod"

// App imports
import { USERS_BASE_FORM_SCHEMA } from "@constants/shared/forms"

export const SIGN_UP_FORM_SCHEMA = z.object({
  email: USERS_BASE_FORM_SCHEMA.email,
  password: USERS_BASE_FORM_SCHEMA.password,
  confirmPassword: USERS_BASE_FORM_SCHEMA.confirmPassword,
  firstName: USERS_BASE_FORM_SCHEMA.firstName,
  lastName: USERS_BASE_FORM_SCHEMA.lastName,

}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ['confirmPassword']
    })
  }
})

export const SIGN_IN_FORM_SCHEMA = z.object({
  email: USERS_BASE_FORM_SCHEMA.email,
  password: USERS_BASE_FORM_SCHEMA.password,
})
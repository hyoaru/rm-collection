import * as z from "zod"

// App imports
import { USERS_BASE_FORM_SCHEMA } from "@constants/base/forms"

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
  email: USERS_BASE_FORM_SCHEMA.email,
  password: z.string().optional()
})

export const UPDATE_PASSWORD_FORM = z.object({
  password: USERS_BASE_FORM_SCHEMA.password,
  confirmPassword: USERS_BASE_FORM_SCHEMA.confirmPassword
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ['confirmPassword']
    })
  }
})

export const UPDATE_EMAIL_FORM = z.object({
  oldEmail: USERS_BASE_FORM_SCHEMA.email,
  newEmail: USERS_BASE_FORM_SCHEMA.email
})
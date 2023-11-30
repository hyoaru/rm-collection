"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { useToast } from '@components/ui/use-toast'
import revalidateAllData from '@services/shared/revalidateAllData'
import { UPDATE_PASSWORD_FORM as formSchema } from '@constants/account/forms'
import useUpdatePassword from '@hooks/account/useUpdatePassword'
import { useRouter } from 'next/navigation'

export default function AccountUpdatePasswordForm(props) {
  const { toast } = useToast()
  const { updatePassword, isLoading } = useUpdatePassword()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  })

  async function onSubmit(data) {
    await updatePassword({
      newPassword: data.password
    })
      .then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          toast({
            title: "Your password has been updated.",
            description: "Changes will take effect shortly."
          })

          router.push('/account')
        }
      })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 gap-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={'col-span-12'}>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="your-very-secure-password" {...field} type={'password'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className={'col-span-12'}>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder="your-very-secure-password" {...field} type={'password'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mt-8 flex mx-auto w-full lg:w-1/2">Save changes</Button>
        </form>
      </Form>
    </>
  )
}

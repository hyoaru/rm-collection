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
import { UPDATE_EMAIL_FORM as formSchema } from '@/app/_constants/profile/account/forms'
import useUpdateEmail from '@/app/_hooks/profile/account/useUpdateEmail'
import { useRouter } from 'next/navigation'

export default function AccountUpdatePasswordForm(props) {
  const { userStateGeneral } = props
  const { toast } = useToast()
  const { updateEmail, isLoading } = useUpdateEmail()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldEmail: userStateGeneral.email,
      newEmail: '',
    }
  })

  async function onSubmit(data) {
    await updateEmail({
      newEmail: data.newEmail
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
            title: "Confirmation email has been sent to old and new email.",
            description: "Please check your email inbox."
          })
          
          await revalidateAllData()
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
              name="oldEmail"
              render={({ field }) => (
                <FormItem className={'col-span-12'}>
                  <FormLabel>Old email</FormLabel>
                  <FormControl>
                    <Input placeholder="your-old-email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem className={'col-span-12'}>
                  <FormLabel>New email</FormLabel>
                  <FormControl>
                    <Input placeholder="your-new-email" {...field} />
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

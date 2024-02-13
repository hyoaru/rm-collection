"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import Link from 'next/link';

// App imports
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form"
import { useToast } from '@components/ui/use-toast';
import { FORGOT_PASSWORD_FORM_SCHEMA as formSchema } from '@constants/auth/forms';
import useSendPasswordResetRequest from '@hooks/profile/account/useSendPasswordResetRequest';

export default function ForgotPasswordForm() {
  const { sendPasswordResetRequest, isLoading } = useSendPasswordResetRequest()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  })

  async function onSubmit(data) {
    await sendPasswordResetRequest({ email: data.email })
    .then(async ({ data, error }) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error has occured.",
          description: "Please try again later."
        })
      } else {
        toast({
          title: "Password reset request has been sent to your email.",
          description: "Please check your email inbox."
        })
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={'your-email@email.com'} {...field} />
                </FormControl>
                <FormMessage className={'text-center text-xs'} />
              </FormItem>
            )}
          />

          <Button className={'w-full'} type={'submit'} disabled={isLoading}>Reset password</Button>

          <div className="flex justify-center">
            <Button variant={'ghost'} size={'sm'} type="button" className="w-full">
              <Link href={'/auth/sign-in'} className='text-muted-foreground w-full'>
                {"Already have an account? Sign in"}
              </Link>
            </Button>
          </div>

        </form>
      </Form>
    </>
  )
}

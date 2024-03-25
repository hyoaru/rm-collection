"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import * as z from "zod";

// App imports
import { Separator } from '@components/ui/separator';
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { useUserSignUp } from '@hooks/authentication/useUserSignUp';
import { useToast } from '@components/ui/use-toast';
import { SIGN_UP_FORM_SCHEMA as formSchema } from '@constants/auth/forms';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form"

export default function SignUpForm() {
  const { toast } = useToast()
  const { userSignUp, isLoading } = useUserSignUp()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await userSignUp({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    })
      .then(({ data, error }) => {
        if (!error) {
          toast({
            title: "Confirmation email has been sent!",
            description: "Please confirm account creation."
          })

          form.reset()
        } else {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
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
            name={'firstName'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={'your-first-name'} {...field} />
                </FormControl>
                <FormMessage className={'text-center text-xs'} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'lastName'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={'your-last-name'} {...field} />
                </FormControl>
                <FormMessage className={'text-center text-xs'} />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={'youremail@email.com'} {...field} />
                </FormControl>
                <FormMessage className={'text-center text-xs'} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'password'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder={'your-very-secure-password'} {...field} />
                </FormControl>
                <FormMessage className={'text-center text-xs'} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'confirmPassword'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder={'confirm-password'} {...field} />
                </FormControl>
                <FormMessage className={'text-center text-xs'} />
              </FormItem>
            )}
          />

          <Button className={'w-full'} type={'submit'} disabled={isLoading}>Create account</Button>
          <div className="flex justify-center">
            <small className='text-center'>
              {'By clicking sign up, you agree to our '}
              <Link href={'/terms-of-service'} className='underline underline-offset-2'>Terms of service</Link>
              {' and '}
              <Link href={'/privacy-policy'} className='underline underline-offset-2'>Privacy policy</Link>
            </small>
          </div>

          <Separator />

          <div className="flex justify-center">
            <Button variant={'ghost'} size={'sm'} className="w-full" type="button">
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
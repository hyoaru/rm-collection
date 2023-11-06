"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Link from 'next/link';

// App imports
import { Separator } from '@components/ui/separator';
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { useUserSignUp } from '@hooks/authentication/useUserSignUp';
import { useToast } from '@components/ui/use-toast';


export default function SignUpForm() {
  const { toast } = useToast()
  const { userSignUp, isLoading } = useUserSignUp()

  const formSchema = z.object({
    email: z.string().trim().toLowerCase().email().min(8),
    password: z.string().trim().min(8).max(40),
    confirmPassword: z.string().trim().min(8).max(40)
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ['confirmPassword']
      })
    }
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  async function onSubmit(data) {
    await userSignUp({ email: data.email, password: data.password })
      .then(({ data, error }) => {
        if (!error) {
          toast({
            title: "Confirmation email has been sent!",
            description: "Please confirm account creation."
          })
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
                  <Input type="password" placeholder={'confirm password'} {...field} />
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
            <Button variant={'ghost'} size={'sm'} className="w-full">
              <Link href={'/auth/sign-in'} className='flex items-center text-muted-foreground'>
                {"Already have an account? Sign in"}
              </Link>
            </Button>
          </div>

        </form>
      </Form>
    </>
  )
}

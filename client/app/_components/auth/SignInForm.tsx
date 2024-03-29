"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Link from 'next/link';

// App imports
import { Separator } from "@components/ui/separator"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form"
import { useUserSignIn } from '@hooks/authentication/useUserSignIn';
import { useToast } from '@components/ui/use-toast';
import { SIGN_IN_FORM_SCHEMA as formSchema } from '@constants/auth/forms';

export default function SignInForm() {
  const { userSignIn, isLoading } = useUserSignIn()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""  
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await userSignIn({ email: data.email, password: data.password })
      .then(({ data, error }) => {
        if (!error) {
          toast({
            title: "Logged in successfully",
            description: "Redirecting to homepage"
          })
          form.reset()
          window.location.href = "/"
        } else {
          if (error.status === 400) {
            toast({
              variant: "destructive",
              title: "Wrong credentials",
              description: "Please check your email and password"
            })
          } else {
            toast({
              variant: "destructive",
              title: "An error has occured.",
              description: "Please try again later."
            })
          }
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

          <Button className={'w-full'} type={'submit'} disabled={isLoading}>Sign in</Button>

          <div className="flex justify-center">
            <small className='text-center'>
              {'By clicking sign in, you agree to our '}
              <Link href={'/terms-of-service'} className='underline underline-offset-2'>Terms of service</Link>
              {' and '}
              <Link href={'/privacy-policy'} className='underline underline-offset-2'>Privacy policy</Link>
              {'  ・  '}
              <Link href={'/auth/forgot-password'} className='underline underline-offset-2 text-muted-foreground'>Forgot password?</Link>
            </small>
          </div>

          <Separator />

          <div className="flex justify-center">
            <Button variant={'ghost'} size={'sm'} type="button" className="w-full">
              <Link href={'/auth/sign-up'} className='text-muted-foreground w-full'>
                {"Don't have an account yet? Sign up"}
              </Link>
            </Button>
          </div>

        </form>
      </Form>
    </>
  )
}
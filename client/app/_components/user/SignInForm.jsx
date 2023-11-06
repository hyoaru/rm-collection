"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// App imports
import { Separator } from "@components/ui/separator"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { useUserMagicLinkSignIn } from '@hooks/authentication/useUserMagicLinkSignIn';
import { useToast } from '@components/ui/use-toast';

export default function SignInForm() {
  const { userMagicLinkSignIn, isLoading } = useUserMagicLinkSignIn()
  const { toast } = useToast()

  const formSchema = z.object({
    email: z.string().trim().toLowerCase().email().min(8)
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  })

  async function onSubmit(data) {
    await userMagicLinkSignIn({ email: data.email })
      .then(({ data, error }) => {
        if (!error) {
          toast({
            title: "Sign in link has been sent.",
            description: "Please check your email for the link."
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

          <Button className={'w-full'} type={'submit'} disabled={isLoading}>Sign in with email</Button>

          <div className="flex justify-center">
            <small className='text-center'>
              {'By clicking sign in, you agree to our '}
              <Link href={'/terms-of-service'} className='underline underline-offset-2'>Terms of service</Link>
              {' and '}
              <Link href={'/privacy-policy'} className='underline underline-offset-2'>Privacy policy</Link>
            </small>
          </div>
        </form>
      </Form>
    </>
  )
}

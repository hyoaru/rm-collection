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

export default function SignUpForm() {
  const formSchema = z.object({
    email: z.string().trim().email().min(8)
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  })

  function onSubmit(data) {
    console.log(data)
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
          <Button className={'w-full'} type={'submit'}>Sign up with email</Button>
          <div className="flex justify-center">
            <small className=''>
              {'By clicking sign up, you agree to our '}
              <Link href={'/terms-of-service'} className='underline underline-offset-2'>Terms of service</Link>
              {' and '}
              <Link href={'/privacy-policy'} className='underline underline-offset-2'>Privacy policy</Link>
            </small>
          </div>

          <Separator />

          <div className="flex justify-center">
            <Button variant={'ghost'} size={'sm'}>
              <Link href={'/user/sign-up'} className='flex items-center text-muted-foreground'>
                {"Sign in with email"}
              </Link>
            </Button>
          </div>

        </form>
      </Form>
    </>
  )
}

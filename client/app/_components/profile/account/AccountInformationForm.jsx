"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { ACCOUNT_INFORMATION_FORM as formSchema } from '@constants/profile/account/forms'
import { ACCOUNT_BASE_PATH as accountBasePath } from '@constants/profile/base'

export default function AccountInformationForm(props) {
  const { userStateGeneral } = props

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: userStateGeneral.id,
      email: userStateGeneral.email,
      firstName: userStateGeneral.first_name,
      lastName: userStateGeneral.last_name,
    }
  })

  return (
    <>
      <Form {...form}>
        <form>
          <div className="grid grid-cols-12 gap-4 gap-y-2">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className={'col-span-6'}>
                  <FormLabel>User Id</FormLabel>
                  <FormControl>
                    <Input placeholder="your-user-id" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={'col-span-6'}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your-email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={'col-span-6'}>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-first-name" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className={'col-span-6'}>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-last-name" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
                
      <Button variant={'ghost'} className={'w-full mt-6 '}>
        <Link href={`/${accountBasePath}/update-information`} className='hidden sm:block w-full text-muted-foreground'>
            Change some of your personal details? Update information
        </Link>

        <Link href={`/${accountBasePath}/update-information`} className='block sm:hidden w-full text-muted-foreground'>
            Update information
        </Link>
      </Button>
    </>
  )
}

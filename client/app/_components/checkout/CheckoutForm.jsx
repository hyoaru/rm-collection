"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

// App imports
import { Input } from '@components/ui/input'
import { useToast } from '@components/ui/use-toast'
import { ScrollArea } from '@components/ui/scroll-area'
import { Textarea } from '@components/ui/textarea'
import CartItem from '@components/base/CartItem'
import { Button } from '@components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { ADD_ORDER_FORM_SCHEMA as formSchema } from '@constants/checkout/forms'
import useCheckoutOrder from '@hooks/checkout/useCheckoutOrder'
import revalidateAllData from '@services/shared/revalidateAllData'

export default function CheckoutForm(props) {
  const { userState, cart } = props
  const { checkoutOrder, isLoading } = useCheckoutOrder()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userState?.userStateGeneral?.email,
      firstName: userState?.userStateGeneral?.first_name,
      lastName: userState?.userStateGeneral?.last_name,
      shippingAddress: '',
    }
  })

  const { formState: { errors } } = form

  async function onSubmit(data) {
    if (!cart?.data?.[0]) {
      toast({
        variant: 'destructive',
        title: "Cart cannot be empty.",
        description: "Add products to checkout first."
      })

      return
    }

    await checkoutOrder({
      userId: userState?.userStateAuth.id,
      cartItems: cart?.data,
      shippingAddress: data.shippingAddress
    })
      .then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          await revalidateAllData()
          toast({
            title: "Success",
            description: "Your item is now ready to be showcased."
          })
        }
      })

  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 w-10/12 mx-auto gap-10">
            <div className="col-span-6">
              <p className='font-bold mb-2'>Information about you</p>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel className={'text-muted-foreground'}>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your-email-address" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={'text-muted-foreground'}>First name</FormLabel>
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
                    <FormItem >
                      <FormLabel className={'text-muted-foreground'}>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="your-last-name" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel>Shipping address</FormLabel>
                      <FormControl>
                        <Textarea rows="6" placeholder="your-full-shipping-address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <p className='font-bold mb-2'>Your cart</p>
              <ScrollArea className={'h-[20rem] border rounded-lg p-2 border-x-0'}>
                {cart?.data?.[0] && cart?.data.map((cartItem) => (
                  <CartItem
                    key={`CartItem-${cartItem.id}`}
                    cartItem={cartItem}
                    product={cartItem.product_variants.products}
                    productVariant={cartItem.product_variants}
                    quantity={cartItem.quantity}
                    userState={userState}
                  />
                ))}
              </ScrollArea>
              <div className="flex mt-2">
                <p className='text-sm font-medium'>Total: ₱ {cart?.totalCost.toLocaleString()}</p>
                <Link href={'/'} className='ms-auto text-sm underline font-medium'>
                  Add more items
                </Link>
              </div>
            </div>
            <div className="col-span-12 flex justify-center">
              <Button type={'submit'} size={'lg'} className={'w-3/12'}>Checkout</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

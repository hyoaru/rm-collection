"use client"

import React, { useState } from 'react'
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
import { Label } from '@components/ui/label'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Dialog, DialogContent, DialogFooter, DialogClose, DialogHeader, DialogTitle } from "@components/ui/dialog"
import { ADD_ORDER_FORM_SCHEMA as formSchema } from '@constants/checkout/forms'
import useCheckoutOrder from '@hooks/checkout/useCheckoutOrder'
import revalidateAllData from '@services/shared/revalidateAllData'
import MultipleOrderReceiptDialogContent from '@components/shared/MultipleOrderReceiptDialogContent'
import CountriesCombobox from '@components/shared/CountriesCombobox'

export default function CheckoutForm(props) {
  const { userState, cart } = props
  const { checkoutOrder, isLoading } = useCheckoutOrder()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [orders, setOrders] = useState(null)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingAddress: '',
      receiverEmail: '',
      receiverFirstName: '',
      receiverLastName: '',
      shippingZipCode: '',
      receiverPhoneNumber: ''
    }
  })

  const { formState: { errors } } = form

  async function validateInputs(data) {
    if (!cart?.data?.[0]) {
      toast({
        variant: 'destructive',
        title: "Cart cannot be empty.",
        description: "Add products to checkout first."
      })

      return
    } else {
      await revalidateAllData()
      openConfirmationModal()
    }

  }

  function closeConfirmationModal() {
    setIsModalOpen(false)
  }

  function openConfirmationModal() {
    setIsModalOpen(true)
  }

  function openReceiptModal() {
    setIsReceiptModalOpen(true)
  }

  async function onSubmit() {
    const data = form.getValues()

    await checkoutOrder({
      userId: userState?.userStateAuth.id,
      cartItems: cart?.data,
      shippingAddress: data.shippingAddress,
      receiverEmail: data.receiverEmail,
      receiverFirstName: data.receiverFirstName,
      receiverLastName: data.receiverLastName,
      shippingCountry: selectedCountry.name,
      shippingZipCode: data.shippingZipCode,
      receiverPhoneNumber: data.receiverPhoneNumber
    })
      .then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })

          closeConfirmationModal()
        } else {
          setOrders(data)
          form.reset()
          closeConfirmationModal()
          await revalidateAllData()

          openReceiptModal()
        }
      })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(validateInputs)}>
          <div className="grid grid-cols-12 gap-y-10 mx-auto w-11/12 md:w-10/12 md:gap-10">
            <div className="col-span-12 md:col-span-6 space-y-6">
              <div className="">
                <p className='font-bold mb-2'>Shipping information</p>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="receiverEmail"
                    render={({ field }) => (
                      <FormItem className={'col-span-full'}>
                        <FormLabel>Receiver email</FormLabel>
                        <FormControl>
                          <Input placeholder="receiver@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="receiverFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receiver first name</FormLabel>
                        <FormControl>
                          <Input placeholder="receiver-first-name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="receiverLastName"
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Receiver last name</FormLabel>
                        <FormControl>
                          <Input placeholder="receiver-last-name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-full space-y-2">
                    <Label>Shipping country</Label>
                    <CountriesCombobox
                      setSelectedItem={setSelectedCountry}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shippingAddress"
                    render={({ field }) => (
                      <FormItem className={'col-span-2'}>
                        <FormLabel>Shipping address</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows="2"
                            placeholder="full-shipping-address"
                            disabled={!selectedCountry}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingZipCode"
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Shipping zip code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="shipping-zip-code"
                            disabled={!selectedCountry}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="receiverPhoneNumber"
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Receiver phone number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="receiver-phone-number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
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
              <Button
                type={'submit'}
                size={'lg'}
                className={'w-full md:w-3/12'}
              >
                Checkout
              </Button>
            </div>

            <Dialog className='w-full' open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className='rounded-tl-xl rounded-br-xl'>
                <DialogHeader>
                  <DialogTitle>Confirm your order</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
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
                          isReadOnly
                        />
                      ))}
                    </ScrollArea>
                    <div className="flex mt-2">
                      <p className='text-sm font-medium'>Total: ₱ {cart?.totalCost.toLocaleString()}</p>
                    </div>
                  </div>

                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type={'submit'}
                      size={'lg'}
                      className={'w-full mt-4'}
                      onClick={onSubmit}
                      disabled={isLoading}
                    >
                      Confirm
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </Form>

      {orders && <>
        <Dialog open={isReceiptModalOpen} onOpenChange={setIsReceiptModalOpen}>
          <MultipleOrderReceiptDialogContent orders={orders} />
        </Dialog>
      </>}

    </>
  )
}

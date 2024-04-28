"use client";

import React, { useState, useCallback } from "react";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as z from "zod";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

// App imports
import { Dialog, DialogContent, DialogFooter, DialogClose, DialogHeader, DialogTitle } from "@components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import MultipleOrderReceiptDialogContent from "@components/shared/MultipleOrderReceiptDialogContent";
import ShippingAddressBookCombobox from "@components/shared/ShippingAddressBookCombobox";
import { ADD_ORDER_FORM_SCHEMA as formSchema } from "@constants/checkout/forms";
import CountriesCombobox from "@components/shared/CountriesCombobox";
import { useCheckoutOrder } from "@hooks/checkout/useCheckoutOrder";
import { PhoneInput } from "@components/shared/PhoneInput";
import { CartItemType } from "@constants/collection/types";
import { ScrollArea } from "@components/ui/scroll-area";
import { Tables } from "@constants/base/database-types";
import { queryCart, queryOrdersByGroup } from "@constants/shared/queries";
import { OrderType } from "@constants/shared/types";
import { useToast } from "@components/ui/use-toast";
import { CountryType } from "@constants/base/types";
import { Textarea } from "@components/ui/textarea";
import CartItem from "@components/shared/CartItem";
import countryList from "@/public/countries.json";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

type CheckoutFormProps = {
  authenticatedUser: Tables<"users">;
};

export default function CheckoutForm({ authenticatedUser }: CheckoutFormProps) {
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<Tables<"shipping_address_book"> | null>();
  const [shipingAddressBookComboboxValue, setShipingAddressBookComboboxValue] = useState<string | null>();
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>();
  const [isFormInputsDisabled, setIsFormInputsDisabled] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [orderGroupId, setOrderGroupId] = useState<string | null>()
  const {data: orders} = useQuery(queryOrdersByGroup({
    orderGroup: orderGroupId ?? '-',
    isEnabled: orderGroupId ? true : false
  }))

  const { data: cart, isLoading } = useQuery(queryCart());
  const checkoutOrderMutation = useCheckoutOrder();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingAddress: "",
      receiverEmail: "",
      receiverFirstName: "",
      receiverLastName: "",
      shippingZipCode: "",
      receiverPhoneNumber: "",
    },
  });

  const validateInputs = useCallback(
    (data: z.infer<typeof formSchema>) => {
      if (!cart?.data?.[0]) {
        toast({
          variant: "destructive",
          title: "Cart cannot be empty.",
          description: "Add products to checkout first.",
        });

        return;
      } else {
        setIsModalOpen(true);
      }
    },
    [cart, toast]
  );

  const emptyFormFields = useCallback(() => {
    form.reset({
      receiverEmail: "",
      receiverFirstName: "",
      receiverLastName: "",
      receiverPhoneNumber: "",
      shippingAddress: "",
      shippingZipCode: "",
    });
    setShipingAddressBookComboboxValue(null);
    setSelectedShippingAddress(null);
    setSelectedCountry(null);
  }, [form]);

  const onSelectedShippingAddressChange = useCallback(
    (shippingAddress: Tables<"shipping_address_book"> | null) => {
      setSelectedShippingAddress(shippingAddress);
      setSelectedCountry(
        countryList.find((country) => {
          return country.name.toLowerCase() === shippingAddress?.shipping_country.toLowerCase();
        })
      );

      if (shippingAddress) {
        form.reset({
          receiverEmail: shippingAddress.receiver_email,
          receiverFirstName: shippingAddress.receiver_first_name,
          receiverLastName: shippingAddress.receiver_last_name,
          receiverPhoneNumber: shippingAddress.receiver_phone_number,
          shippingAddress: shippingAddress.shipping_address,
          shippingZipCode: shippingAddress.shipping_zip_code,
        });
        setIsFormInputsDisabled(true);
      } else {
        emptyFormFields();
        setIsFormInputsDisabled(false);
      }
    },
    [form, emptyFormFields]
  );

  async function onSubmit() {
    const data = form.getValues();
    const orderGroup = uuidv4();

    toast({
      title: "Opening transaction receipt.",
      description: "This will take a second or two.",
    });

    await checkoutOrderMutation
      .mutateAsync({
        cartItems: cart?.data ?? [],
        order: {
          userId: authenticatedUser.id,
          shippingAddress: data.shippingAddress,
          receiverEmail: data.receiverEmail,
          receiverFirstName: data.receiverFirstName,
          receiverLastName: data.receiverLastName,
          shippingCountry: selectedCountry?.name!,
          shippingZipCode: data.shippingZipCode,
          receiverPhoneNumber: data.receiverPhoneNumber,
          orderGroup: orderGroup,
        },
      })
      .then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later.",
          });

          setIsModalOpen(false);
        } else {
          setOrderGroupId(data?.[0].order_group);
          emptyFormFields();
          setIsModalOpen(false);
          setIsReceiptModalOpen(true);
        }
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(validateInputs)}>
          <div className="grid grid-cols-12 gap-y-10 mx-auto md:gap-10 xl:w-11/12 ">
            <div className="col-span-12 md:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="font-bold mb-2">Shipping information</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-full my-2">
                    <ShippingAddressBookCombobox
                      userId={authenticatedUser.id}
                      value={shipingAddressBookComboboxValue}
                      setValue={setShipingAddressBookComboboxValue}
                      onSelectedValueChange={onSelectedShippingAddressChange}
                    />
                    <div className="mt-2 flex items-center gap-2 opacity-50">
                      <Info size={18} />
                      <p className="text-xs">Select shipping address or manually enter shipping information</p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="receiverEmail"
                    render={({ field }) => (
                      <FormItem className={"col-span-full"}>
                        <FormLabel>Receiver email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="receiver@email.com" disabled={isFormInputsDisabled} />
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
                          <Input {...field} placeholder="receiver-first-name" disabled={isFormInputsDisabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="receiverLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receiver last name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="receiver-last-name" disabled={isFormInputsDisabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-full space-y-2">
                    <Label>Shipping country</Label>
                    <CountriesCombobox
                      key={`CountriesCombobox-SelectedShippingAddressCountry-${selectedShippingAddress?.shipping_country}`}
                      defaultValue={selectedShippingAddress?.shipping_country}
                      setSelectedCountry={setSelectedCountry}
                      isDisabled={isFormInputsDisabled}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shippingAddress"
                    render={({ field }) => (
                      <FormItem className={"col-span-2"}>
                        <FormLabel>Shipping address</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={2}
                            placeholder="full-shipping-address"
                            disabled={!selectedCountry || isFormInputsDisabled}
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
                      <FormItem className="col-span-full">
                        <FormLabel>Shipping zip code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="shipping-zip-code"
                            disabled={!selectedCountry || isFormInputsDisabled}
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
                      <FormItem className="col-span-full">
                        <FormLabel>Receiver phone number</FormLabel>
                        <FormControl>
                          <PhoneInput {...field} placeholder="receiver-phone-number" disabled={isFormInputsDisabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="font-bold mb-2">Your cart</p>
              <ScrollArea className={"h-[33rem] border rounded-lg p-2 border-x-0"}>
                {cart?.data?.[0] &&
                  cart?.data.map((cartItem) => (
                    <CartItem key={`CartItem-${cartItem.id}`} cartItem={cartItem as CartItemType} />
                  ))}
              </ScrollArea>
              <div className="flex mt-2">
                <p className="text-sm font-medium">Total: ₱ {(cart?.totalCost ?? 0).toLocaleString()}</p>
                <Link href={"/collection"} className="ms-auto text-sm underline font-medium">
                  Add more items
                </Link>
              </div>
            </div>

            <div className="col-span-12 flex justify-center">
              <Button
                type={"submit"}
                size={"lg"}
                className={"w-full md:w-3/12"}
                disabled={isLoading || isModalOpen || isReceiptModalOpen}
              >
                Checkout
              </Button>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="rounded-tl-xl rounded-br-xl">
                <DialogHeader>
                  <DialogTitle>Confirm your order</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <p className="font-bold mb-2">Your cart</p>
                    <ScrollArea className={"h-[22rem] border rounded-lg p-2 border-x-0"}>
                      {cart?.data?.[0] &&
                        cart?.data.map((cartItem) => (
                          <CartItem key={`CartItem-${cartItem.id}`} cartItem={cartItem as CartItemType} />
                        ))}
                    </ScrollArea>
                    <div className="flex mt-2">
                      <p className="text-sm font-medium">Total: ₱ {(cart?.totalCost ?? 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type={"submit"}
                      size={"lg"}
                      className={"w-full mt-4"}
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
          <MultipleOrderReceiptDialogContent orders={orders.data as OrderType[]} />
        </Dialog>
      </>}
      
    </>
  );
}

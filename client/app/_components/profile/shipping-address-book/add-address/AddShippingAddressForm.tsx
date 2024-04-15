"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useCallback, useState } from "react";
import * as z from "zod";

// App imports
import useAddShippingAddress from "@hooks/profile/shipping-address-book/add-address/useAddShippingAddress";
import { ADD_SHIPPING_ADDRESS_FORM_SCHEMA as formSchema } from "@constants/profile/shipping-address-book/forms";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import CountriesCombobox from "@components/shared/CountriesCombobox";
import { PhoneInput } from "@components/shared/PhoneInput";
import { Tables } from "@constants/base/database-types";
import { CountryType } from "@constants/base/types";
import { useToast } from "@components/ui/use-toast";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

type AddShippingAddressFormProps = {
  authenticatedUser: Tables<"users">;
};

export default function AddShippingAddressForm({ authenticatedUser }: AddShippingAddressFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>();
  const addShippingAddressMutation = useAddShippingAddress();
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

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      await addShippingAddressMutation
        .mutateAsync({
          userId: authenticatedUser.id,
          receiverEmail: data.receiverEmail,
          receiverFirstName: data.receiverFirstName,
          receiverLastName: data.receiverLastName,
          receiverPhoneNumber: data.receiverPhoneNumber,
          shippingCountry: selectedCountry?.name!,
          shippingAddress: data.shippingAddress,
          shippingZipCode: data.shippingZipCode,
        })
        .then(async ({ data, error }) => {
          if (error) {
            toast({
              variant: "destructive",
              title: "An error has occured.",
              description: "Please try again later.",
            });
          } else {
            toast({
              title: "Shipping address has been successfully added.",
              description: "Changes should take effect immediately.",
            });
            form.reset();
          }
        });
    },
    [addShippingAddressMutation, authenticatedUser, selectedCountry, toast, form]
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 gap-y-2">
            <FormField
              control={form.control}
              name="receiverEmail"
              render={({ field }) => (
                <FormItem className={"col-span-full"}>
                  <FormLabel>Receiver email</FormLabel>
                  <FormControl>
                    <Input placeholder="receiver@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-full grid grid-cols-2 gap-2">
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
                  <FormItem>
                    <FormLabel>Receiver last name</FormLabel>
                    <FormControl>
                      <Input placeholder="receiver-last-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="receiverPhoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Receiver phone number</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} placeholder="receiver-phone-number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-full space-y-2">
              <Label>Shipping country</Label>
              <CountriesCombobox setSelectedCountry={setSelectedCountry} />
            </div>
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem className={"col-span-full"}>
                  <FormLabel>Shipping address</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} placeholder="full-shipping-address" disabled={!selectedCountry} />
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
                    <Input {...field} placeholder="shipping-zip-code" disabled={!selectedCountry} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-full flex justify-center mt-6">
              <Button
                type={"submit"}
                size={"lg"}
                className={"w-full md:w-6/12"}
                disabled={addShippingAddressMutation.isPending}
              >
                Add Shipping Address
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

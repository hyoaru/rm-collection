"use client";

import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// App imports
import useUpdateShippingAddress from "@hooks/profile/shipping-address-book/update-address/useUpdateShippingAddress";
import { UPDATE_SHIPPING_ADDRESS_FORM_SCHEMA as formSchema } from "@constants/profile/shipping-address-book/forms";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import ShippingAddressBookCombobox from "@components/shared/ShippingAddressBookCombobox";
import CountriesCombobox from "@components/shared/CountriesCombobox";
import { PhoneInput } from "@components/shared/PhoneInput";
import { Tables } from "@constants/base/database-types";
import { CountryType } from "@constants/base/types";
import { useToast } from "@components/ui/use-toast";
import { Textarea } from "@components/ui/textarea";
import countryList from "@/public/countries.json";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

type UpdateShippingAddressFormProps = {
  authenticatedUser: Tables<"users">;
};

export default function UpdateShippingAddressForm({ authenticatedUser }: UpdateShippingAddressFormProps) {
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<Tables<"shipping_address_book"> | null>();
  const [shipingAddressBookComboboxValue, setShipingAddressBookComboboxValue] = useState<string | null>();
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>();
  const updateShippingAddressMutation = useUpdateShippingAddress();
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverEmail: "",
      receiverFirstName: "",
      receiverLastName: "",
      receiverPhoneNumber: "",
      shippingAddress: "",
      shippingZipCode: "",
    },
  });

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
        setIsFormDisabled(false);
      } else {
        emptyFormFields();
        setIsFormDisabled(true);
      }
    },
    [form, emptyFormFields]
  );

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (selectedShippingAddress) {
        await updateShippingAddressMutation
          .mutateAsync({
            id: selectedShippingAddress.id,
            receiverEmail: data.receiverEmail,
            receiverFirstName: data.receiverFirstName,
            receiverLastName: data.receiverLastName,
            receiverPhoneNumber: data.receiverPhoneNumber,
            shippingCountry: selectedCountry?.name ?? selectedShippingAddress.shipping_country,
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
                title: "Shipping address has been deleted successfully.",
                description: "Changes should take effect immediately.",
              });
              emptyFormFields();
            }
          });
      }
    },
    [selectedShippingAddress, selectedCountry, updateShippingAddressMutation, toast, emptyFormFields]
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 gap-y-2">
            <div className="col-span-full">
              <ShippingAddressBookCombobox
                userId={authenticatedUser.id}
                value={shipingAddressBookComboboxValue}
                setValue={setShipingAddressBookComboboxValue}
                onSelectedValueChange={onSelectedShippingAddressChange}
              />
            </div>
            <FormField
              control={form.control}
              name="receiverEmail"
              render={({ field }) => (
                <FormItem className={"col-span-full"}>
                  <FormLabel>Receiver email</FormLabel>
                  <FormControl>
                    <Input placeholder="receiver@email.com" {...field} disabled={isFormDisabled} />
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
                      <Input placeholder="receiver-first-name" {...field} disabled={isFormDisabled} />
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
                      <Input placeholder="receiver-last-name" {...field} disabled={isFormDisabled} />
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
                    <PhoneInput {...field} placeholder="receiver-phone-number" disabled={isFormDisabled} />
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
                isDisabled={isFormDisabled}
              />
            </div>
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem className={"col-span-full"}>
                  <FormLabel>Shipping address</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} placeholder="full-shipping-address" disabled={isFormDisabled} />
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
                    <Input {...field} placeholder="shipping-zip-code" disabled={isFormDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full flex justify-center mt-6">
            <Button
              type={"submit"}
              size={"lg"}
              className={"w-full md:w-6/12"}
              disabled={updateShippingAddressMutation.isPending || !shipingAddressBookComboboxValue}
            >
              Delete shipping address
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

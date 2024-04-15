"use client";

import { useForm } from "react-hook-form";
import React, { useCallback, useState } from "react";

// App imports
import useDeleteShippingAddress from "@hooks/profile/shipping-address-book/useDeleteShippingAddress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import ShippingAddressBookCombobox from "@components/shared/ShippingAddressBookCombobox";
import { PhoneInput } from "@components/shared/PhoneInput";
import { Tables } from "@constants/base/database-types";
import Separator from "@components/shared/Separator";
import { Textarea } from "@components/ui/textarea";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";

type ShippingAddressBookProps = {
  authenticatedUser: Tables<"users">;
};

export default function ShippingAddressBook({ authenticatedUser }: ShippingAddressBookProps) {
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<Tables<"shipping_address_book"> | null>();
  const [shipingAddressBookComboboxValue, setShipingAddressBookComboboxValue] = useState<string | null>();
  const [isDeleteShippingAddressConfirmationDialogOpen, setIsDeleteShippingAddressConfirmationDialogOpen] =
    useState(false);

  const deleteShippingAddressMutation = useDeleteShippingAddress();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      receiverEmail: "",
      receiverFirstName: "",
      receiverLastName: "",
      receiverPhoneNumber: "",
      shippingCountry: "",
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
      shippingCountry: "",
      shippingAddress: "",
      shippingZipCode: "",
    });
  }, [form]);

  const onSelectedShippingAddressChange = useCallback(
    (shippingAddress: Tables<"shipping_address_book"> | null) => {
      setSelectedShippingAddress(shippingAddress);

      if (shippingAddress) {
        form.reset({
          receiverEmail: shippingAddress.receiver_email,
          receiverFirstName: shippingAddress.receiver_first_name,
          receiverLastName: shippingAddress.receiver_last_name,
          receiverPhoneNumber: shippingAddress.receiver_phone_number,
          shippingCountry: shippingAddress.shipping_country,
          shippingAddress: shippingAddress.shipping_address,
          shippingZipCode: shippingAddress.shipping_zip_code,
        });
      } else {
        emptyFormFields();
      }
    },
    [form, emptyFormFields]
  );

  const onDeleteShippingAddress = useCallback(() => {
    setIsDeleteShippingAddressConfirmationDialogOpen(true);
  }, []);

  const onConfirmDeleteShippingAddress = useCallback(async () => {
    if (selectedShippingAddress) {
      await deleteShippingAddressMutation.mutateAsync(selectedShippingAddress.id).then(async ({ data, error }) => {
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
  }, [selectedShippingAddress, deleteShippingAddressMutation, toast, emptyFormFields]);

  return (
    <>
      <Form {...form}>
        <form>
          <div className="grid grid-cols-12 gap-4 gap-y-2">
            <div className="col-span-full">
              <Separator>
                <span className="text-sm">Selected shipping address</span>
              </Separator>
            </div>
            <div className="col-span-full">
              <ShippingAddressBookCombobox
                userId={authenticatedUser.id}
                value={shipingAddressBookComboboxValue}
                setValue={setShipingAddressBookComboboxValue}
                onSelectedValueChange={onSelectedShippingAddressChange}
              />
            </div>
            <div className="col-span-full">
              <Separator>
                <span className="text-sm">Address details</span>
              </Separator>
            </div>
            <FormField
              control={form.control}
              name="receiverEmail"
              render={({ field }) => (
                <FormItem className={"col-span-full"}>
                  <FormLabel>Receiver email</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="receiver@email.com" {...field} />
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
                      <Input disabled placeholder="receiver-first-name" {...field} />
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
                      <Input disabled placeholder="receiver-last-name" {...field} />
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
                    <PhoneInput disabled {...field} placeholder="receiver-phone-number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingCountry"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Shipping country</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="shipping-country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem className={"col-span-full"}>
                  <FormLabel>Shipping address</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} placeholder="full-shipping-address" disabled />
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
                    <Input {...field} placeholder="shipping-zip-code" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full flex justify-center mt-6">
            <Button
              type={"button"}
              size={"lg"}
              className={"w-full md:w-6/12"}
              onClick={onDeleteShippingAddress}
              disabled={deleteShippingAddressMutation.isPending || !shipingAddressBookComboboxValue}
            >
              Delete shipping address
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog
        open={isDeleteShippingAddressConfirmationDialogOpen}
        onOpenChange={setIsDeleteShippingAddressConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is a destructive operation and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-destructive-foreground" onClick={onConfirmDeleteShippingAddress}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

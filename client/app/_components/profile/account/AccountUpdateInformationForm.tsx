"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import * as z from "zod";

// App imports
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { ACCOUNT_UPDATE_INFORMATION_FORM as formSchema } from "@constants/profile/account/forms";
import { useUpdateUserInformation } from "@hooks/profile/account/useUpdateUserInformation";
import { useToast } from "@components/ui/use-toast";
import useSendPasswordResetRequest from "@hooks/authentication/useSendPasswordResetRequest";
import { Tables } from "@constants/base/database-types";

type AccountUpdateInformationFormProps = {
  authenticatedUser: Tables<"users">;
};

export default function AccountUpdateInformationForm({ authenticatedUser }: AccountUpdateInformationFormProps) {
  const updateUserInformationMutation = useUpdateUserInformation();
  const { sendPasswordResetRequest, isLoading: sendPasswordResetRequestIsLoading } = useSendPasswordResetRequest();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: authenticatedUser.id,
      email: authenticatedUser.email,
      firstName: authenticatedUser.first_name ?? "-",
      lastName: authenticatedUser.last_name ?? "-",
      password: nanoid(),
    },
  });

  async function onResetPassword() {
    await sendPasswordResetRequest({ email: authenticatedUser.email }).then(async ({ data, error }) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error has occured.",
          description: "Please try again later.",
        });
      } else {
        toast({
          title: "Password reset request has been sent to your email.",
          description: "Please check your email inbox.",
        });
      }
    });
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await updateUserInformationMutation
      .mutateAsync({
        userId: authenticatedUser.id,
        firstName: data.firstName,
        lastName: data.lastName,
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
            title: "Your information has been updated.",
            description: "Changes will take effect shortly.",
          });
        }
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 gap-y-2">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className={"col-span-6"}>
                  <FormLabel className={"text-muted-foreground"}>User Id</FormLabel>
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
                <FormItem className={"col-span-6"}>
                  <FormLabel className={"text-muted-foreground"}>Email</FormLabel>
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
                <FormItem className={"col-span-6"}>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-first-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className={"col-span-6"}>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-last-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={"col-span-12"}>
                  <FormLabel className={"text-muted-foreground"}>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="your-very-secure-password" {...field} type={"password"} disabled />
                  </FormControl>
                  <FormDescription className={"flex justify-end"}>
                    <small
                      className="text-muted-foreground cursor-pointer ease-on-out duration-500 hover:text-destructive"
                      onClick={onResetPassword}
                    >
                      Reset password
                    </small>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-8 flex mx-auto w-full lg:w-1/2"
            disabled={updateUserInformationMutation.isPending}
          >
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
}

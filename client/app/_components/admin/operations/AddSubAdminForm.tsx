"use client";

import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// App imports
import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";
import UserListCombobox from "@components/admin/operations/shared/UserListCombobox";
import { ADD_SUB_ADMIN_FORM_SCHEMA as formSchema } from "@constants/admin/forms";
import { Tables } from "@constants/base/database-types";
import { useAddSubAdmin } from "@hooks/admin/operations/useAddSubAdmin";

export default function AddSubAdminForm() {
  const [selectedUser, setSelectedUser] = useState<Tables<"users"> | null>();
  const [userListComboboxValue, setUserListComboboxValue] = useState<string | null>();
  const addSubAdminMutation = useAddSubAdmin();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "",
    },
  });

  const onSubmit = useCallback(async () => {
    if (!selectedUser) return;

    await addSubAdminMutation.mutateAsync(selectedUser.id).then(({ error }) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error has occured.",
          description: "Please try again later.",
        });
      } else {
        toast({
          title: "User has been made to sub admin successfully",
          description: "Changes will take effect shortly.",
        });

        emptyFormFields();
      }
    });
  }, [selectedUser]);

  const emptyFormFields = useCallback(() => {
    setSelectedUser(null);
    setUserListComboboxValue(null);

    form.reset({
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "",
    });
  }, []);

  const onSelectedUserChange = useCallback((user: Tables<"users"> | null) => {
    setSelectedUser(user);
    if (user) {
      form.reset({
        id: user.id,
        email: user.email,
        firstName: user.first_name ?? "-",
        lastName: user.last_name ?? "-",
        role: user.role,
      });
    } else {
      emptyFormFields();
    }
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4 gap-y-2">
                <div className="col-span-4 space-y-2">
                  <div className="flex border-b rounded-lg px-2 py-1">
                    <small className="text-center uppercase">User</small>
                  </div>
                  <UserListCombobox
                    value={userListComboboxValue}
                    setValue={setUserListComboboxValue}
                    onSelectedValueChange={onSelectedUserChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 gap-y-3">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className={"col-span-2"}>
                      <FormLabel>User id</FormLabel>
                      <FormControl>
                        <Input placeholder="user-id" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={"col-span-2"}>
                      <FormLabel>User email</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="user-email" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className={"col-span-2"}>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="first-name" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className={"col-span-2"}>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="last-name" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className={"col-span-4"}>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="role" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              size={"lg"}
              className="mt-8 flex mx-auto w-full lg:w-1/2"
              disabled={addSubAdminMutation.isPending || !userListComboboxValue}
            >
              Make sub admin
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

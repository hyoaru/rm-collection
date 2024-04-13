import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// App imports
import { useUpdateOrderShippingDetails } from "@hooks/admin/tables/orders/useUpdateOrderShippingDetails";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { EDIT_SHIPPING_DETAILS_FORM_SCHEMA as formSchema } from "@constants/admin/forms";
import { DialogContent, Dialog } from "@components/ui/dialog";
import { OrderType } from "@constants/shared/types";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";
import ReadOnlyFormControl from "@components/shared/ReadOnlyFormControl";

type UpdateShippingDetailsFormDialogContentProps = {
  order: OrderType;
  onSuccess: () => void;
};

export default function UpdateShippingDetailsFormDialogContent({
  order,
  onSuccess,
}: UpdateShippingDetailsFormDialogContentProps) {
  const updateOrderShippingDetailsMutation = useUpdateOrderShippingDetails();
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingCourier: order.orders_shipping?.shipping_courier ?? "",
      shippingTrackingId: order.orders_shipping?.shipping_tracking_id ?? "",
      shippingFee: order.orders_shipping?.shipping_fee ?? 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsConfirmationDialogOpen(true);
  }

  async function onConfirm() {
    const data = form.getValues();

    await updateOrderShippingDetailsMutation
      .mutateAsync({
        shippingId: order.order_shipping_id!,
        shippingCourier: data.shippingCourier,
        shippingTrackingId: data.shippingTrackingId,
        shippingFee: data.shippingFee,
      })
      .then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: error?.message,
          });
        } else {
          toast({
            title: "Shipping details has been updated successfully.",
            description: "Changes should take effect immediately.",
          });

          onSuccess();
        }
      });
  }

  return (
    <>
      <DialogContent>
        <p className="text-center font-bold">Update shipping details</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 gap-y-2">
              <FormField
                control={form.control}
                name="shippingCourier"
                render={({ field }) => (
                  <FormItem className={""}>
                    <FormLabel>Shipping Courier</FormLabel>
                    <FormControl>
                      <Input placeholder="shipping-courier-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingTrackingId"
                render={({ field }) => (
                  <FormItem className={""}>
                    <FormLabel>Shipping Tracking Id</FormLabel>
                    <FormControl>
                      <Input placeholder="shipping-tracking-id-from-courier" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingFee"
                render={({ field }) => (
                  <FormItem className={""}>
                    <FormLabel>Shipping Fee</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="shipping-fee-from-courier" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="my-6 w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>

      <Dialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
        <DialogContent>
          <p className="text-center font-bold">Confirm shipping details</p>
          <p className="text-sm">
            <span className="text-destructive font-bold">{'WARNING: '}</span>
            {'These details cannot be changed later on, please proceed only if you are certain of this action.'}
          </p>
          <div className="grid grid-cols-1 gap-4 gap-y-2">
            <ReadOnlyFormControl label="Shipping Courier" value={form.getValues().shippingCourier} />
            <ReadOnlyFormControl label="Shipping Tracking Id" value={form.getValues().shippingTrackingId} />
            <ReadOnlyFormControl label="Shipping Fee" value={`₱ ${form.getValues().shippingFee.toLocaleString()}`} />
          </div>
          <Button type="button" className="my-4 w-full" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

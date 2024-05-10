import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

// App imports
import { Tables } from "@constants/base/database-types";
import { OrderType } from "@constants/shared/types";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import { useToast } from "@components/ui/use-toast";
import setOrderGroupStatusAdmin from "@/app/_services/admin/tables/setOrderGroupStatusAdmin";

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
import UpdateShippingDetailsFormDialogContent from "./UpdateShippingDetailsFormDialogContent";
import { Dialog } from "@/app/_components/ui/dialog";

type OrderStatusActionItemToReceiveProps = { order: OrderType; queryKeys: any[][] };

export default function OrderStatusActionItemToReceive({ order, queryKeys }: OrderStatusActionItemToReceiveProps) {
  const [isUpdateShippingDetailsDialogOpen, setIsUpdateShippingDetailsDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  async function executeAction() {
    toast({
      title: "Operation in process...",
      description: "This should take a second or two.",
    });

    await setOrderGroupStatusAdmin({ order: order, status: "to_receive" }).then(async ({ error }: any) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error has occured.",
          description: error?.message,
        });
      } else {
        toast({
          title: "Operation sucessful.",
          description: "Changes should take effect immediately.",
        });

        for await (const queryKey of queryKeys) {
          await queryClient.invalidateQueries({ queryKey: queryKey, refetchType: "all" });
        }
      }
    });
  }

  async function onClick() {
    setIsUpdateShippingDetailsDialogOpen(true);
  }

  async function onConfirm() {
    await executeAction()
  }

  function onUpdateShippingDetailsSuccess() {
    setIsConfirmationDialogOpen(true);
  }

  return (
    <>
      <DropdownMenuItem className={`text-sm p-2`} onSelect={(e) => e.preventDefault()} onClick={onClick}>
        {"Order: to_receive"}
      </DropdownMenuItem>

      <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed on executing this order status action?</AlertDialogTitle>
            <AlertDialogDescription>{`Order status action to execute: 'Order: to_receive'`}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isUpdateShippingDetailsDialogOpen} onOpenChange={setIsUpdateShippingDetailsDialogOpen}>
        <UpdateShippingDetailsFormDialogContent order={order} onSuccess={onUpdateShippingDetailsSuccess} />
      </Dialog>
    </>
  );
}

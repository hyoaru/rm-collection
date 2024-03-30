import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

// App imports
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import { useToast } from "@components/ui/use-toast";
import { DataTableRowActionType } from "@constants/admin/types";
import { Tables } from "@constants/base/database-types";

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

type SetOrderStatusActionItemProps = {
  data: any;
  rowAction: DataTableRowActionType;
  authenticatedUser: Tables<"users">;
  queryKeys: any[][]
};

export default function SetOrderStatusActionItem({ data, rowAction, authenticatedUser, queryKeys }: SetOrderStatusActionItemProps) {
  const queryClient = useQueryClient()
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const { toast } = useToast();

  const orderStatusToSet = rowAction.label.slice(rowAction.label.indexOf(':') + 2)
  const isDisabled = !rowAction.adminRolesPermitted.includes(authenticatedUser.role) || data.order_status.label.includes(orderStatusToSet)

  async function executeRowAction() {
    toast({
      title: "Operation in process...",
      description: "This should take a second or two.",
    });

    await rowAction.onClick(data).then(async ({ error }: any) => {
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
          await queryClient.invalidateQueries({ queryKey: queryKey, refetchType: 'all'})
        }

      }
    });
  }

  async function onClick() {
    if (!rowAction.adminRolesPermitted.includes(authenticatedUser.role)) return;

    if (!rowAction.isDestructive) {
      await executeRowAction();
    } else {
      setIsAlertDialogOpen(true);
    }
  }

  async function onDestructiveActionConfirm() {
    await executeRowAction();
  }

  return (
    <>
      <DropdownMenuItem
        className={`text-sm p-2 ${
          rowAction.isDestructive ? "text-destructive data-[highlighted]:text-destructive" : ""
        }`}
        onSelect={(e) => e.preventDefault()}
        onClick={onClick}
        disabled={isDisabled}
      >
        {rowAction.label}
      </DropdownMenuItem>

      {rowAction.isDestructive && (
        <>
          <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is a destructive operation and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDestructiveActionConfirm}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

// App imports
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import { useToast } from "@components/ui/use-toast";
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

type RowActionType = {
  label: string;
  onClick: (order: Tables<"orders">) => any;
  isDisplayed: boolean;
  isDestructive: boolean;
};

type OrderViewGroupActionItemProps = {
  data: any;
  rowAction: RowActionType;
  queryKeys: any[][];
};

export default function OrderViewGroupActionItem({ data, rowAction, queryKeys }: OrderViewGroupActionItemProps) {
  const queryClient = useQueryClient();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const { toast } = useToast();

  async function executeRowAction() {
    toast({
      title: "Operation in process...",
      description: "This should take a second or two.",
    });

    await rowAction.onClick(data).then(async ({ error }: any) => {
      console.log(error)
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
      {rowAction.isDisplayed && (
        <>
          <DropdownMenuItem
            className={`text-sm p-2 ${
              rowAction.isDestructive ? "text-destructive data-[highlighted]:text-destructive" : ""
            }`}
            onSelect={(e) => e.preventDefault()}
            onClick={onClick}
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
      )}
    </>
  );
}

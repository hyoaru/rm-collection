import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

// App imports
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
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

type OrderStatusActionItemProps = {
  label: String;
  action: () => Promise<{ data: any; error: any }>;
  isDestructive?: boolean;
  queryKeys: any[][];
};

export default function OrderStatusActionItem({
  label,
  action,
  isDestructive,
  queryKeys,
}: OrderStatusActionItemProps) {
  const [isDestructiveDialogOpen, setIsDestructiveDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  async function executeAction() {
    toast({
      title: "Operation in process...",
      description: "This should take a second or two.",
    });

    await action().then(async ({ error }: any) => {
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
    setIsConfirmationDialogOpen(true);
  }

  async function onConfirm() {
    if (isDestructive) {
      setIsDestructiveDialogOpen(true);
    } else {
      await executeAction();
    }
  }

  async function onDestructiveActionConfirm() {
    await executeAction();
  }

  return (
    <>
      <DropdownMenuItem
        className={`text-sm p-2 ${isDestructive ? "text-destructive data-[highlighted]:text-destructive" : ""}`}
        onSelect={(e) => e.preventDefault()}
        onClick={onClick}
      >
        {label}
      </DropdownMenuItem>

      <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed on executing this order status action?</AlertDialogTitle>
            <AlertDialogDescription>{`Confirm order status operation: '${label}'`}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isDestructive && (
        <>
          <AlertDialog open={isDestructiveDialogOpen} onOpenChange={setIsDestructiveDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-destructive">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is a destructive operation and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="text-destructive" onClick={onDestructiveActionConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}

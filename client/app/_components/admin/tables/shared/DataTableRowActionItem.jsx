import React, { useState } from 'react'

// App imports
import { DropdownMenuItem } from "@components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@components/ui/alert-dialog"
import { useToast } from '@components/ui/use-toast'
import revalidateAllData from '@services/shared/revalidateAllData'

export default function DataTableRowActionItem(props) {
  const { rowAction, data, userStateGeneral } = props
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const { toast } = useToast()

  async function executeRowAction() {
    await rowAction.onClick(data)
      .then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: error?.message
          })
        } else {
          toast({
            title: "Operation sucessful.",
            description: "Changes should take effect immediately."
          })
          await revalidateAllData()
        }
      })
  }

  async function onClick() {
    if (!rowAction.adminRolesPermitted.includes(userStateGeneral.role)) return

    if (!rowAction.isDestructive) {
      await executeRowAction()
    } else {
      setIsAlertDialogOpen(true)
    }
  }

  async function onDestructiveActionConfirm(){
    await executeRowAction()
  }

  return (
    <>
      <DropdownMenuItem
        className={`text-sm p-2 ${rowAction.isDestructive ? 'text-destructive data-[highlighted]:text-destructive' : ''}`}
        onSelect={(e) => e.preventDefault()}
        onClick={onClick} 
      >
        {rowAction.label}
      </DropdownMenuItem>

      {rowAction.isDestructive && <>
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
      </>}
    </>
  )
}

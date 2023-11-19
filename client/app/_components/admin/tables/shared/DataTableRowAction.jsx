import React from 'react'
import { MoreHorizontal } from 'lucide-react'

// App imports
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@components/ui/alert-dialog"
import { Button } from '@components/ui/button'
import revalidateAllData from '@services/shared/revalidateAllData'
import { useToast } from '@components/ui/use-toast'

export default function DataTableRowAction(props) {
  const { rowActions, data, userStateGeneral } = props
  const { toast } = useToast()

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {rowActions.map((rowAction, index) => {
              const isPermitted = rowAction.adminRolesPermitted.includes(userStateGeneral.role)
              if (isPermitted) {
                if (rowAction.isDestructive) {
                  return (
                    <DropdownMenuItem key={`DataTableRowActionItem-${index}`} asChild>
                      <>
                        <AlertDialogTrigger asChild>
                          <span className='text-sm p-2 w-full cursor-pointer'>
                            {rowAction.label}
                          </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action is a destructive operation and cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button
                                variant={'destructive'}
                                onClick={async () => {
                                  await rowAction.onClick(data)
                                    .then(({ data, error }) => {
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
                                        revalidateAllData()
                                      }
                                    })
                                }}
                              >
                                Continue
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </>
                    </DropdownMenuItem>
                  )

                } else {
                  return (
                    <DropdownMenuItem
                      asChild
                      className={'cursor-pointer w-full'}
                      key={`DataTableRowActionItem-${index}`}
                      onClick={async () => {
                        await rowAction.onClick(data)
                          .then(({ data, error }) => {
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
                              revalidateAllData()
                            }
                          })
                      }}
                    >
                      <span className='text-sm p-2'>
                        {rowAction.label}
                      </span>
                    </DropdownMenuItem>
                  )
                }
              }
            })}

          </DropdownMenuContent>
        </DropdownMenu>
      </AlertDialog>

    </>
  )
}

import React from 'react'
import { MoreHorizontal } from 'lucide-react'

// App imports
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { Button } from '@components/ui/button'
import revalidateAllData from '@services/shared/revalidateAllData'
import { useToast } from '@components/ui/use-toast'

export default function DataTableRowAction(props) {
  const { rowActions, data } = props
  const { toast } = useToast()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {rowActions.map((rowAction, index) => (
            <DropdownMenuItem
              className={'cursor-pointer'}
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
              {rowAction.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

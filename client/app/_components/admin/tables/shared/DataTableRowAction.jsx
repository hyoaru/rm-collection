import React from 'react'
import { MoreHorizontal } from 'lucide-react'

// App imports
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { Button } from '@components/ui/button'
import DataTableRowActionItem from '@components/admin/tables/shared/DataTableRowActionItem'

export default function DataTableRowAction(props) {
  const { rowActions, data, userStateGeneral } = props

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className={'h-8 w-8 p-0'}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {rowActions?.map((rowAction) => (
            <DataTableRowActionItem 
              key={`DataTableRowActionItem-${rowAction.label}`}
              userStateGeneral={userStateGeneral}
              rowAction={rowAction}
              data={data}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

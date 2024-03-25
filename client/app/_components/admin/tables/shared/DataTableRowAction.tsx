import React from "react";
import { MoreHorizontal } from "lucide-react";

// App imports
import { Button } from "@components/ui/button";
import DataTableRowActionItem from "@components/admin/tables/shared/DataTableRowActionItem";
import { DataTableRowActionType } from "@constants/admin/types";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import { Tables } from "@constants/base/database-types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

type DataTableRowActionProps = {
  data: any;
  rowActions: DataTableRowActionType[];
  queryKeys: any[][];
  authenticatedUser: Tables<'users'> | null
};

export default function DataTableRowAction({ data, rowActions, queryKeys, authenticatedUser }: DataTableRowActionProps) {
  if (authenticatedUser) {
    return (
      <>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className={"h-8 w-8 p-0"}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={"end"}>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {rowActions?.map((rowAction) => (
              <DataTableRowActionItem
                key={`DataTableRowActionItem-${rowAction.label}`}
                authenticatedUser={authenticatedUser}
                rowAction={rowAction}
                queryKeys={queryKeys}
                data={data}
              />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}

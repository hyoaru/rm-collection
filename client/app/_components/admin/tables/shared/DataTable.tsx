"use client";

import React, { useCallback, useMemo } from "react";
import jsFileDownload from "js-file-download";
import dayjs from "dayjs";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// App imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import useGetTable from "@hooks/admin/tables/useGetTable";
import { useToast } from "@components/ui/use-toast";
import { formatTimestampTable } from "@lib/formatTimestamp";
import DataTableRowAction from "@components/admin/tables/shared/DataTableRowAction";
import { Tables } from "@constants/base/database-types";

type DataTableProps = {
  authenticatedUser: Tables<"users"> | null;
  columnDefinition: any[];
  rowActions: any[];
  tableName: string;
  getListCsv: () => Promise<{ data: string | null; error: any }>;
  queryKeys: any[][];
  queryOptions: () => any;
};

export default function DataTable({
  authenticatedUser,
  columnDefinition,
  rowActions,
  tableName,
  getListCsv,
  queryKeys,
  queryOptions,
}: DataTableProps) {
  const { data: queryData } = useQuery(queryOptions());
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const memoizedData = useMemo(() => (queryData as any)?.data, [queryData]);

  const newColumnDefinition = useMemo(() => {
    const newColDef = [...columnDefinition];

    newColDef.push(
      { accessorFn: (row: any) => formatTimestampTable(row.created_at), header: "created_at" },
      { accessorFn: (row: any) => formatTimestampTable(row.updated_at), header: "updated_at" }
    );

    if (rowActions) {
      newColDef.push({
        id: "actions",
        header: "",
        accessorFn: (row: any) => row,
        cell: (info: any) => (
          <DataTableRowAction
            rowActions={rowActions}
            data={info.getValue()}
            queryKeys={queryKeys}
            authenticatedUser={authenticatedUser}
          />
        ),
      });
    }

    return newColDef;
  }, []);

  const {
    table,
    globalFilter,
    pageRef,
    flexRender,
    onGlobalFilterChange,
    onFirstPagePagination,
    onLastPagePagination,
    onNextPagePagination,
    onPreviousPagePagination,
    onPageJump,
  } = useGetTable({
    data: memoizedData,
    columnDefinition: newColumnDefinition,
  });

  const onExportToCsv = useCallback(async () => {
    await getListCsv().then(({ data, error }) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error has occured.",
          description: "Please try again later.",
        });
      } else {
        if (data) {
          jsFileDownload(data, `${tableName.toUpperCase()}_${dayjs().format("YYYY-MM-DD")}.csv`);
          toast({
            title: "Data exported to CSV.",
            description: "Please confirm to download.",
          });
        } else {
          toast({
            title: "Operation cancelled.",
            description: "Data is currently empty.",
          });
        }
      }
    });
  }, []);

  const onRefresh = useCallback(async () => {
    toast({
      title: "Revalidated data.",
      description: "Changes should take effect immediately.",
    });

    for await (const queryKey of queryKeys) {
      await queryClient.invalidateQueries({ queryKey: queryKey });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row mb-4 gap-2">
        <Input
          type="text"
          placeholder="Filter table"
          className="w-full sm:w-1/2 me-auto"
          value={globalFilter}
          onChange={onGlobalFilterChange}
        />
        <div className="flex gap-2">
          <Button variant={"secondary"} onClick={onExportToCsv} className={"w-full"}>
            Export to CSV
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-secondary rounded-lg p-3" onClick={onRefresh}>
                  <RefreshCw size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Table>
        <TableHeader className={"bg-secondary"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`${header.column.getIsSorted() ? "text-primary font-bold" : ""}`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: " ⏶", desc: " ⏷" }[Number(header.column.getIsSorted())] ?? null}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-5 gap-1 sm:gap-5">
        <Button size={"sm"} onClick={onFirstPagePagination}>
          <ChevronsLeft />
        </Button>
        <Button size={"sm"} variant={"secondary"} onClick={onPreviousPagePagination}>
          <ChevronLeft />
        </Button>

        <Input
          className={"text-center max-w-[5rem] sm:max-w-[10rem]"}
          type={"number"}
          value={pageRef.current}
          onChange={onPageJump}
        />

        <Button size={"sm"} variant={"secondary"} onClick={onNextPagePagination}>
          <ChevronRight />
        </Button>
        <Button size={"sm"} onClick={onLastPagePagination}>
          <ChevronsRight />
        </Button>
      </div>
    </>
  );
}

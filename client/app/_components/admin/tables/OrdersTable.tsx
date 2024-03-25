"use client";

import React, { useCallback, useMemo, useState } from "react";
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
import { Skeleton } from "@components/ui/skeleton";
import { queryAllOrders } from "@constants/admin/queries";
import OrderStatusSelect from "@components/shared/OrderStatusSelect";

type OrdersTableProps = {
  columnDefinition: any[];
  tableName: string;
  getListCsv: () => Promise<{ data: string | null; error: any }>;
  queryKeys: any[][]
};

export default function OrdersTable({
  columnDefinition,
  tableName,
  getListCsv,
  queryKeys
}: OrdersTableProps) {
  const allOrdersQuery = useQuery(queryAllOrders());
  const [statusFilter, setStatusFilter] = useState('all')
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const filteredOrders = useMemo(() => {
    const orders = allOrdersQuery?.data?.data ?? []
    if (statusFilter !== 'all') {
      return orders?.filter((order) => order.order_status?.label === statusFilter) 
    } else {
      return orders
    }
  }, [statusFilter, allOrdersQuery?.data?.data])

  const columnDefinitionMemoized = useMemo(() => columnDefinition, [columnDefinition])

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
    data: filteredOrders,
    columnDefinition: columnDefinitionMemoized,
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
  }, [getListCsv, tableName, toast]);

  const onRefresh = useCallback(async () => {
    for await (const queryKey of queryKeys) {
      await queryClient.invalidateQueries({ queryKey: queryKey, refetchType: "all" });
    }

    toast({
      title: "Revalidated data.",
      description: "Changes should take effect immediately.",
    });
  }, [queryClient, queryKeys, toast]);

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
          <OrderStatusSelect statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          <Button variant={'secondary'} onClick={onExportToCsv} className={'w-max'}>
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
      </div >

      {allOrdersQuery.isPending || allOrdersQuery.isFetching ? (
        <Skeleton className="w-full h-[40svh] rounded-lg transition-all duration-700 ease-in-out" />
      ) : (
        <>
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

          {(!filteredOrders || filteredOrders.length <= 0) && (
            <>
              <div className="flex items-center justify-center">
                <span className="font-bold text-xl opacity-50 mt-14 mb-10 border rounded-xl p-5">
                  {"Table is currently empty."}
                </span>
              </div>
            </>
          )}
        </>
      )}


      {table.getCanNextPage() && (
        <>
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
      )}
    </>
  );
}

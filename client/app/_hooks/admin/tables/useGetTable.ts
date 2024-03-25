import React, { useRef, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel } from "@tanstack/react-table";
import { getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";

type UseGetTableParams = {
  data: any;
  columnDefinition: any;
};

export default function useGetTable({ data, columnDefinition }: UseGetTableParams) {
  const [sorting, setSorting] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const pageRef = useRef(0);

  const table = useReactTable({
    state: { sorting: sorting, globalFilter: globalFilter },
    columns: columnDefinition,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  function onGlobalFilterChange(event: React.ChangeEvent<HTMLInputElement> | undefined) {
    if (!event) return;
    setGlobalFilter(event.target.value);
  }

  function onFirstPagePagination() {
    pageRef.current = 0;
    table.setPageIndex(pageRef.current);
  }

  function onLastPagePagination() {
    pageRef.current = table.getPageCount() - 1;
    table.setPageIndex(pageRef.current);
  }

  function onNextPagePagination() {
    if (!table.getCanNextPage() || !table.options.state.pagination) return;
    pageRef.current = table.options.state.pagination.pageIndex + 1;
    table.setPageIndex(pageRef.current);
  }

  function onPreviousPagePagination() {
    if (!table.getCanPreviousPage() || !table.options.state.pagination) return;
    pageRef.current = table.options.state.pagination.pageIndex - 1;
    table.setPageIndex(pageRef.current);
  }

  function onPageJump(event: React.ChangeEvent<HTMLInputElement> | undefined) {
    if (!event) return;
    pageRef.current = Number(event.target.value);
    table.setPageIndex(pageRef.current);
  }

  return {
    table,
    flexRender,
    pageRef,
    globalFilter,
    onGlobalFilterChange,
    onFirstPagePagination,
    onLastPagePagination,
    onNextPagePagination,
    onPreviousPagePagination,
    onPageJump,
  };
}

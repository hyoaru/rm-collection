"use client"

import React from 'react'
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'

// App imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import useGetTable from '@hooks/admin/operations/useGetTable'
import { formatTimestampTable } from '@lib/formatTimestamp'
import jsFileDownload from "js-file-download"
import dayjs from 'dayjs'
import { useToast } from '@components/ui/use-toast'
import revalidateAllData from '@services/shared/revalidateAllData'
import DataTableRowAction from '@components/admin/tables/shared/DataTableRowAction'

export default function DataTable(props) {
  const { data, columnDefinition, tableName, getListCsv, rowActions, userStateGeneral } = props
  const { toast } = useToast()

  columnDefinition.push(
    { accessorFn: (row) => formatTimestampTable(row.created_at), header: 'created_at' },
    { accessorFn: (row) => formatTimestampTable(row.created_at), header: 'updated_at' },
  )

  if (rowActions) {
    columnDefinition.push({
      id: 'actions', accessorKey: 'id', header: '',
      cell: (info) => (
        <DataTableRowAction
          rowActions={rowActions}
          data={info.getValue()}
          userStateGeneral={userStateGeneral}
        />)
    })
  }

  const { table, globalFilter, setGlobalFilter, pageRef, flexRender } = useGetTable({
    data: data,
    columnDefinition: columnDefinition
  })

  function onGlobalFilterChange(event) {
    setGlobalFilter(event.target.value)
  }

  async function onExportToCsv() {
    await getListCsv()
      .then(({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          jsFileDownload(data, `${tableName.toUpperCase()}_${dayjs().format('YYYY-MM-DD')}.csv`)
          toast({
            title: "Data exported to CSV.",
            description: "Please confirm to download."
          })
        }
      })
  }

  async function onRefresh() {
    await revalidateAllData()
    toast({
      title: "Revalidated data.",
      description: "Changes should take effect immediately."
    })
  }

  function onFirstPagePagination() {
    pageRef.current = 0
    table.setPageIndex(pageRef.current)
  }

  function onLastPagePagination() {
    pageRef.current = table.getPageCount() - 1
    table.setPageIndex(pageRef.current)
  }

  function onNextPagePagination() {
    if (!table.getCanNextPage()) { return }
    pageRef.current = table.options.state.pagination.pageIndex + 1
    table.setPageIndex(pageRef.current)
  }

  function onPreviousPagePagination() {
    if (!table.getCanPreviousPage()) { return }
    pageRef.current = table.options.state.pagination.pageIndex - 1
    table.setPageIndex(pageRef.current)
  }

  function onPageJump(event) {
    pageRef.current = event.target.value
    table.setPageIndex(pageRef.current)
  }

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
          <Button variant={'secondary'} onClick={onExportToCsv} className={'w-full'}>
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

      <Table>
        <TableHeader className={'bg-secondary'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <Button
                    size={'sm'} variant={'ghost'}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`${header.column.getIsSorted() ? 'text-primary font-bold' : ''}`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: ' ⏶', desc: ' ⏷' }[header.column.getIsSorted()] ?? null}
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
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-5 gap-1 sm:gap-5">
        <Button size={'sm'} onClick={onFirstPagePagination}>
          <ChevronsLeft />
        </Button>
        <Button size={'sm'} variant={'secondary'} onClick={onPreviousPagePagination}>
          <ChevronLeft />
        </Button>

        <Input
          className={'text-center max-w-[5rem] sm:max-w-[10rem]'}
          type={'number'}
          value={pageRef.current}
          onChange={onPageJump}
        />

        <Button size={'sm'} variant={'secondary'} onClick={onNextPagePagination}>
          <ChevronRight />
        </Button>
        <Button size={'sm'} onClick={onLastPagePagination}>
          <ChevronsRight />
        </Button>
      </div>
    </>
  )
}

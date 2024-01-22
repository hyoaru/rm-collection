"use client"

import React, { useMemo, useState } from 'react'
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'

// App imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Dialog, DialogTrigger } from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import useGetTable from '@hooks/admin/operations/useGetTable'
import { formatTimestampTable } from '@lib/formatTimestamp'
import jsFileDownload from "js-file-download"
import dayjs from 'dayjs'
import { useToast } from '@components/ui/use-toast'
import revalidateAllData from '@services/shared/revalidateAllData'
import DataTableRowAction from '@components/admin/tables/shared/DataTableRowAction'
import setOrderStatusById from '@services/shared/setOrderStatusById'
import { ADMIN_ROLES } from '@constants/admin/base'
import getOrdersCsv from '@services/admin/shared/getOrdersCsv'
import OrderReceiptDialogContent from '@components/shared/OrderReceiptDialogContent'

export default function OrdersTable(props) {
  const { orders, orderStatus, userStateGeneral } = props
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  const filteredOrders = useMemo(() => {
    if (statusFilter !== 'all') {
      return orders.filter((order) => order.order_status.label === statusFilter)
    } else {
      return orders
    }
  }, [orders, statusFilter])

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'product_variant_id' },
    { accessorFn: (row) => row.users.email, header: 'email' },
    { accessorFn: (row) => row.product_variants.products.name, header: 'product_name' },
    { accessorFn: (row) => row.product_variants.material, header: 'variant_material' },
    { accessorKey: 'quantity' }, { accessorKey: 'price', header: 'price_sold_at' },
    { accessorFn: (row) => `${row.discount_rate}%`, header: 'discount_rate_sold_at' },
    { accessorKey: 'total_price', header: 'total_price_sold_at' },
    { accessorFn: (row) => row.order_status.label, header: 'status' }, { accessorKey: 'shipping_address' },
    { accessorFn: (row) => formatTimestampTable(row.created_at), header: 'created_at' },
    { accessorFn: (row) => formatTimestampTable(row.created_at), header: 'updated_at' },
  ]

  const rowActions = [
    {
      label: "Order: pending",
      onClick: (orderId) => setOrderStatusById(orderId, 2),
      isDestructive: false,
      adminRolesPermitted: ADMIN_ROLES
    },
    {
      label: "Order: to-ship",
      onClick: (orderId) => setOrderStatusById(orderId, 3),
      isDestructive: false,
      adminRolesPermitted: ADMIN_ROLES
    },
    {
      label: "Order: to-receive",
      onClick: (orderId) => setOrderStatusById(orderId, 4),
      isDestructive: false,
      adminRolesPermitted: ADMIN_ROLES
    },
    {
      label: "Order: cancel",
      onClick: (orderId) => setOrderStatusById(orderId, 1),
      isDestructive: false,
      adminRolesPermitted: ADMIN_ROLES
    }
  ]

  if (rowActions) {
    columnDefinition.push({
      id: 'actions', accessorKey: 'id', header: '',
      cell: (info) => (
        <DataTableRowAction
          rowActions={rowActions}
          data={info.getValue()}
          userStateGeneral={userStateGeneral}
        />
      )
    })
  }

  columnDefinition.push({
    id: 'receipt', accessorFn: (row) => row, header: '',
    cell: (info) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button size={'sm'}>
            {info.getValue().status_id === 2 ? 'Validate order' : 'Order receipt'}
          </Button>
        </DialogTrigger>
        <OrderReceiptDialogContent order={info.getValue()} />
      </Dialog>
    )
  })

  const { table, globalFilter, setGlobalFilter, pageRef, flexRender } = useGetTable({
    data: filteredOrders,
    columnDefinition: columnDefinition
  })

  function onGlobalFilterChange(event) {
    setGlobalFilter(event.target.value)
  }

  async function onExportToCsv() {
    await getOrdersCsv({ status: statusFilter === 'all' ? null : statusFilter })
      .then(({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          jsFileDownload(data, `${'Orders'.toUpperCase()}-${statusFilter.toUpperCase()}_${dayjs().format('YYYY-MM-DD')}.csv`)
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
          <Select className={'w-max'} onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger >
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>all-orders</SelectItem>
              {orderStatus?.data?.map((orderStatus) => (
                <SelectItem
                  key={`orderStatus-${orderStatus.id}`}
                  value={orderStatus.label}
                >
                  {orderStatus.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                    {{ asc: ' ˄', desc: ' ˅' }[header.column.getIsSorted()] ?? null}
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

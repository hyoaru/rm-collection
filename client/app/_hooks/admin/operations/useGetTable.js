import React, { useEffect, useRef, useState } from 'react'
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel } from '@tanstack/react-table';
import { getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';

export default function useGetTable({ data, columnDefinition }) {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const pageRef = useRef(0)

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
  })

  return { table, globalFilter, setGlobalFilter, pageRef, flexRender }

}

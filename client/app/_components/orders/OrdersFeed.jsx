"use client"

import React, { useMemo, useState } from 'react'
import Image from 'next/image'

// App imports
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import OrderCard from '@components/orders/OrderCard'

export default function OrdersFeed(props) {
  const { orders } = props
  const [statusFilter, setStatusFilter] = useState('all')
  const [keywordFilter, setKeywordFilter] = useState('')
  const [sortOrder, setSortOrder] = useState("Ascending")
  const [_, setState] = useState()

  const orderStatusList = useMemo(() => (
    Array.from(
      new Set(
        orders
          .sort((a, b) => a.status_id - b.status_id)
          .map((order) => order.order_status.label)
      )
    )
  ), [orders])

  const filteredOrders = (() => {
    let filteredOrdersByStatus = (
      statusFilter !== 'all'
        ? orders.filter((order) => order.order_status.label === statusFilter)
        : orders
    )

    let filteredOrderByKeyword = (
      keywordFilter !== ''
        ? filteredOrdersByStatus.filter(
          (order) => {
            let stringToSearch = Object.values(order).join(' ').toLowerCase()

            stringToSearch += Object.values(order.product_variants).join(' ').toLowerCase()
            stringToSearch += Object.values(order.product_variants.products).join(' ').toLowerCase()
            stringToSearch += Object.values(order.order_status).join(' ').toLowerCase()

            return stringToSearch.includes(keywordFilter)
          }
        )
        : filteredOrdersByStatus
    )

    return filteredOrderByKeyword
  })()

  function toggleOrdersSortOrder() {
    orders.reverse()
    setState(performance.now())
  }

  function onSortOrderClick() {
    if (orders.length > 0) {
      setSortOrder(prevSortOrder => prevSortOrder === "Ascending" ? "Descending" : "Ascending")
      toggleOrdersSortOrder()
    }
  }

  return (
    <>
      <div className="md:container mx-auto px-4 mt-4 mb-8">
        {!orders?.[0] && <>
          <div className="flex justify-center mt-10">
            <div className="space-y-12">
              <div className="">
                <h1 className='text-4xl text-center font-bold'>No orders yet</h1>
                <h1 className='text-lg mt-2 text-muted-foreground text-center'>Ready to make your first order?</h1>
              </div>
              <Image
                src={'/undraw-illustrations/light-undraw_taken_re_yn20.svg'}
                className='w-[250px] sm:w-[350px]  object-cover mx-auto'
                height={1000}
                width={1000}
                alt=''
              />
            </div>
          </div>
        </>}
        {orders?.[0] && <>
          <div className="flex items-center gap-x-4 gap-y-2 flex-col lg:flex-row">
            <Input
              className={'w-full me-auto'}
              placeholder={'Filter by name, material, material property, etc'}
              onChange={(event) => setKeywordFilter(event.target.value)}
            />

            <div className="flex items-center gap-x-4 w-full lg:w-max">
              <Select className={'w-full'} onValueChange={setStatusFilter} value={statusFilter}>
                <SelectTrigger className={'w-full lg:w-max'}>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>all-orders</SelectItem>
                  {orderStatusList?.map((orderStatus, index) => (
                    <SelectItem
                      key={`orderStatus-${orderStatus}`}
                      value={orderStatus}
                    >
                      {orderStatus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={'secondary'}
                onClick={onSortOrderClick}
                className={'w-full lg:w-max'}
              >
                {`Sort order: ${sortOrder}`}
              </Button>
            </div>
          </div>
          <div className="mt-10 columns-1 space-y-8 sm:columns-2 lg:columns-3 lg:gap-x-8 ">
            {filteredOrders?.map((order, index) => (
              <div className="break-inside-avoid-column w-full" key={order.id}>
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        </>}
      </div>
    </>
  )
}

'use client'

import React, { useMemo, useState } from 'react'
import { Button } from '@components/ui/button'
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area"
import dayjs from 'dayjs'

// App imports
import { DatePickerWithRange } from '@components/shared/DatePickerWithRange'
import MetricCards from '@components/admin/MetricCards'
import RecentOrderRow from '@components/admin/RecentOrderRow'
import BarChartSalesThroughoutYears from '@components/admin/BarChartSalesThroughoutYears'

export default function AdminDashboard(props) {
  const { orders, users: userList } = props

  const [date, setDate] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })

  function filterRecordsByDate(records) {
    return records.filter((record) => {
      const orderCreatedAt = dayjs(record.created_at).startOf('date')
      return orderCreatedAt >= date?.from && orderCreatedAt <= date?.to
    })
  }

  const filteredOrders = useMemo(() => filterRecordsByDate(orders), [orders, date])
  const filteredUsers = useMemo(() => filterRecordsByDate(userList), [userList, date])

  const confirmedOrders = useMemo(() => {
    return filteredOrders
      .filter((order) => ['to-receive', 'completed'].includes(order.order_status.label))
  }, [filteredOrders])

  const revenue = useMemo(() => {
    return confirmedOrders
      .reduce((accumulator, currentOrder) => {
        return accumulator + currentOrder.total_price
      }, 0)
  }, [confirmedOrders])

  const pendingOrders = useMemo(() => {
    return filteredOrders.filter((order) => {
      return order.order_status.label === 'pending'
    }).length
  }, [filteredOrders])

  const metrics = [
    { label: 'Revenue', value: `₱ ${revenue.toLocaleString()}` },
    { label: 'Sales', value: confirmedOrders.length.toLocaleString() },
    { label: 'Pending orders', value: pendingOrders.toLocaleString() },
    { label: 'Users', value: filteredUsers.length.toLocaleString() },
  ]

  const currentMonthSales = useMemo(() => {
    const currentMonthYear = dayjs().format('YYYY-MM')
    return confirmedOrders
      ?.filter((order) => dayjs(order.created_at)
        .format('YYYY-MM') == currentMonthYear)
      .length
  }, [confirmedOrders])

  const recentCompletedOrders = useMemo(() => {
    return Array.from(orders)
      .filter((order) => order.order_status.label === 'completed')
      .splice(0, 5)
  }, [orders])

  return (
    <>
      <div className="flex flex-col items-center justify-center md:flex-row gap-2">
        <h1 className='font-bold text-3xl md:me-auto md:text-2xl'>Dashboard</h1>
        <div className="flex gap-x-2">
          <DatePickerWithRange value={date} onValueChange={setDate} />
          {/* <Button>Download</Button> */}
        </div>
      </div>

      <ScrollArea className="whitespace-nowrap pb-4 md:pb-0">
        <div className="mx-auto flex gap-4 mt-4">
          {metrics.map((metric) => (
            <MetricCards
              key={`MetricCard-${metric.label}`}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid grid-cols-12 mt-4 gap-4">
        <div className="col-span-12 lg:col-span-7">
          <div className="border rounded-xl p-5">
            {orders?.[0]
              ? <BarChartSalesThroughoutYears orders={orders} />
              : <h4 className='text-center font-bold text-2xl py-24 opacity-80'>No data yet</h4>}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="border rounded-xl p-5 px-8">
            <div className="">
              <p className="font-bold">Recent sales</p>
              <p className="opacity-80 text-sm">You made {currentMonthSales} sales this month</p>
            </div>

            <div className="mt-3 space-y-2">
              {recentCompletedOrders.map((order) => (
                <RecentOrderRow
                  key={`RecentOrder-${order.id}`}
                  fullName={`${order.users?.first_name} ${order.users?.last_name}`}
                  email={order.users?.email}
                  totalPrice={order.total_price}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

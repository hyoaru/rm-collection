"use client";

import React, { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

// App imports
import { DatePickerWithRange } from "@components/shared/DatePickerWithRange";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { MetricCard } from "@components/admin/MetricCard";
import { queryAllOrders, queryAllUsers } from "@constants/admin/queries";
import BarChartSalesThroughoutYears from "@components/admin/BarChartSalesThroughoutYears";
import RecentOrderRow from "@components/admin/RecentOrderRow";

export default function Page() {
  const { data: orders } = useQuery(queryAllOrders());
  const { data: users } = useQuery(queryAllUsers());

  const [date, setDate] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  const filterRecordsByDate = useCallback((records: any[]) => {
    return records.filter((record) => {
      const orderCreatedAt = dayjs(record.created_at).startOf("date");
      return orderCreatedAt >= dayjs(date?.from) && orderCreatedAt <= dayjs(date?.to);
    });
  }, [date])

  const filteredOrders = useMemo(() => filterRecordsByDate(orders?.data ?? []), [orders, filterRecordsByDate]);
  const filteredUsers = useMemo(() => filterRecordsByDate(users?.data ?? []), [users, filterRecordsByDate]);

  const confirmedOrders = useMemo(() => {
    return filteredOrders.filter((order) => ["to_receive", "completed"].includes(order.order_status.label));
  }, [filteredOrders]);

  const revenue = useMemo(() => {
    return confirmedOrders.reduce((accumulator, currentOrder) => {
      return accumulator + currentOrder.total_price;
    }, 0);
  }, [confirmedOrders]);

  const pendingOrders = useMemo(() => {
    return filteredOrders.filter((order) => {
      return order.order_status.label === "pending";
    }).length;
  }, [filteredOrders]);

  const metrics = [
    { label: "Revenue", value: `₱ ${revenue.toLocaleString()}` },
    { label: "Sales", value: confirmedOrders.length.toLocaleString() },
    { label: "Pending orders", value: pendingOrders.toLocaleString() },
    { label: "Users", value: filteredUsers.length.toLocaleString() },
  ];

  const currentMonthSales = useMemo(() => {
    const currentMonthYear = dayjs().format("YYYY-MM");
    return confirmedOrders?.filter((order) => dayjs(order.created_at).format("YYYY-MM") == currentMonthYear).length;
  }, [confirmedOrders]);

  const recentCompletedOrders = useMemo(() => {
    return Array.from(orders?.data ?? [])
      .filter((order) => ["completed", "to_receive"].includes(order?.order_status?.label!))
      .splice(0, 5);
  }, [orders?.data]);

  return (
    <>
      <div className="flex flex-col items-center justify-center lg:flex-row mt-4">
        <h1 className="font-bold text-3xl text-primary lg:me-auto">Dashboard</h1>
        <div className="flex gap-x-2">
          <DatePickerWithRange value={date} setValue={setDate} />
        </div>
      </div>

      <ScrollArea className="whitespace-nowrap pb-4 md:pb-0">
        <div className="mx-auto flex gap-4 mt-4">
          {metrics.map((metric) => (
            <MetricCard key={`MetricCard-${metric.label}`}>
              <MetricCard.Label label={metric.label} />
              <MetricCard.Value value={metric.value} />
            </MetricCard>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid grid-cols-12 mt-4 gap-4">
        <div className="col-span-12 lg:col-span-7">
          <div className="border rounded-xl p-5">
            {confirmedOrders?.[0] ? (
              <BarChartSalesThroughoutYears orders={confirmedOrders} />
            ) : (
              <h4 className="text-center font-bold text-2xl py-24 opacity-80">No data yet</h4>
            )}
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
                  user={order.users}
                  totalPrice={order.total_price ?? 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

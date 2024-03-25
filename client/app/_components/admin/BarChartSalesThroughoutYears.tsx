'use client'

import React, { useMemo, useState } from 'react'
import { BarChart, CartesianGrid, XAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import dayjs from 'dayjs'
import { OrderType } from '@constants/shared/types'
import { groupBy } from '@lib/groupBy'

type BarChartSakesThroughoutYearsProps = {
  orders: OrderType[]
}

export default function BarChartSalesThroughoutYears({orders} : BarChartSakesThroughoutYearsProps) {
  const [year, setYear] = useState(dayjs().format('YYYY'))

  function getOrdersGroupedByYearMonth(data: typeof orders) {
    const ordersGroupedByYearMonth: any = {}
    let yearList = []

    const ordersGroupedByYear = groupBy(data, ({ created_at }) => dayjs(created_at).year())
    yearList = Object.keys(ordersGroupedByYear)

    Object.entries(ordersGroupedByYear).forEach(([year, recordsByYear]) => {
      const recordsGroupedByMonth = groupBy(recordsByYear, ({ created_at }) => dayjs(created_at).month())
      ordersGroupedByYearMonth[year] = {}
      Object.entries(recordsGroupedByMonth).forEach(([month, records]) => {
        ordersGroupedByYearMonth[year][month] = {
          label: dayjs().month(month as any).format('MMMM'),
          totalSales: records.length
        }
      })
    })

    return { ordersGroupedByYearMonth, yearList }
  }

  const { ordersGroupedByYearMonth, yearList } = useMemo(
    () => getOrdersGroupedByYearMonth(orders), [orders, year]
  )

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }: any) => {
    return <text x={x + width / 2} y={y} fontSize={15} fill="#666" textAnchor="middle" dy={-10}>{`${value.toLocaleString()}`}</text>;
  };

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 right-0 left-0 z-[5]">
          <div className="flex ">
            <p className="text-sm me-auto w-max opacity-80">Total sales throughout the months by year</p>
            <div className="">
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent align={'end'}>
                  {yearList?.map((year) => (
                    <SelectItem key={`YearSelectItem-${year}`} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <ResponsiveContainer width={'100%'} height={400}>
          <BarChart
            data={Object.values(ordersGroupedByYearMonth[year])}
            margin={{ top: 60 }}
          >
            <CartesianGrid strokeDasharray="1 3" />
            <XAxis dataKey="label" />
            <Tooltip />
            <Bar
              dataKey="totalSales"
              fill="#18181b"
              radius={[10, 10, 0, 0]}
              label={renderCustomBarLabel}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
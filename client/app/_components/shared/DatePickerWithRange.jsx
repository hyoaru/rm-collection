"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar as CalendarIcon } from "lucide-react"
import dayjs from "dayjs"

// App imports
import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import { Calendar } from "@components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { useToast } from "@components/ui/use-toast"

export function DatePickerWithRange(props) {
  const { className, value: date, onValueChange: setDate } = props
  const { toast } = useToast()

  function onSelect(date) {
    toast({
      title: "Data date range changed.",
      description: date?.to 
        ? `Viewing data from ${dayjs(date?.from).format('MMMM DD, YYYY')} to ${dayjs(date?.to).format('MMMM DD, YYYY')}.` 
        : `Viewing data from ${dayjs(date?.from).format('MMMM DD, YYYY')}`
    })

    setDate(date)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-max justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

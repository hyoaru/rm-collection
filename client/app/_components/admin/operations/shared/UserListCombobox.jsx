import React, { useState } from 'react'

// App imports
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Button } from '@components/ui/button'

export default function UserListCombobox(props) {
  const { userList, open, setOpen, value, setValue, onSelectedValueChange } = props
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? userList?.data.find((user) => user.email === value)?.email
              : "Select user..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[325px] sm:w-[375px] lg:w-[600px] xl:w-[800px] p-1">
          <Command>
            <CommandInput placeholder="Search user..." />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {userList.data.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.email}
                  onSelect={(currentValue) => {
                    onSelectedValueChange(currentValue === value ? null : user)
                    setValue(currentValue === value ? null : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === user.email ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.email}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}

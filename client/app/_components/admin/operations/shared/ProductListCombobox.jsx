import React, { useState } from 'react'

// App imports
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Button } from '@components/ui/button'

export default function ProductListCombobox(props) {
  const { productList, open, setOpen, value, setValue, onSelectedValueChange } = props
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
              ? productList?.data.find((product) => product.name === value)?.name
              : "Select product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[325px] sm:w-[200px] lg:w-[400px] xl:w-[650px] p-1">
          <Command>
            <CommandInput placeholder="Search product..." />
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {productList.data.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.name}
                  onSelect={(currentValue) => {
                    onSelectedValueChange(currentValue === value ? null : product)
                    setValue(currentValue === value ? null : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === product.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}

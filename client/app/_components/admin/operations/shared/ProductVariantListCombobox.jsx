import React, { useState } from 'react'

// App imports
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Button } from '@components/ui/button'

export default function ProductVariantListCombobox(props) {
  const { productId, productVariantList, open, setOpen, value, setValue, onSelectedValueChange } = props
  const filteredProductVariantList = productVariantList.data.filter((productVariant) => productVariant.product_id === productId)

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
              ? filteredProductVariantList?.find((productVariant) => productVariant.id === value)?.id
              : "Select product variant..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[325px] sm:w-[200px] lg:w-[400px] xl:w-[650px] p-1">
          <Command
            filter={(value, search) => {
              const productVariantFromValue = filteredProductVariantList?.find((productVariant) => productVariant.id === value)
              const stringToSearch = Object.values(productVariantFromValue).join(' ').toLowerCase()
              if (stringToSearch.includes(search)) return 1
              return 0
            }}
          >
            <CommandInput placeholder="Search product variant by id, material, and other attribute..." />
            <CommandEmpty>No product variant found.</CommandEmpty>
            <CommandGroup>
              {filteredProductVariantList.map((productVariant) => (
                <CommandItem
                  key={productVariant.id}
                  value={productVariant.id}
                  onSelect={(currentValue) => {
                    onSelectedValueChange(currentValue === value ? null : productVariant)
                    setValue(currentValue === value ? null : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === productVariant.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {productVariant.material} {productVariant.material_property}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}

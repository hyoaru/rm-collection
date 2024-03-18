"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, RotateCw } from "lucide-react";

// App imports
import { cn } from "@lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { queryAllProducts } from "@constants/shared/queries";
import { Tables } from "@constants/base/database-types";
import { useToast } from "@components/ui/use-toast";

type ProductListComboboxProps = {
  value: string | null | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  onSelectedValueChange: (product: Tables<"products"> | null) => void;
};

export default function ProductListCombobox({ value, setValue, onSelectedValueChange }: ProductListComboboxProps) {
  const [open, setOpen] = useState(false);
  const { data: products, isPending, isFetching } = useQuery(queryAllProducts());
  const queryClient = useQueryClient();
  const { toast } = useToast();

  async function revalidateData() {
    await queryClient.invalidateQueries({ queryKey: ["products"], refetchType: "all" });

    toast({
      title: "Revalidated data.",
      description: "Changes should take effect immediately.",
    });
  }

  if (isPending || isFetching) {
    return <Skeleton className="w-full h-10 rounded-lg block" />;
  }

  return (
    <>
      <div className="flex gap-2 items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between overflow-hidden"
            >
              {value ? products?.data?.find((product) => product.id === value)?.name : "Select product..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[325px] sm:w-[200px] lg:w-[400px] xl:w-[650px] p-1">
            <Command
              filter={(value, search) => {
                const productFromValue = products?.data?.find(
                  (product) => product.id.toLowerCase() === value.toLowerCase()
                );
                const stringToSearch = productFromValue ? Object.values(productFromValue).join(" ").toLowerCase() : "";
                if (stringToSearch.includes(search)) return 1;
                return 0;
              }}
            >
              <CommandInput placeholder="Search product..." />
              <CommandEmpty>No product found.</CommandEmpty>
              <CommandGroup className="h-[200px] overflow-y-auto">
                {products?.data?.map((product) => (
                  <CommandItem
                    key={`ProductCombobox-${product.id}`}
                    value={product.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? null : currentValue);
                      onSelectedValueChange(currentValue === value ? null : product);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === product.id ? "opacity-100" : "opacity-0")} />
                    {product.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Button size={"icon"} variant={"ghost"} type="button" onClick={revalidateData}>
          <RotateCw size="20" />
        </Button>
      </div>
    </>
  );
}

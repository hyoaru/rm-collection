import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// App imports
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { Tables } from "@constants/base/database-types";
import { queryAllProductVariants } from "@constants/shared/queries";
import { Skeleton } from "@components/ui/skeleton";

type ProductVariantListComboboxProps = {
  productId: string | null | undefined;
  value: string | null | undefined
  setValue: React.Dispatch<React.SetStateAction<string | null | undefined>>
  onSelectedValueChange: (product: Tables<"product_variants"> | null) => void;
};

export default function ProductVariantListCombobox({
  productId,
  onSelectedValueChange,
  value, 
  setValue
}: ProductVariantListComboboxProps) {
  const [open, setOpen] = useState(false);

  const {
    data: productVariants,
    isPending,
    isFetching,
  } = useQuery(queryAllProductVariants());

  const memoizedProductVariants = useMemo(() => productVariants?.data, [productVariants?.data, isFetching])
  const filteredProductVariants = memoizedProductVariants?.filter((productVariant) => productVariant.product_id === productId)

  if (isFetching) {
    return <Skeleton className="w-full h-10 rounded-lg block" />;
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between overflow-hidden"
            disabled={!productId || isPending}
          >
            {value
              ? filteredProductVariants?.find((productVariant) => productVariant.id === value)?.id
              : "Select product variant..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[325px] sm:w-[200px] lg:w-[400px] xl:w-[650px] p-1">
          <Command
            filter={(value, search) => {
              const productVariantFromValue = filteredProductVariants?.find(
                (productVariant) => productVariant.id.toLowerCase() === value.toLowerCase()
              );
              const stringToSearch = productVariantFromValue
                ? Object.values(productVariantFromValue).join(" ").toLowerCase()
                : "";
              if (stringToSearch.includes(search)) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder="Search product variant by id, material, and other attribute..." />
            <CommandEmpty>No product variant found.</CommandEmpty>
            <CommandGroup>
              {filteredProductVariants?.map((productVariant) => (
                <CommandItem
                  key={`ProductVariantCombobox-${productVariant.id}`}
                  value={productVariant.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? null : currentValue);
                    onSelectedValueChange(currentValue === value ? null : productVariant);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === productVariant.id ? "opacity-100" : "opacity-0")} />
                  {productVariant.material} {productVariant.material_property} : {productVariant.size}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

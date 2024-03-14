import React, { useState } from "react";

// App imports
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import countryList from "@/public/countries.json";
import { CountryType } from "@constants/base/types";

type CountriesComboboxProps = {
  setSelectedCountry: React.Dispatch<React.SetStateAction<CountryType | null | undefined>>;
};

export default function CountriesCombobox({ setSelectedCountry }: CountriesComboboxProps) {
  const [value, setValue] = useState<string | null | undefined>()
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value ? countryList.find((country) => country.name.toLowerCase() === value)?.name : "Select country..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[325px] sm:w-[200px] lg:w-[400px] xl:w-[650px] p-1">
          <Command
            filter={(value, search) => {
              const countryFromValue = countryList?.find((country) => country.name.toLowerCase() === value);
              const stringToSearch = Object.values(countryFromValue!).join(" ").toLowerCase();
              if (stringToSearch.includes(search)) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder="Search country by name or country code" />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className={"h-[200px] overflow-y-auto"}>
              {countryList.map((country) => (
                <CommandItem
                  key={`Country-${country.code}`}
                  value={country.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? null : currentValue);
                    setSelectedCountry(country)
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === country.name ? "opacity-100" : "opacity-0")} />
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

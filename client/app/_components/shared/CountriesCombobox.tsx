import React, { useState } from "react";
import flags from "react-phone-number-input/flags";

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
  isDisabled?: boolean;
};

export default function CountriesCombobox({ setSelectedCountry, isDisabled = false }: CountriesComboboxProps) {
  const [value, setValue] = useState<string | null | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={isDisabled}
          >
            {value ? (
              <div className="flex items-center gap-4">
                <FlagComponent
                  country={countryList.find((country) => country.name.toLowerCase() === value)?.code!}
                  countryName={value}
                />
                <span>{countryList.find((country) => country.name.toLowerCase() === value)?.name!}</span>
              </div>
            ) : (
              "Select country..."
            )}

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
                    setSelectedCountry(country);
                    setOpen(false);
                  }}
                >
                  <FlagComponent country={country.code} countryName={country.name} />
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

export const FlagComponent = ({ country, countryName }: { country: string; countryName: string }) => {
  const Flag = flags[country as keyof typeof flags];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";

// App imports
import { Badge } from "@components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@components/ui/command";
import countriesJson from "@/public/countries.json";

type CountriesMultiSelectProps = {
  selected: string[] | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string[] | undefined>>;
};

export default function CountriesMultiSelect({ selected, setSelected }: CountriesMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const countryList = React.useMemo(() => countriesJson.map((country) => country.name), []);
  const handleUnselect = React.useCallback((country: string) => {
    setSelected((prev) => prev?.filter((s) => s !== country));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...(prev ?? [])];
            newSelected.pop();
            return newSelected;
          });
        }
      }
    }

    if (e.key === "Escape") {
      input!.blur();
    }
  }, []);

  const selectables = countryList.filter((country) => !selected?.includes(country));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected?.map((country) => {
            return (
              <Badge key={`Country-${country}`} variant="secondary" tabIndex={-1}>
                {country}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(country);
                    }
                  }}
                  onClick={() => handleUnselect(country)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="select-stock-locations..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2" tabIndex={-1}>
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in h-[300px]">
            <CommandGroup className="h-full overflow-auto" tabIndex={-1}>
              {selectables.map((country) => {
                return (
                  <CommandItem
                    key={`CommandItemCountry-${country}`}
                    tabIndex={-1}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      setSelected((prev) => [...(prev ?? []), country]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {country}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}

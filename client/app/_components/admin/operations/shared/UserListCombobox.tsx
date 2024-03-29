import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// App imports
import { Check, ChevronsUpDown, RotateCw } from "lucide-react";
import { cn } from "@lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { Tables } from "@constants/base/database-types";
import { queryAllUsers } from "@constants/admin/queries";
import { Skeleton } from "@components/ui/skeleton";
import { useToast } from "@components/ui/use-toast";

type UserListComboboxProps = {
  value: string | null | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  onSelectedValueChange: (product: Tables<"users"> | null) => void;
};

export default function UserListCombobox({ value, setValue, onSelectedValueChange }: UserListComboboxProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: users, isPending, isFetching } = useQuery(queryAllUsers());
  const { toast } = useToast();

  if (isPending || isFetching) {
    return <Skeleton className="w-full h-10 rounded-lg block" />;
  }

  async function revalidateData() {
    await queryClient.invalidateQueries({ queryKey: ["products", "product_variants"], refetchType: "all" });

    toast({
      title: "Revalidated data.",
      description: "Changes should take effect immediately.",
    });
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {value ? users?.data?.find((user) => user.email === value)?.email : "Select user..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[325px] sm:w-[375px] lg:w-[600px] xl:w-[800px] p-1">
            <Command
              filter={(value, search) => {
                const userFromValue = users?.data?.find((user) => user.id.toLowerCase() === value.toLowerCase());
                const stringToSearch = userFromValue ? Object.values(userFromValue).join(" ").toLowerCase() : "";
                if (stringToSearch.includes(search)) return 1;
                return 0;
              }}
            >
              <CommandInput placeholder="Search user..." />
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup className="h-[200px] overflow-y-auto">
                {users?.data?.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.email}
                    onSelect={(currentValue) => {
                      onSelectedValueChange(currentValue === value ? null : user);
                      setValue(currentValue === value ? null : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === user.email ? "opacity-100" : "opacity-0")} />
                    {user.email}
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

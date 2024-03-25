import React from "react";
import { useQuery } from "@tanstack/react-query";

// App imports
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { queryAllOrderStatus } from "@constants/shared/queries";
import { Skeleton } from "@components/ui/skeleton";
import { cn } from "@lib/utils";

type OrderStatusSelectProps = {
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  classNames?: {
    base?: string;
    trigger?: string;
  }
};

export default function OrderStatusSelect({ statusFilter, setStatusFilter, classNames }: OrderStatusSelectProps) {
  const { data: orderStatus, isPending } = useQuery(queryAllOrderStatus());

  return (
    <>
      <Select onValueChange={setStatusFilter} value={statusFilter}>
        {isPending ? (
          <Skeleton className="rounded-lg w-28 h-10" />
        ) : (
          <>
            <SelectTrigger className={cn(classNames?.trigger)}>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all-orders</SelectItem>
              {orderStatus?.data?.map((orderStatus) => (
                <SelectItem key={`orderStatus-${orderStatus.id}`} value={orderStatus.label}>
                  {orderStatus.label}
                </SelectItem>
              ))}
            </SelectContent>
          </>
        )}
      </Select>
    </>
  );
}

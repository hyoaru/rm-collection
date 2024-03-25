"use client";

import React from "react";
import { useRouter } from "next/navigation";

// App imports
import { Select, SelectContent, SelectItem, SelectTrigger } from "@components/ui/select";
import { Button } from "@components/ui/button";
import { NavigationType } from "@constants/admin/types";
import { Tables } from "@constants/base/database-types";

type AdminSelectNavigationProps = {
  navigations: NavigationType[];
  label: string;
  authenticatedUser: Tables<"users"> | null;
  icon: React.ReactNode
};

export default function AdminSelectNavigation({ navigations, label, authenticatedUser, icon }: AdminSelectNavigationProps) {
  const router = useRouter();

  function onNavigationChange(path: string) {
    router.push(path);
  }

  return (
    <Select onValueChange={onNavigationChange}>
      <SelectTrigger className="w-full bg-secondary ">
        <p className="capitalize flex gap-2 items-center text-primary">
          {icon}
          {label}
        </p>
      </SelectTrigger>
      <SelectContent>
        {navigations.map((navigation, index) => {
          const isPermitted = authenticatedUser
            ? navigation.adminRolesPermitted.includes(authenticatedUser?.role)
            : false;

          if (isPermitted) {
            return (
              <SelectItem value={navigation.pathName} key={`SideNavCollapsedNavigation-${navigation.pathName}`}>
                {navigation.name}
              </SelectItem>
            );
          }
        })}
      </SelectContent>
    </Select>
  );
}

"use client";

import { User, Lock, PackageSearch, UserCog, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

// App imports
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";

import { useToast } from "@components/ui/use-toast";
import { useUserSignOut } from "@hooks/authentication/useUserSignOut";
import { Tables } from "@constants/base/database-types";

type MainNavEndUserDropdownContentProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function MainNavEndUserDropdownContent({ authenticatedUser }: MainNavEndUserDropdownContentProps) {
  const { userSignOut } = useUserSignOut();
  const { toast } = useToast();

  async function onUserSignOut() {
    await userSignOut().then(({ error }) => {
      if (!error) {
        toast({
          title: "Signing out",
          description: "Please wait shortly",
        });
      } else {
        toast({
          variant: "destructive",
          title: "An error has occured.",
          description: "Please try again later.",
        });
      }
    });

    window.location.reload();
  }

  return (
    <>
      <DropdownMenuContent side={"bottom"} align={"end"} className={"w-40"}>
        <DropdownMenuLabel className={"flex gap-2 items-center"}>
          <span className="text-muted-foreground font-semibold capitalize flex items-center gap-2">
            {authenticatedUser?.role === "user" ? (
              <User size={17} />
            ) : (
              <Lock size={17} />
            )}
            {authenticatedUser?.role.replaceAll("_", " ")}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {authenticatedUser?.role !== "user" && (
          <>
            <DropdownMenuItem>
              <Link href={"/admin"} className="w-full flex items-center gap-2">
                <Lock size={17} className="text-primary" />
                Admin
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem>
          <Link href={"/orders"} className="w-full flex items-center gap-2">
            <PackageSearch size={17} className="text-primary" />
            Orders
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href={"/profile"} className="w-full flex items-center gap-2">
            <UserCog size={17} className="text-primary" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <span onClick={onUserSignOut} className="flex items-center gap-2 w-full cursor-pointer">
            <LogOut size={17} className="text-primary" />
            Sign out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
}

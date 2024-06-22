"use client";

import { usePathname } from "next/navigation";
import BaseContainer from "@components/base/layout/BaseContainer";

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div className={`w-full ${pathname === "/" && "absolute"}`}>
        {children}
      </div>
    );
  }

  return <div>{children}</div>
}

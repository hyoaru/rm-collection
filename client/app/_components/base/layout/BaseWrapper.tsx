"use client";

import { usePathname } from "next/navigation";

// App import
import BaseContainer from "@components/base/layout/BaseContainer";

export default function BaseWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <div className="relative">{children}</div>;
  } else {
    return <>{children}</>;
  }
}

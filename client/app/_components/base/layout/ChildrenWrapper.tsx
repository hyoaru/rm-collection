"use client";

import { usePathname } from "next/navigation";

// App import
import BaseContainer from "@components/base/layout/BaseContainer";

export default function ChildrenWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  } else {
    return <BaseContainer>{children}</BaseContainer>;
  }
}

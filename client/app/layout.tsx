import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";

// App imports
import "./globals.css";
import Header from "@components/base/Header";
import { Toaster } from "@components/ui/toaster";
import Providers from "@providers/Providers";
import HeaderWrapper from "@components/base/layout/HeaderWrapper";
import BaseWrapper from "@components/base/layout/BaseWrapper";
import ChildrenWrapper from "@components/base/layout/ChildrenWrapper";

const typeface = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rea Mariz Collection Co.Ltd",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${typeface.className}`} suppressHydrationWarning>
        <Providers>
          <BaseWrapper>
            <HeaderWrapper>
              <Header />
            </HeaderWrapper>
            <ChildrenWrapper>
              {children}
            </ChildrenWrapper>
            <Toaster />
          </BaseWrapper>
        </Providers>
      </body>
    </html>
  );
}

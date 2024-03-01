import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";

// App imports
import "./globals.css";
import Header from "@components/base/Header";
import { Toaster } from "@components/ui/toaster";
import Providers from "@providers/Providers";

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
          <Header />
          <div className="px-4 mx-auto md:container">
          {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

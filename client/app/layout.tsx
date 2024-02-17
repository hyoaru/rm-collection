import type { Metadata } from "next";
import { Lora } from "next/font/google";

// App imports
import "./globals.css";
import Header from "@components/base/Header";
import { Toaster } from "@components/ui/toaster";

const typeface = Lora({ subsets: ["latin"] });

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
      <body className={typeface.className} suppressHydrationWarning>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

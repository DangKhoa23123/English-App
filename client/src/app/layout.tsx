import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/layout/navbar/Navbar";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Book Store",
  description: "Discover and buy books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-24 md:pt-28">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import LayoutClient from "./layout.client";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jumana",
  description: "Интернет-магазин одежды, хиджабы, абайки, платки",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LayoutClient>
        {children}
        </LayoutClient>
      </body>
    </html>
  );
}

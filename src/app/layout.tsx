import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import QueryProvider from "@/Provider/QueryProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// goorm-sans 폰트 설정
const goormSansBold = localFont({
  src: "./fonts/goorm-sans-bold.woff",
  variable: "--font-goorm-sans-bold",
  weight: "700",
  display: "swap",
});

const goormSansMedium = localFont({
  src: "./fonts/goorm-sans-medium.woff",
  variable: "--font-goorm-sans-medium",
  weight: "500",
  display: "swap",
});

const goormSansRegular = localFont({
  src: "./fonts/goorm-sans-regular.woff",
  variable: "--font-goorm-sans-regular",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "더블리",
  description: "더블리로 자산을 더 불려보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`
          ${goormSansBold.variable} 
          ${goormSansMedium.variable} 
          ${goormSansRegular.variable} 
          antialiased
        `}
      >
        <QueryProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryProvider>
      </body>
    </html>
  );
}
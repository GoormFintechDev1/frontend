import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/Provider/QueryProvider";
import { AuthProvider } from "@/Provider/AuthProvider";
import Navbar from "@/components/Navbar";

// goorm-sans 폰트 설정
const goormSansBold = localFont({
  src: "./fonts/goorm-sans-bold.woff",
  variable: "--font-goorm-sans-bold",
  weight: "700",
});

const goormSansMedium = localFont({
  src: "./fonts/goorm-sans-medium.woff",
  variable: "--font-goorm-sans-medium",
  weight: "500",
});

const goormSansRegular = localFont({
  src: "./fonts/goorm-sans-regular.woff",
  variable: "--font-goorm-sans-regular",
  weight: "400",
});

export const metadata: Metadata = {
  title: "지팡이",
  description: "A Helping Hand For Secondhand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${goormSansBold.variable} 
          ${goormSansMedium.variable} 
          ${goormSansRegular.variable} 
          antialiased
        `}
      >
        <QueryProvider>
          <AuthProvider>
            {children}
            <Navbar />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
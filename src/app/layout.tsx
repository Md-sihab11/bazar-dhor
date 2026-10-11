import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";
import "./globals.css";
import HeaderPage from "@/components/header";
import Navlinks from "@/components/navlinks";
import Pagemarquee from "@/components/marquee";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";

const banglaFonts = Anek_Bangla({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দৈনন্দিন বাজারদর",
  description: "দৈনন্দিন বাজারদর, নিত্যপ্রয়োজনীয় পণ্যের দামের ওঠানামা এবং বাজারভিত্তিক তুলনা এক নজরে।",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${banglaFonts.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[#F0F5F0]" suppressHydrationWarning>
        <HeaderPage />
        <Suspense fallback={<div className="h-14 bg-white border-b border-gray-200" />}>
          <Navlinks />
        </Suspense>
        <Suspense fallback={<div className="h-10 bg-white" />}>
          <Pagemarquee />
        </Suspense>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastContainer position="top-center" autoClose={2000} />
      </body>
    </html>
  );
}

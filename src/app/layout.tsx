import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";

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
  title: "Livl Consulting ERP",
  description: "Héhéhéha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex min-h-screen w-full flex-col">
          <Header />
          <div className="my-8 flex w-full max-w-screen-lg flex-1 flex-col px-4 lg:mx-auto lg:px-2">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}

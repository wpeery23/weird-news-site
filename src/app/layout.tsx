import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The World of Bizarre and Weird",
  description: "The most bizarre, funny, and odd news from across the US and the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-yellow-400 text-black py-4 sticky top-0 z-50 shadow-md border-b-4 border-black">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-black uppercase tracking-tighter italic">
              Bizarre<span className="text-red-600">&</span>Weird
            </Link>
            <nav className="hidden md:flex space-x-6 font-bold uppercase text-sm">
              <Link href="/category/odd-news" className="hover:underline">Odd News</Link>
              <Link href="/category/weird" className="hover:underline">Weird</Link>
              <Link href="/category/bizarre" className="hover:underline">Bizarre</Link>
              <Link href="/category/culture" className="hover:underline">Culture</Link>
              <Link href="/category/general" className="hover:underline">General</Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <AdUnit type="header" className="mb-12" />
            {children}
          </div>
        </main>
        <footer className="bg-black text-white py-12 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl font-black uppercase italic mb-4">Bizarre<span className="text-red-600">&</span>Weird</p>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
              Stay weird. Aggregating the funniest and most bizarre news from across the globe since 2026.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500 uppercase font-bold">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
            <p className="mt-8 text-xs text-gray-600">© 2026 Bizarre & Weird. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
// trigger
